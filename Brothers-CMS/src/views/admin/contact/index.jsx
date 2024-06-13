import axiosInstance from "config/customAxios";
import { useState, useEffect } from "react";
import Loading from "components/Loading";
import Notification from "components/Notification";

const ContactUS = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setError(false);
        setLoading(true);
        const result = await axiosInstance.get("/getContact");
        setUsers(result?.data?.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetch();
  }, []);

  const renderRows = () => {
    return users.map((user) => (
      <tr key={user.id} className="bg-white">
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          {user.name}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          {user.email}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          {user.phone}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          {user.message}
        </td>
      </tr>
    ));
  };

  return (
    <div className="py-8">
      <table className="min-w-full max-w-[100vw] divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              message
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default ContactUS;
