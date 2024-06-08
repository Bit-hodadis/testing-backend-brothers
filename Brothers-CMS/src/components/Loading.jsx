import { BsCircleHalf } from "react-icons/bs";

const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex h-screen w-screen  items-center justify-center bg-navy-800/30">
      <div className="flex h-32 w-28 flex-col  items-center justify-center rounded-lg bg-white  text-lg">
        <BsCircleHalf className="animate-spin text-xl text-blueSecondary duration-300 "></BsCircleHalf>
        Loading
      </div>
    </div>
  );
};

export default Loading;
