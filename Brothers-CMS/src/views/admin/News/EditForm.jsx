import React, { useEffect, useState } from "react";
import FileInput from "components/file/fileInput"; // Ensure the correct import path
import InputField from "components/fields/InputField"; // Adjust the import path as needed
import TextField from "components/fields/TextField"; // Adjust the import path as needed
import MiniCalendar from "components/calendar/MiniCalendar";

import axiosInstance from "config/customAxios";
import Loading from "components/Loading";
import useFirebaseClient from "helper/uploadFile";
import { useNavigate } from "react-router-dom";
let isimageEdited = false;
const EditForm = ({ id, onSave }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState(new Date());
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    isimageEdited = false;
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { uploadImages } = useFirebaseClient();

  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axiosInstance.get("/getNewsCategory");
        setCategory(result?.data?.data);
      } catch (error) {
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
        console.log(error);
      }
    };
    fetch();
  }, []);
  console.log(id, "idd jdsjdh");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await axiosInstance.get(`/getNew?id=${id}`);
        setLoading(false);
        setTitle(result.data?.data[0]?.title);
        setDescription(result.data?.data[0]?.content);
        setImage(result.data?.data[0]?.image);

        setPublishedDate(new Date(result.data?.data[0]?.published_date));
        console.log(result.data?.data[0]?.published_date);
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
    console.log("Base64 String:", value);
    isimageEdited = true;
  };

  const user = localStorage.getItem("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(new Date(publishedDate).toLocaleString(), "....... The Date");
    try {
      setLoading(true);
      setError(false);
      const date = new Date(publishedDate);
      date.setDate(date.getDate() + 1);
      if (isimageEdited) {
        const url = await uploadImages(image, "image");

        const result = await axiosInstance.put(`/updateNew`, {
          title: title,
          id: id,
          content: description,
          image: url,
          published_date: date,
          category_id: Number(selectedOption),
          user_id: JSON.parse(user)?.id,
        });
      } else {
        const result = await axiosInstance.put(`/updateNew`, {
          title: title,
          id: id,
          content: description,
          image: image,
          published_date: date,
          category_id: Number(selectedOption),
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
      className="flex flex-col gap-4 bg-white px-5  dark:!bg-navy-800"
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
      <div className=" h-full max-h-[calc(100vh-10rem)] w-full  flex-col gap-4 overflow-y-auto">
        <div>
          <span>News Logo</span>
          <FileInput onFileChange={changeHandle} image={image} />
        </div>
        <select
          lassName="w-64 p-2 mb-4 text-lg border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="" disabled>
            Select an news Category
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

export default EditForm;
