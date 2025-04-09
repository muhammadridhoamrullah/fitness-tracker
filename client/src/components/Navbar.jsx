import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  function isActive(path) {
    return pathname === path ? "text-[#ED563B] bg-white/10" : "text-white";
  }

  return (
    <div className="w-full h-20 bg-black flex justify-between items-center px-28 fixed top-0 left-0 z-50">
      <div className="flex gap-1 text-3xl font-extrabold">
        <div className="text-white">TRAINING</div>
        <div className="text-[#ED563B]">STUDIO</div>
      </div>
      <div className="flex gap-4 text-white font-bold text-sm  h-full justify-center items-center ">
        <Link
          to={"/"}
          className={`${isActive(
            "/"
          )} w-full h-full flex justify-center items-center  px-3 hover:text-[#ED563B] cursor-pointer`}
        >
          HOME
        </Link>
        <Link
          to={"/about"}
          className={`${isActive(
            "/about"
          )} w-full h-full flex justify-center items-center px-3 hover:text-[#ED563B] cursor-pointer`}
        >
          ABOUT
        </Link>
        <Link
          to={"/classes"}
          className={`${isActive(
            "/classes"
          )} w-full h-full flex justify-center items-center px-3 hover:text-[#ED563B] cursor-pointer`}
        >
          CLASSES
        </Link>
        <Link
          to={"/schedules"}
          className={`${isActive(
            "/schedules"
          )} w-full h-full flex justify-center items-center px-3 hover:text-[#ED563B] cursor-pointer`}
        >
          SCHEDULES
        </Link>
        <Link
          to={"/contact"}
          className={`${isActive(
            "/contact"
          )} w-full h-full flex justify-center items-center px-3 hover:text-[#ED563B] cursor-pointer`}
        >
          CONTACT
        </Link>

        <Link
          to={"/register"}
          className="w-full h-fit py-2 rounded-md  flex justify-center items-center px-3 hover:text-[#ED563B] cursor-pointer whitespace-nowrap bg-[#ED563B] hover:bg-[#fff]"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
}
