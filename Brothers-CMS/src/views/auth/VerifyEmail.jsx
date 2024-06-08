import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { BsArrowBarRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/verifyEmail",
        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Custom-Header": "custom-value",
          },
        }
      )
      .then((response) => {
        setResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    console.log(token);
  }, [token]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {loading && <FaSpinner className="loading-icon mb-2 text-4xl" />}
      {response && (
        <FaCheckCircle className="success-icon mb-2 text-4xl text-green-500" />
      )}
      {error && (
        <FaExclamationCircle className="error-icon mb-2 text-4xl text-red-500" />
      )}
      <div className="text-center font-bold">
        {loading && "Loading..."}
        {response && response}
        {error && "Error Please Try again"}
        {!loading && !error && (
          <Link
            to={{ pathname: "/auth/sign-in" }}
            className="flex items-center gap-3 text-blueSecondary"
          >
            Login <BsArrowBarRight></BsArrowBarRight>
          </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
