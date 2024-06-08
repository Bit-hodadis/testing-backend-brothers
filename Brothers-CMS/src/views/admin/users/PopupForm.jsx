import Loading from "components/Loading";
import Notification from "components/Notification";
import InputField from "components/fields/InputField";
import axiosInstance from "config/customAxios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PopupForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error message when user types
  };

  const validateInputs = () => {
    let errors = {};

    if (!first_name) errors.first_name = "First Name is required";
    if (!last_name) errors.last_name = "Last Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const result = await axiosInstance.post("/registerEmployee", {
        first_name,
        last_name,
        email,
      });

      setMessage("User added successfully");
      setIsLoading(false);
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
      setIsLoading(false);
      setMessage("Error. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-800 bg-opacity-50">
      {isLoading ? (
        <Loading />
      ) : (
        message && (
          <Notification type={isError ? "error" : "success"}>
            {message}
          </Notification>
        )
      )}
      <div className="max-w-sm rounded-lg bg-white p-8 shadow-lg md:max-w-md lg:w-[30%]">
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4 w-full">
            <InputField
              type="text"
              label="First Name"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              value={first_name || ""}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              error={errors.first_name}
            />
            {errors.first_name && (
              <p className="text-sm text-red-500">{errors.first_name}</p>
            )}
          </div>
          <div className="mb-4 w-full">
            <InputField
              type="text"
              label="Last Name"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              value={last_name || ""}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              error={errors.last_name}
            />
            {errors.last_name && (
              <p className="text-sm text-red-500">{errors.last_name}</p>
            )}
          </div>
          <div className="mb-4 w-full">
            <InputField
              type="text"
              id="email"
              name="email"
              label="Email"
              placeholder="example@gmail.com"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              error={errors.email}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
