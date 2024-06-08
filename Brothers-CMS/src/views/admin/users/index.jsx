import axiosInstance from "config/customAxios";
import { useState, useEffect } from "react";
import PopupForm from "./PopupForm";
import Loading from "components/Loading";
import Notification from "components/Notification";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const [message, setMessage] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    status: "",
    role: "",
  });

  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(false);
        setMessage(null);

        const result = await axiosInstance.get("/getUsers");
        setUsers(result?.data?.data);

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        setError(true);
        setMessage("Error Fetching");
      }
    };
    fetchUsers();
  }, [change]);

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setFormData(userToEdit);
    // Open modal here
  };

  const handleChangeStatus = async (id, status) => {
    try {
      const result = await axiosInstance.put(`/changeStatus`, {
        status: status === "active" ? "deactive" : "active",
        id: id,
      });
      setChange(!change);
      // Update user status in state or refetch users
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const handleClose = () => {
    setIsPopup(false);
  };

  const submitHandler = () => {
    setChange(!change);
  };

  const deleleteHandler = async (id) => {
    try {
      setLoading(true);
      setError(false);
      setMessage(null);
      const result = await axiosInstance.delete(`/deleteUser/${id}`);
      setLoading(false);
      setMessage("successfull");
      setChange(!change);
    } catch (error) {
      setError(true);
      setLoading(false);
      setMessage(
        "deletion is not successfull please check if the users is depends on the other content"
      );
      console.log(error);
    }
  };

  const renderRows = () => {
    return users.map((user) => (
      <tr key={user.id} className="bg-white">
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          {user.id}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          {user.first_name}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          {user.last_name}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          {user.email}
        </td>
        <td>
          <span
            className={`whitespace-nowrap rounded-[100%]  px-3 py-2 text-sm font-medium ${
              user.status === "active"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            } rounded-md`}
          >
            {user.status}
          </span>{" "}
          <div></div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          <button
            onClick={() => deleleteHandler(user.id)}
            className="mr-2 text-red-500 hover:text-red-700"
          >
            delete
          </button>

          <button
            onClick={() => handleChangeStatus(user.id, user?.status)}
            className={`rounded-md px-2 py-1 text-sm ${
              user.status === "Active"
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800"
            } hover:bg-opacity-75`}
          >
            {user.status === "active" ? "Deactivate" : "Activate"}
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="mt-22 overflow-x-auto">
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Notification type="error">{message}</Notification>
      ) : (
        message && <Notification>{message}</Notification>
      )}
      {isPopup && (
        <PopupForm onClose={handleClose} onSubmit={submitHandler}></PopupForm>
      )}
      <div className="flex w-full justify-end pt-6">
        <button
          className="rounded bg-blueSecondary/80 px-6 py-3 text-lg font-semibold text-lightPrimary hover:bg-blueSecondary"
          onClick={() => setIsPopup(true)}
        >
          Add user
        </button>
      </div>
      <table className="min-w-full max-w-[100vw] divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default Users;
