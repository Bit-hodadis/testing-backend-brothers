import axiosInstance from "config/customAxios";
import { FiDelete } from "react-icons/fi";
import { useState } from "react";
import Notification from "components/Notification";
import Loading from "components/Loading";
import { useNavigate } from "react-router-dom";

const StackholderCard = ({ id, logo, name, type, touched_by, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setMessage("");
      setError(false);
      setLoading(true);
      const result = await axiosInstance.delete(`/deleteStackholder/${id}`);
      setLoading(false);
      setMessage("successfull");
      onDelete();
    } catch (error) {
      setMessage(
        "error Please Check the corresponding Testimonial and delete the them"
      );

      setError(true);
      setLoading(false);
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };

  return (
    <div className="relative  flex flex-col gap-4 rounded-md border bg-lightPrimary py-2 px-6 shadow-sm dark:bg-navy-700 dark:text-lightPrimary">
      {loading ? (
        <Loading />
      ) : error ? (
        <Notification type="error">{message}</Notification>
      ) : (
        message && <Notification>{message}</Notification>
      )}{" "}
      <Notification></Notification>
      <FiDelete
        className="absolute top-1 right-1 h-5 w-12"
        onClick={handleDelete}
      ></FiDelete>
      <div className=" h-[10rem]  w-[10rem] rounded-[100%]  border  bg-lightPrimary py-2 px-4">
        <img
          src={logo}
          alt={name}
          className="h-full w-full rounded-[100%] object-contain  object-center"
        />
      </div>
      <span className="w-fit rounded-full bg-green-500/60 px-5 py-1 text-sm font-medium text-white">
        {type}
      </span>
      <h2 className="text-lg font-semibold">{name}</h2>
      <div className="flex flex-wrap">
        <span className="text-sm font-medium ">Touched By: </span>
        <span className="text-gray-500">{touched_by}</span>
      </div>
    </div>
  );
};

export default StackholderCard;
