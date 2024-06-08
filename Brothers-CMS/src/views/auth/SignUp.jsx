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

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Reset errors
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    if (!firstName) {
      setFirstNameError("First Name is required");
      valid = false;
    }
    if (!lastName) {
      setLastNameError("Last Name is required");
      valid = false;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (password.length <= 6) {
      setPasswordError("Password should be more than 6 characters.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const send = await axiosInstance.post("/register", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });
      setLoading(false);
      setSent(true);
      setMessage("Successfully sent");
    } catch (error) {
      setSent(false);
      setLoading(false);
      setError(true);
      console.log(error);
      setMessage(JSON.stringify(error?.response?.data.error));
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full  items-center justify-center  px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Notification type="error">{message}</Notification>
      ) : (
        message && <Notification>{message}</Notification>
      )}

      {sent ? (
        <div className="flex flex-col">
          <p>
            The Verification Link is Sent into Your Email. Please Visit Your
            Email
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]"
        >
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Register
          </h4>
          {message}

          <p className="mb-9 ml-1 text-base text-gray-600"></p>

          <div className="mb-6 flex items-center  gap-3">
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
            <p className="text-base text-gray-600 dark:text-white"> or </p>
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          </div>
          {/* First Name */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="First Name"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            id="first_name"
            type="text"
          />
          {firstNameError && (
            <p className="mt-1 text-xs text-red-500">{firstNameError}</p>
          )}
          {/* Last Name */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Last Name*"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Last Name"
            id="last_name"
            type="text"
          />
          {lastNameError && (
            <p className="mt-1 text-xs text-red-500">{lastNameError}</p>
          )}
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="example@gmail.com"
            id="email"
            type="email"
          />
          {emailError && (
            <p className="mt-1 text-xs text-red-500">{emailError}</p>
          )}
          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            id="password"
            type="password"
          />
          {passwordError && (
            <p className="mt-1 text-xs text-red-500">{passwordError}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            SignUp
          </button>
          <div className="mt-4">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
              Already have an account?
            </span>
            <Link
              to={{ pathname: "/auth/sign-in" }}
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
