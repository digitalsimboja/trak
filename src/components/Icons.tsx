"use client";

import { modalState, postIdState } from "@/atom/modalAtom";
import { app } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
} from "react-icons/hi";
import { useRecoilState } from "recoil";
import { Timestamp } from "./Post";
import { CommentProps } from "./Comments";

export interface Like {
  username: string;
  timestamp: Timestamp;
}

export default function Icons({ id, uuid }: { id: string; uuid: string }) {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<Like[]>([]);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [comments, setComments] = useState<CommentProps[]>([]);

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session.user.uuid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uuid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this post")) {
      if (session?.user.uuid === uuid) {
        deleteDoc(doc(db, "posts", id))
          .then(() => {
            console.log("Post successfully deleted");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error removing the post", error);
          });
      } else {
        alert("You are not authorized to delete this post");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
        const likesData: Like[] = snapshot.docs.map((doc) => ({
          username: doc.data().username,
          timestamp: doc.data().timestamp,
        }));
        setLikes(likesData);
      }
    );

    return () => unsubscribe();
  }, [db, id]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.username === session?.user.username) !== -1
    );
  }, [likes]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => {
        const commendData: CommentProps[] = snapshot.docs.map((doc) => ({
          id: doc.data().id,
          username: doc.data().username,
          text: doc.data().comment,
          timestamp: doc.data().timestamp,
          name: doc.data().name,
          userImg: doc.data().userImg,
        }));

        setComments(commendData);
      }
    );
    return () => unsubscribe();
  }, [db, id]);

  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <div className="flex items-center">
        <HiOutlineChat
          onClick={() => {
            if (!session) {
              signIn();
            } else {
              setOpen(!open);
              setPostId(id);
            }
          }}
          className="w-8 h-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100"
        />
        {comments.length > 0 && (
          <span className="text-xs">{comments.length}</span>
        )}
      </div>
      <div className="flex items-center">
        {isLiked ? (
          <HiHeart
            onClick={likePost}
            className="w-8 h-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100"
          />
        ) : (
          <HiOutlineHeart
            onClick={likePost}
            className="w-8 h-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
          />
        )}
        {likes.length > 0 && (
          <span className={`${isLiked && "text-red-600"} text-xs`}>
            {likes.length}
          </span>
        )}
      </div>
      {session?.user.uuid === uuid && (
        <HiOutlineTrash
          onClick={deletePost}
          className="w-8 h-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
        />
      )}
    </div>
  );
}
