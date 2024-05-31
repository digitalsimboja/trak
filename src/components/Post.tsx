import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface PostProps {
  id: string;
  uuid: string;
  username: string;
  name: string;
  profileImg: string;
  text: string;
  timestamp: Timestamp;
  postImg?: string; // optional property
}
export default function Post({ post }: { post: PostProps }) {
  return (
    <div className="flex p-3 border-b border-gray-200">
      <img
        src={post.profileImg}
        alt={`${post.username} image`}
        className="h-11 w-11 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-xs truncate">{post.name}</h4>
            <span className="text-xs truncate text-gray-500">
              @{post.username}
            </span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>
        <Link href={`/posts/${post.id}`}>
          <p className="text-sm text-gray-800 my-3 truncate">{post.text}</p>
        </Link>
        <Link href={`/posts/${post.id}`}>
          <img
            src={post.postImg}
            className="rounded-2xl mr-2 max-h-[250px] w-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
