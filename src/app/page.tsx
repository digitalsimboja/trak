import Feed from "@/components/Feed";
import NewPost from "@/components/NewPost";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen max-w-xl mx-auto border-r border-l p-3">
      <div className="py-2  sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
      </div>
      <NewPost />
      <Feed />
    </main>
  );
}
