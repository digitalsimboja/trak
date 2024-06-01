"use client";

import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from "react-icons/hi";
import { CommentProps } from "./Comments";
import { useEffect, useState } from "react";
import { Like } from "./Icons";
import { signIn, useSession } from "next-auth/react";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { app } from "@/firebase";

export default function Comment({
  comment,
  postId,
}: {
  comment: CommentProps;
  postId: string;
}) {
  const [likes, setLikes] = useState<Like[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const { data: session } = useSession();
  const db = getFirestore(app);

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            postId,
            "comments",
            comment.id,
            "likes",
            session.user.uuid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            postId,
            "comments",
            comment.id,
            "likes",
            session.user.uuid
          ),
          {
            username: session.user.username,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", postId, "comments", comment.id, "likes"),
      (snapshot) => {
        const likesData: Like[] = snapshot.docs.map((doc) => ({
          username: doc.data().username,
          timestamp: doc.data().timestamp,
        }));
        setLikes(likesData);
      }
    );

    return () => unsubscribe();
  }, [db, postId]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.username === session?.user.username) !== -1
    );
  }, [likes]);

  return (
    <div className="flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10">
      <img
        src={comment.userImg}
        alt={`${comment.username} image`}
        className="h-9 w-9 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-sm truncate">{comment.name}</h4>
            <span className="text-xs truncate text-gray-500">
              @{comment.username}
            </span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>

        <p className="text-xs text-gray-800 my-3 truncate">{comment.text}</p>
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
      </div>
    </div>
  );
}
