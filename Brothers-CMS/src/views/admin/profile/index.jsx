import React, { useState, useEffect } from "react";
import FileInput from "components/file/fileInput";
import axiosInstance from "config/customAxios";
import useFirebaseClient from "helper/uploadFile";
import Loading from "components/Loading";
import Notification from "components/Notification";
import { useNavigate } from "react-router-dom";
let isimageEdited = false;
const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    motto: "",
    about: "",
    mission: "",
    vision: "",
    coreValues: [],
  });

  const { uploadImages } = useFirebaseClient();
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [hasData, setHasData] = useState(false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    isimageEdited = false;
  }, []);

  const handleCoreValueChange = (index, value) => {
    const updatedCoreValues = [...formData.coreValues];
    updatedCoreValues[index] = value;
    setFormData({
      ...formData,
      coreValues: updatedCoreValues,
    });
  };

  const handleAddCoreValue = () => {
    setFormData({
      ...formData,
      coreValues: [...formData.coreValues, ""],
    });
  };

  const handleRemoveCoreValue = (index) => {
    const updatedCoreValues = formData.coreValues.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      coreValues: updatedCoreValues,
    });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(false);
        setHasData(false);

        const result = await axiosInstance.get("/getProfile");

        console.log(result);
        const data = result?.data?.data[0];
        console.log(data);
        if (data) {
          setFormData({
            ...formData,
            name: data?.name,
            logo: data?.logo,
            motto: data?.motto,
            about: data?.about,
            mission: data?.mission,
            coreValues: data?.corevalues,
            vision: data?.vision,
          });
          setHasData(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
        setMessage("Fetching Error");
        setHasData(true);
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
  }, [change]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = "Name is required";
    }
    if (!formData.logo) {
      validationErrors.logo = "Logo URL is required";
    }
    if (!formData.motto) {
      validationErrors.motto = "Motto is required";
    }
    if (!formData.about) {
      validationErrors.about = "About is required";
    }
    if (!formData.mission) {
      validationErrors.mission = "Mission is required";
    }
    if (!formData.vision) {
      validationErrors.vision = "Vision is required";
    }
    if (formData.coreValues.length === 0) {
      validationErrors.coreValues = "At least one core value is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let url;
      setLoading(true);
      setError(false);
      setMessage("");
      if (isimageEdited) url = await uploadImages(formData.logo);
      else url = formData?.logo;
      isimageEdited = false;
      if (hasData) {
        const result = await axiosInstance.put("/updateProfile", {
          name: formData.name,
          logo: url,
          motto: formData.motto,
          about: formData.about,
          vision: formData.vision,
          mission: formData.mission,
          coreValues: formData.coreValues,
        });

        console.log("Updating");
      } else {
        console.log("Adding For IT");
        const result = await axiosInstance.post("/addProfile", {
          name: formData.name,
          logo: url,
          motto: formData.motto,
          about: formData.about,
          vision: formData.vision,
          mission: formData.mission,
          coreValues: formData.coreValues,
        });
      }

      setChange(!change);

      setLoading(false);
      setMessage("updated Successfully");
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
      setMessage("Fetching Error");
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };

  const handleFileChange = (value) => {
    isimageEdited = true;
    setFormData({ ...formData, logo: value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Notification type="error">{message}</Notification>
      ) : (
        message && <Notification>{message}</Notification>
      )}
      <div className="w-full rounded-lg bg-white p-8 shadow-lg md:w-[80%]">
        <h1 className="mb-6 text-2xl font-bold">Organization Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="mb-2 block font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
              {errors.name && (
                <div className="text-sm text-red-500">{errors.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="logo"
                className="mb-2 block font-medium text-gray-700"
              >
                Logo
              </label>
              <FileInput
                onFileChange={handleFileChange}
                image={formData?.logo}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="motto"
                className="mb-2 block font-medium text-gray-700"
              >
                Motto:
              </label>
              <input
                id="motto"
                name="motto"
                type="text"
                value={formData.motto}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
              {errors.motto && (
                <div className="text-sm text-red-500">{errors.motto}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="about"
                className="mb-2 block font-medium text-gray-700"
              >
                About:
              </label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full rounded border p-2"
              ></textarea>
              {errors.about && (
                <div className="text-sm text-red-500">{errors.about}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="mission"
                className="mb-2 block font-medium text-gray-700"
              >
                Mission:
              </label>
              <textarea
                id="mission"
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                className="w-full rounded border p-2"
              ></textarea>
              {errors.mission && (
                <div className="text-sm text-red-500">{errors.mission}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="vision"
                className="mb-2 block font-medium text-gray-700"
              >
                Vision:
              </label>
              <textarea
                id="vision"
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                className="w-full rounded border p-2"
              ></textarea>
              {errors.vision && (
                <div className="text-sm text-red-500">{errors.vision}</div>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Core Values:
            </label>
            {formData.coreValues?.map((value, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleCoreValueChange(index, e.target.value)}
                  className="w-full rounded border p-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCoreValue(index)}
                  className="ml-2 rounded bg-red-500 px-3 py-1 text-white"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddCoreValue}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Add Core Value
            </button>
            {errors.coreValues && (
              <div className="text-sm text-red-500">{errors.coreValues}</div>
            )}
          </div>
          <button
            type="submit"
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
