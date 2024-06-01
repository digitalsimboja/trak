"use client";

import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Timestamp } from "./Post";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { app } from "@/firebase";

export interface CommentProps {
  id: string;
  text: string;
  name: string;
  timestamp: Timestamp;
  userImg: string;
  username: string;
}

export default function Comments({ id }: { id: string }) {
  const [comments, setComments] = useState<CommentProps[]>([]);

  const db = getFirestore(app);

  
  useEffect(() => {
    const q = query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CommentProps[];
      
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [db, id]);

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
       
      ))}
    </div>
  );
}
