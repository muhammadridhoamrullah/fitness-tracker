import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex justify-center items-center h-screen bg-black pt-20">
      <div className="text-white w-[900px] h-[500px] bg-[#131313] rounded-xl flex justify-center items-center overflow-hidden">
        <div className=" w-full h-full flex flex-col justify-center  items-start py-10 pl-10 ">
          <div className="flex flex-col gap-4 ">
            <div className="text-[#f3f3f3] text-md font-bold">
              START FOR FREE
            </div>
            <div className="flex flex-col gap-1 text-5xl">
              <div>Create</div>
              <div>Your Account</div>
            </div>
            <div>
              Already a member?{" "}
              <Link className="text-[#ED563B] font-bold" to={"/login"}>
                LOG IN
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Username</div>
            <div>Email</div>
            <div>Password</div>
            <div>Age</div>
            <div>Gender</div>
            <div>Height</div>
            <div>Weight</div>
            <div>Fitness Goal</div>
          </div>
        </div>
        <div className="w-full h-full">Gambar</div>
      </div>
    </div>
  );
}
