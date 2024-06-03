"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { HiHome, HiDotsHorizontal } from "react-icons/hi";
import { MdTrackChanges } from "react-icons/md";

const Sidebar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-4 p-3 justify-between h-screen">
      <div className="flex flex-col gap-4 p-3">
        <Link href="/" className="flex items-center">
          <MdTrackChanges className="text-blue-500 w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200" />
          <span className="text-sm font-bold">Evvecast</span>
        </Link>
        <Link
          href="/"
          className="cursor-pointer p-3 flex items-center hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit"
        >
          <HiHome className="w-7 h-7" />
          <span className="font-bold hidden xl:inline">Home</span>
        </Link>
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-blue-400 font-semibold text-white w-48 h-9 rounded-full hover:brightness-95 shadow-md transition-all duration-200 hidden xl:inline"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-400 font-semibold text-white w-48 h-9 rounded-full hover:brightness-95 shadow-md transition-all duration-200 hidden xl:inline"
          >
            Sign In
          </button>
        )}
      </div>
      {session && (
        <div className="flex cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-700 text-sm items-center">
          <img
            src={session.user.image as string}
            alt="user profile image"
            className="rounded-full w-10 h-10 xl:mr-2"
          />
          <div className="hidden xl:inline">
            <h4 className="font-bold">{session.user.name}</h4>
            <p className="text-gray-500">@{session.user.username}</p>
          </div>
          <HiDotsHorizontal className="h-5 xl:ml-8 hidden xl:inline" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
