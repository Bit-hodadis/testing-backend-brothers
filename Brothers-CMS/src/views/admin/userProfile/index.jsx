import Loading from "components/Loading";
import Notification from "components/Notification";
import axiosInstance from "config/customAxios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Assume this comes from user data and is not editable
  });
  const [change, setChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setMessage("");
        setError(false);

        const result = await axiosInstance.get("/getUserProfile");
        console.log(result?.data?.data);
        const { data } = result?.data;
        setFormData({
          firstName: data?.first_name,
          lastName: data?.last_name,
          email: data?.email,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setMessage("fetching Error");
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
  }, [change]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data submitted:", formData);
    try {
      setLoading(true);
      setError(false);
      setMessage("");
      const result = await axiosInstance.put("/changeUserProfile", {
        first_name: formData.firstName,
        last_name: formData.lastName,
      });
      setMessage("updated Successfully");
      setLoading(false);
      setChange(!change);
    } catch (error) {
      setError(true);
      setLoading(false);
      setMessage("updating Error Please Try Again");
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const validatePassword = () => {
    let valid = true;
    let errors = {};

    if (passwordData.newPassword.length < 7) {
      errors.newPassword = "New password must be at least 7 characters long";
      valid = false;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      errors.confirmNewPassword = "New passwords do not match";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // Handle password change form submission
      console.log("Password data submitted:", passwordData);
      try {
        setLoading(true);
        setError(false);
        setMessage("");
        const result = await axiosInstance.put("/changePassword", {
          newPassword: passwordData.newPassword,
          oldPassword: passwordData.currentPassword,
        });
        setLoading(false);
        setMessage("updated Successfully");
      } catch (error) {
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
        setLoading(false);
        setError(true);
        if (error?.response?.data?.error === "old password is not correct") {
          setMessage("old password is not correct");
        } else setMessage("Error Please Try again");
      }
    }
  };

  return (
    <div className="mx-auto mt-10 flex  w-full max-w-md  flex-col justify-center   gap-6 lg:max-w-none  lg:flex-row">
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Notification typ="error">{message}</Notification>
      ) : (
        message && <Notification>{message}</Notification>
      )}
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="First Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            readOnly
            className="focus:shadow-outline w-full cursor-not-allowed appearance-none rounded border bg-gray-100 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Email"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
      >
        <h2 className="mb-6 text-xl font-bold">Change Password</h2>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Current Password"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="New Password"
            required
          />
          {errors.newPassword && (
            <p className="text-xs italic text-red-500">{errors.newPassword}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="confirmNewPassword"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Confirm New Password"
            required
          />
          {errors.confirmNewPassword && (
            <p className="text-xs italic text-red-500">
              {errors.confirmNewPassword}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 focus:outline-none"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
