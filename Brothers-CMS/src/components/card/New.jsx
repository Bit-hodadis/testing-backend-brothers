import { useState } from "react";

const NewCard = ({
  id,
  image,
  title,
  publishedDate,
  description,
  onClick,
  className,
}) => {
  const [active, setActive] = useState(false);

  return (
    <div
      onClick={() => onClick(id)}
      className={`'flex dark:text-white'  min-h-[7rem] w-full flex-col items-center justify-center  gap-3 rounded-lg   bg-white px-3 py-4 dark:!bg-navy-800 ${className}`}
    >
      <div className="flex gap-5">
        <div className="min-h-16 h-16  min-w-[5rem] rounded ">
          <img
            src={image}
            alt={title}
            className="min-h-16 min-w-24 h-16 w-24 object-contain object-center"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className=" text-sm font-medium line-clamp-2">{description}</p>
          <span className=" w-fit rounded-full bg-green-500 px-2 py-1 text-sm text-gray-200 ">
            {publishedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
