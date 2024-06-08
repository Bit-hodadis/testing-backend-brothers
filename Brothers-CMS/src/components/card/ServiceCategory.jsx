import axiosInstance from "config/customAxios";
import { useState } from "react";

const ServiceCategoryCard = ({
  id,
  image,
  title,
  description,
  onClick,
  className,
  onEdit,
  onDelete,
}) => {
  const [active, setActive] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await axiosInstance.delete(`/deleteServiceCategory/${id}`);

      console.log(result);
      onDelete(true);
    } catch (error) {
      console.log(error);
    }
  };

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
          <p className=" text-sm line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="flex justify-end gap-8 pt-3">
        <button
          className="rounded-md border border-blueSecondary py-1 px-5 text-sm font-medium text-blueSecondary hover:bg-blueSecondary hover:text-lightPrimary"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button
          className="rounded-md bg-red-800 py-1 px-5 text-sm font-medium text-lightPrimary"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ServiceCategoryCard;
