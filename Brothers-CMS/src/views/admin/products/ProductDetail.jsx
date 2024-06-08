import Loading from "components/Loading";
import Notification from "components/Notification";
import DeleteModal from "components/deleteModal";
import axiosInstance from "config/customAxios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ id, onDelete, onEdit }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        setMessage(null);
        const result = await axiosInstance.get(`/getProduct?id=${id}`);
        setTitle(result.data?.data[0]?.title);
        setDescription(result.data?.data[0]?.description);
        setImage(result.data?.data[0]?.image);
        setCreatedBy(
          result.data?.data[0]?.fname + " " + result.data?.data[0]?.lname
        );

        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        setMessage("error Fetching");
        console.log(error);
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetchProduct();
  }, [id]);

  const deleteRequest = () => {
    setIsDelete(true);
  };

  const deleteHandler = async () => {
    try {
      setIsDelete(false);
      await axiosInstance.delete(`/deleteProduct/${id}`);
      onDelete(true);
      setIsDelete(false);
    } catch (error) {
      console.log(error);
      setIsDelete(false);
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl rounded-lg border border-gray-200 bg-white p-6">
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Notification type="error">{message}</Notification>
      ) : (
        message && <Notification>{message}</Notification>
      )}

      {isDelete && (
        <DeleteModal
          onCancel={() => setIsDelete(false)}
          onDelete={deleteHandler}
        ></DeleteModal>
      )}
      <div className="mb-6 flex justify-between">
        <button
          className="rounded-md bg-blueSecondary px-8 py-2 font-semibold text-lightPrimary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button
          className="rounded-md bg-red-500 px-8 py-2 font-semibold text-lightPrimary hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={deleteRequest}
        >
          Delete
        </button>
      </div>

      <img
        src={image}
        alt={title}
        className="mb-4 h-64 w-[10rem] rounded-md object-cover"
      />
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>

      <p className="mb-4 leading-relaxed text-gray-800">{description}</p>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Created by:</span>{" "}
        {createdBy}
      </div>
    </div>
  );
};

export default ProductDetail;
