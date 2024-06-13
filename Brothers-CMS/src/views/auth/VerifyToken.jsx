import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "config/customAxios";
import Loading from "components/Loading";
import Notification from "components/Notification";

export default function VerifyToken() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [verified, setVerified] = useState("loading");

  useEffect(() => {
    const verify = async () => {
      console.log(token);
      try {
        const decodedToken = JSON.parse(window.atob(token.split(".")[1]));

        const send = await axiosInstance.post(
          "/resetPasswordVerify",
          {},

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Custom-Header": "custom-value",
            },
          }
        );

        localStorage.setItem("email", decodedToken?.email);
        setVerified(decodedToken?.email);
      } catch (error) {
        console.log(error);
        setVerified("error");
      }
    };
    verify();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      setLoading(true);
      const decodedToken = JSON.parse(window.atob(token.split(".")[1]));
      const send = await axiosInstance.post(
        "/resetPassword",
        {
          email: decodedToken?.email,
          newPassword: newPassword,
          token,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Custom-Header": "custom-value",
          },
        }
      );
      setLoading(false);

      setMessage(JSON.stringify(send.data));
      localStorage.setItem("email", decodedToken?.email);

      navigate("/auth/sign-in", { replace: true });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      setMessage(JSON.stringify(error?.response?.data));
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full  items-center justify-center  px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {loading ? (
        <Loading />
      ) : error ? (
        <Notification type="error">Error please try again</Notification>
      ) : (
        ""
      )}
      {verified === "loading" ? (
        <p>Loading</p>
      ) : verified === "error" ? (
        <p className="text-red">Error Please Try Again with New Link</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]"
        >
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Reset New Password
          </h4>

          <p className="mb-9 ml-1 text-base text-gray-600">
            Enter your new and confirm password to reset!
          </p>
          <span>{message}</span>

          <div className="mb-6 flex items-center  gap-3">
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
            <p className="text-base text-gray-600 dark:text-white"> or </p>
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          </div>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="new password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            id="newpassword"
            type="password"
          />
          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="newPassword*"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="New Password"
            id="newpassword"
            type="password"
          />
          {/* Checkbox */}

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            update
          </button>
        </form>
      )}
    </div>
  );
}
