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
  const [publishedDate, setPublishedDate] = useState(new Date());
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
      }
    };
    fetch();
  }, []);

  const changeHandle = (value) => {
    setImage(value);
    console.log("Base64 String:", value);
  };

  const user = localStorage.getItem("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const url = await uploadImages(image, "image");
      const date = new Date(publishedDate);
      date.setDate(date.getDate() + 1);
      const result = await axiosInstance.post(`/createNews`, {
        title: title,
        content: description,
        image: url,
        published_date: date,
        category_id: Number(selectedOption),
        user_id: JSON.parse(user)?.id,
      });
      onClick();
      setLoading(false);
      setImage(null);
      setSelectedOption("");
      setDescription("");
      setPublishedDate("");
      setTitle("");
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };
  useEffect(() => {
    console.log(publishedDate, "published Date ....");
  });
  return (
    <form
      className="flex flex-col gap-4 bg-white px-5  dark:!bg-navy-800"
      onSubmit={handleSubmit}
    >
      {loading ? <Loading /> : ""}

      <div className=" h-full max-h-[calc(100vh-10rem)] w-full  flex-col gap-4 overflow-y-auto">
        <div>
          <span>News Logo</span>
          <FileInput onFileChange={changeHandle} />
        </div>

        <select
          className="mb-4 mt-10 w-64 rounded-md border border-gray-300  bg-white p-2 py-3 text-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="" disabled>
            Select an news category
          </option>
          {category.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>

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
        <div className="w-full font-semibold">
          <span>Published Date</span>
          <MiniCalendar
            value={publishedDate}
            onChange={setPublishedDate}
          ></MiniCalendar>
        </div>
      </div>

      <button className=" z-10  place-self-end rounded-md bg-blueSecondary px-16 py-2  text-sm font-semibold text-white">
        Save
      </button>
    </form>
  );
};

export default Form;
