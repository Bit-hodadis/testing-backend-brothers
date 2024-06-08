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

const Form = ({ onClick }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // State for validation errors

  const { uploadImages } = useFirebaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axiosInstance.get("/getServiceCategory");
        setCategory(result?.data?.data);
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
  }, []);

  const changeHandle = (value) => {
    setImage(value);
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
      const url = await uploadImages(image, "image");
      const result = await axiosInstance.post(`/createService`, {
        title: title,
        description: description,
        image: url,
        category_id: Number(selectedOption),
      });
      onClick();
      setLoading(false);
      setImage(null);
      setSelectedOption("");
      setDescription("");
      setTitle("");
    } catch (error) {
      setLoading(false);
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
      {loading ? <Loading /> : ""}

      <div className="h-full max-h-[calc(100vh-10rem)] w-full flex-col gap-4 overflow-y-auto">
        <div>
          <span>News Logo</span>
          <FileInput onFileChange={changeHandle} />
          {errors.image && <div className="text-red-500">{errors.image}</div>}
        </div>

        <select
          className="mb-4 mt-10 w-64 rounded-md border border-gray-300 bg-white p-2 py-3 text-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="" disabled>
            Select a news category
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

export default Form;
