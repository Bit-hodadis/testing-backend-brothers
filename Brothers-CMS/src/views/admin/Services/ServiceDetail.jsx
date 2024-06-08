import axiosInstance from "config/customAxios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ServicesDetail = ({ id, onDelete, onEdit }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  //   {
  // "data": [
  // {
  // "id": 4,
  // "title": "Online Digital Service anouncement",
  // "content": "dagdja gjagd jagda jh",
  // "image": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80",
  // "published_date": "2024-06-06",
  // "fname": "Ayana",
  // "lname": "Mesha",
  // "email": "hodadisbirhan1102@gmail.com",
  // "cat_title": "Online Service",
  // "cat_id": 12
  // }
  // ]
  // }

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axiosInstance.get(`/singleService?id=${id}`);
        console.log(result);
        setTitle(result.data?.data[0]?.title);
        setDescription(result.data?.data[0]?.description);
        setImage(result.data?.data[0]?.image);
        setCreatedBy(result.data?.data[0]?.fname + result.data?.data[0]?.lname);
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
      const result = await axiosInstance.delete(`/deleteService/${id}`);
      onDelete(true);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <div className="flex gap-6 text-sm">
        <button
          className="rounded-md bg-blueSecondary  px-8 py-1  text-lightPrimary"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button
          className="rounded-md bg-red-500 px-8 py-1 text-lightPrimary"
          onClick={deleteHandle}
        >
          delete
        </button>
      </div>

      <img
        src={image}
        alt={title}
        className="mb-4 h-64 w-full rounded-md object-cover"
      />
      <h1 className="mb-2 text-3xl font-bold">{title}</h1>

      <p className="mb-4 leading-relaxed text-gray-800">{description}</p>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Created by:</span>{" "}
        {createdBy}
      </div>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Categories:</span>{" "}
        {category}
      </div>
    </div>
  );
};

export default ServicesDetail;
