import DeleteModal from "components/deleteModal";
import axiosInstance from "config/customAxios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsDetail = ({ id, onDelete, onEdit }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [newID, setNewID] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axiosInstance.get(`/getNew?id=${id}`);
        console.log(result);
        setTitle(result.data?.data[0]?.title);
        setDescription(result.data?.data[0]?.content);
        setImage(result.data?.data[0]?.image);
        setCreatedBy(
          result.data?.data[0]?.fname + " " + result.data?.data[0]?.lname
        );
        setPublishedDate(result.data?.data[0]?.published_date);
        setCategory(result.data?.data[0]?.cat_title);
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
  }, [id]);

  const deleteHandle = async () => {
    try {
      setDeletePopup(false);
      const result = await axiosInstance.delete(`/deleteNew/${id}`);
      onDelete(true);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };

  const onDeleteRequest = () => {
    setDeletePopup(true);
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl rounded-lg bg-white p-6 dark:bg-navy-800 dark:text-white">
      {deletePopup && (
        <DeleteModal
          onDelete={deleteHandle}
          onCancel={() => setDeletePopup(false)}
        />
      )}
      <div className="mb-4 flex justify-end gap-4 text-sm">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={onDeleteRequest}
        >
          Delete
        </button>
      </div>

      <img
        src={image}
        alt={title}
        className="mb-6 h-64 w-full rounded-lg object-cover"
      />
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        {new Date(publishedDate).toLocaleDateString()}
      </p>
      <p className="mb-6 leading-relaxed text-gray-800 dark:text-gray-300">
        {description}
      </p>
      <div className="mb-4">
        <span className="font-semibold text-gray-700 dark:text-gray-400">
          Created by:
        </span>{" "}
        {createdBy}
      </div>
      <div>
        <span className="font-semibold text-gray-700 dark:text-gray-400">
          Category:
        </span>{" "}
        {category}
      </div>
    </div>
  );
};

export default NewsDetail;
