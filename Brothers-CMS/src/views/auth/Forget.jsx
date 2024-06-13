import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsArrow90DegLeft, BsBack } from "react-icons/bs";
import axiosInstance from "config/customAxios";
import Loading from "components/Loading";
import Notification from "components/Notification";

export default function Forget() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const onChangeEmail = (e) => {
    setEmail(e?.target?.value);
    console.log(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      const send = await axiosInstance.post("/forgetPassword", {
        email,
      });
      setMessage(JSON.stringify(send.data));
      localStorage.setItem("user", send.data);
      setIsSuccess(true);
      setLoading(false);

      // navigate("/admin", { replace: true });
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
      setMessage(JSON.stringify(error?.response?.data?.error));
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full  items-center justify-center  px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      {loading ? (
        <Loading />
      ) : error ? (
        <Notification type="error">Error please try again</Notification>
      ) : (
        ""
      )}
      {isSuccess ? (
        <div className="flex h-[20rem]  flex-col  justify-center gap-2 ">
          <h2 className="text-xl font-bold md:text-3xl">Link is Sent</h2>

          <p>Please Visit your email and follow the link! </p>
          <Link
            to={{ pathname: "/auth/sign-in" }}
            className="flex items-center gap-3 text-blueSecondary"
          >
            <BsArrow90DegLeft></BsArrow90DegLeft> Back to Login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]"
        >
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Forget Password
          </h4>
          {message}

          <p className="mb-9 ml-1 text-base text-gray-600">
            Enter your email that you want to get password reset link!
          </p>

          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            onChange={onChangeEmail}
            value={email}
            id="email"
            type="text"
          />

          {/* Checkbox */}

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}
