import React, { useEffect, useState } from "react";
import FileInput from "components/file/fileInput"; // Ensure the correct import path
import InputField from "components/fields/InputField"; // Adjust the import path as needed
import TextField from "components/fields/TextField"; // Adjust the import path as needed
import MiniCalendar from "components/calendar/MiniCalendar";
import axios from "axios";
import axiosInstance from "config/customAxios";
import Loading from "components/Loading";
import useFirebaseClient from "helper/uploadFile";
import { useNavigate } from "react-router-dom";
import Notification from "components/Notification";

const Form = ({ onClick }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { uploadImages } = useFirebaseClient();
  const navigate = useNavigate();
  const changeHandle = (value) => {
    setImage(value);
    console.log("Base64 String:", value);
  };

  const user = localStorage.getItem("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      setMessage(null);
      const url = await uploadImages(image, "image");
      const result = await axiosInstance.post(`/addProducts`, {
        title: title,
        description: description,
        image: url,

        user_id: JSON.parse(user)?.id,
      });
      onClick();
      setLoading(false);
      setImage(null);

      setDescription("");
      setTitle("");

      setMessage("successfully Inserted");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(true);
      setMessage("Error Please Checked It");
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };
  return (
    <form
      className="flex flex-col gap-4 bg-white px-5  dark:!bg-navy-800"
      onSubmit={handleSubmit}
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <Notification type="error">{message}</Notification>
      ) : (
        message && <Notification>{message}</Notification>
      )}

      <div className=" h-full max-h-[calc(100vh-10rem)] w-full  flex-col gap-4 overflow-y-auto">
        <div>
          <span>News Logo</span>
          <FileInput onFileChange={changeHandle} />
        </div>

        <InputField
          type="text"
          name="title"
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          cols="8"
          label="description"
          placeholder="enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button className=" z-10  place-self-end rounded-md bg-blueSecondary px-16 py-2  text-sm font-semibold text-white">
        Save
      </button>
    </form>
  );
};

export default Form;
