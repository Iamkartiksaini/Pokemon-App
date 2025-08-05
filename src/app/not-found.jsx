import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col gap-7 justify-center items-center p-5 h-[80vh] ">
      <div className="flex justify-center items-center gap-0.5">
        <div className="h-[80px] flex justify-center items-center w-[80px] rounded-full  bg-yellow-300">
          <div className="w-[30px] h-[30px] bg-[#050505] rounded-full animate-[movePupil_2s_infinite_ease-in-out] transform origin-center"></div>
        </div>
        <div className="h-[80px] flex justify-center items-center w-[80px]  rounded-full  bg-yellow-300">
          <div className="w-[30px] h-[30px] bg-[#050505] rounded-full animate-[movePupil_2s_infinite_ease-in-out] transform origin-center">
          </div>
        </div>
      </div>
      <div className="text-center">
        <h1 className="font-medium text-4xl mb-2">
          Looks like you're lost</h1>
        <p className="text-2xl font-semibold mt-2.5 mb-4">404 error</p>
      </div>
      <Link href={"/"} className="text-center font-medium  no-underline rounded-4xl transition-colors w-[200px] px-5 py-2.5 bg-black text-white  hover:bg-amber-300 hover:text-black">
        Go to Home<span className="ml-2"> →</span>
      </Link>
    </div>
  );
}

