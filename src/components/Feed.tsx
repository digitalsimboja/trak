import { app } from "@/firebase";
import {
    QueryDocumentSnapshot,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import Post, { PostProps } from "./Post";



export default async function Feed() {
  const db = getFirestore(app);
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
 

  const data: PostProps[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
    id: doc.id,
    ...doc.data(),
  } as PostProps));

  return (
    <div>
      {data.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
