"use client";

import { useSession } from "next-auth/react";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import Image from "next/image";

const NewPost: React.FC = () => {
  const { data: session } = useSession();
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const db = getFirestore(app);

  const imagePickRef = useRef<HTMLInputElement>(null);

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImageToStorage = () => {
    if (!selectedFile) {
      console.error("No file selected for upload.");
      return;
    }

    setUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed", error);
        setUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        // Handle successful uploads
        console.log("Upload successful");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  const handlePostSubmit = async () => {
    setPosting(true);

    const docRef = await addDoc(collection(db, "posts"), {
      uuid: session?.user.uuid,
      name: session?.user.name,
      username: session?.user.username,
      text,
      profileImg: session?.user.image,
      postImg: imageFileUrl,
      timestamp: serverTimestamp(),
    });

    setPosting(false);
    setText("");
    setImageFileUrl(null);
    setSelectedFile(null);
    location.reload();
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  if (!session) return null;

  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <img
        src={session.user.image as string}
        alt="user profile image"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px]"
          placeholder="What's happening?"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {selectedFile && (
          <img
            src={imageFileUrl as string}
            alt="Selected image"
            className={`w-full max-h-[250px] object-cover cursor-pointer ${
              uploading ? "animate-pulse" : ""
            }`}
          />
        )}
        <div className="flex justify-between items-center pt-2.5">
          <HiOutlinePhotograph
            onClick={() => imagePickRef.current?.click()}
            className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
          />
          <input
            type="file"
            ref={imagePickRef}
            accept="image/*"
            hidden
            onChange={addImageToPost}
          />
          <button
            onClick={handlePostSubmit}
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
            disabled={uploading || text.trim() === "" || posting}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
