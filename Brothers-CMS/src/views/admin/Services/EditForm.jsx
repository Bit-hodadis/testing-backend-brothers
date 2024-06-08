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
let isimageEdited = false;

const EditForm = ({ id, onSave }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState(new Date());
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({}); // State for validation errors

  const { uploadImages } = useFirebaseClient();
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axiosInstance.get("/getNewsCategory");
        setCategory(result?.data?.data);
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
    isimageEdited = false;
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await axiosInstance.get(`/singleService?id=${id}`);
        setLoading(false);
        setTitle(result.data?.data[0]?.title);
        setDescription(result.data?.data[0]?.description);
        setImage(result.data?.data[0]?.image);
        setSelectedOption(result.data?.data[0]?.cat_id);
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

  const changeHandle = (value) => {
    setImage(value);
    isimageEdited = true;
    console.log("Base64 String:", value);
  };

  const user = localStorage.getItem("user");

  const validate = () => {
    const newErrors = {};
    if (!image) newErrors.image = "Image is required";
    if (!selectedOption) newErrors.selectedOption = "Category is required";
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setError(false);
      let imageUrl = image;
      if (isimageEdited) {
        imageUrl = await uploadImages(image, "image");
        isimageEdited = false;
      }
      const result = await axiosInstance.put(`/updateService`, {
        title: title,
        id: id,
        description: description,
        image: imageUrl,
        category_id: Number(selectedOption),
        user_id: JSON.parse(user)?.id,
      });
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
      className="flex flex-col gap-4 bg-white px-5 dark:!bg-navy-800"
      onSubmit={handleSubmit}
    >
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Notification type="error">
          Error Please Check Your Value or Internet Connection
        </Notification>
      ) : (
        ""
      )}
      <div className="h-full max-h-[calc(100vh-10rem)] w-full flex-col gap-4 overflow-y-auto">
        <div>
          <span>News Logo</span>
          <FileInput onFileChange={changeHandle} image={image} />
          {errors.image && <div className="text-red-500">{errors.image}</div>}
        </div>
        <select
          className="mb-4 w-64 rounded-md border border-gray-300 p-2 text-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="" disabled>
            Select a news Category
          </option>
          {category.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        {errors.selectedOption && (
          <div className="text-red-500">{errors.selectedOption}</div>
        )}
        <InputField
          type="text"
          name="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <div className="text-red-500">{errors.title}</div>}
        <TextField
          cols="8"
          label="Description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <div className="text-red-500">{errors.description}</div>
        )}
      </div>
      <button className="z-10 place-self-end rounded-md bg-blueSecondary px-16 py-2 text-sm font-semibold text-white">
        Save
      </button>
    </form>
  );
};

export default EditForm;
