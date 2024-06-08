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
let isimageEdited = false;
const ServiceCategoryEditForm = ({ id, onSave }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { uploadImages } = useFirebaseClient();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await axiosInstance.get(
          `/getSingleServiceCategory?id=${id}`
        );
        setLoading(false);
        setTitle(result.data?.data[0]?.title);
        setDescription(result.data?.data[0]?.description);
        setImage(result.data?.data[0]?.image);
      } catch (error) {
        setError(false);
        setLoading(false);
        console.log(error);
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
  }, [id]);
  useEffect(() => {
    isimageEdited = false;
  }, []);

  const changeHandle = (value) => {
    setImage(value);
    isimageEdited = true;
  };

  const user = localStorage.getItem("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      if (isimageEdited) {
        const url = await uploadImages(image, "image");

        const result = await axiosInstance.put(`/updateServiceCategory`, {
          title: title,
          id: id,
          description: description,
          image: url,

          user_id: JSON.parse(user)?.id,
        });
        isimageEdited = false;
      } else {
        const result = await axiosInstance.put(`/updateServiceCategory`, {
          title: title,
          id: id,
          description: description,
          image: image,

          user_id: JSON.parse(user)?.id,
        });
      }
      setLoading(false);
      setError(false);
      onSave();
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };
  return (
    <form
      className="flex w-full flex-col gap-4 rounded-md bg-white px-5 py-6  dark:!bg-navy-800"
      onSubmit={handleSubmit}
    >
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <span className="text-lg text-red-800">
          Error please Refresh The Page
        </span>
      ) : (
        ""
      )}
      <div className=" h-full max-h-[calc(100vh-10rem)] w-full  flex-col gap-8 overflow-y-auto">
        <div>
          <span>Service Category Logo</span>
          <FileInput key={image} onFileChange={changeHandle} image={image} />
        </div>

        <InputField
          type="text"
          name="title"
          label="Title"
          placeholder="Title of Sevices"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          cols="8"
          label="Description"
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

export default ServiceCategoryEditForm;
