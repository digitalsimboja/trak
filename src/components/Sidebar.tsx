import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { MdTrackChanges } from "react-icons/md";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-3">
      <Link href="/">
        <MdTrackChanges className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200" />
      </Link>
      <Link href="/" className="cursor-pointer p-3 flex items-center hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit">
        <HiHome className="w-7 h-7" />
        <span className="font-bold hidden xl:inline">Home</span>
      </Link>
      <button className="bg-blue-400 font-semibold text-white w-48 h-9 rounded-full hover:brightness-95 shadow-md transition-all duration-200 hidden xl:inline">Sign In</button>
    </div>
  );
};

export default Sidebar;
