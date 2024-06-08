import { useState } from "react";

const ProductCard = ({ id, image, title, description, onClick, className }) => {
  const [active, setActive] = useState(false);

  return (
    <div
      onClick={() => onClick(id)}
      className={`'flex dark:text-white'  min-h-[7rem] w-full flex-col items-center justify-center gap-3  rounded-lg bg-white   px-3 py-4 dark:!bg-navy-800 dark:text-lightPrimary ${className}`}
    >
      <div className="flex gap-5">
        <div className="min-h-16 line-c h-16  min-w-[5rem] rounded ">
          <img
            src={image}
            alt={title}
            className="min-h-16 min-w-24 h-16 w-24 object-contain object-center"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="ext-lg text-lg  font-bold text-navy-700 line-clamp-1 dark:text-white">
            {title}
          </h2>
          <p className=" mb-3 text-sm  font-normal text-gray-700  line-clamp-2 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
