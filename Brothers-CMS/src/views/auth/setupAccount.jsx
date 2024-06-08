import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { BsArrowBarRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import axiosInstance from "config/customAxios";
import InputField from "components/fields/InputField";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import Notification from "components/Notification";

const SetupAccount = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Reset errors
    setPasswordError("");
    setConfirmPasswordError("");

    if (newPassword.length < 7) {
      setPasswordError("Password should be 7 or more characters.");
      valid = false;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      setLoading(true);
      setError(false);
      const result = await axiosInstance.post(
        "/setupPassword",
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Custom-Header": "custom-value",
          },
        }
      );
      setLoading(false);
      navigate("/auth/sign-in", { replace: true });
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-start justify-center">
      <form
        onSubmit={handleSubmit}
        className="md:w-md flex flex-col gap-3 rounded-lg bg-white px-3 py-2"
      >
        <h2 className="py-4 text-lg font-semibold">Setup Password</h2>

        <InputField
          type="password"
          name="password"
          label="New Password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e?.target?.value)}
        />
        {passwordError && (
          <p className="mt-1 text-xs text-red-500">{passwordError}</p>
        )}

        <InputField
          type="password"
          name="confirm"
          label="Confirm Password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e?.target?.value)}
        />
        {confirmPasswordError && (
          <p className="mt-1 text-xs text-red-500">{confirmPasswordError}</p>
        )}

        <button
          type="submit"
          className="rounded-md bg-blueSecondary px-7 py-1 text-lg font-medium text-lightPrimary"
        >
          Reset
        </button>
      </form>

      {loading ? (
        <Loading />
      ) : error ? (
        <Notification type="error">Error Please Try Again</Notification>
      ) : (
        ""
      )}
    </div>
  );
};

export default SetupAccount;
