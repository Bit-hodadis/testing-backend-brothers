import axios from "axios";
import InputField from "components/fields/InputField";
import PopoverHorizon from "components/popover";
import axiosInstance from "config/customAxios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NewsCategory = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [changed, setChanged] = useState(false);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  console.log(category);
  useEffect(() => {
    const fetch = async () => {
      try {
        setError(false);
        setLoading(true);
        const result = await axiosInstance.get("/getNewsCategory");
        setCategory(result?.data?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
  }, [changed]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      const user = localStorage.getItem("user");

      const result = await axiosInstance.post(`/createNewsCategory`, {
        title: title,
        user_id: JSON.parse(user).id,
      });

      setLoading(false);
      setIsPopup(false);
      setChanged(!changed);
    } catch (error) {
      setLoading(false);
      setError(true);
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(false);
      setLoading(true);
      const user = localStorage.getItem("user");

      const result = await axiosInstance.delete(`/deteteNewsCategory/${id}`, {
        id: id,
      });

      setLoading(false);
      setIsPopup(false);
      setChanged(!changed);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-wrap gap-3  py-32">
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        category?.map((element) => {
          return (
            <div
              key={element.id}
              className="flex flex-col gap-3 rounded-md border border-gray-200 bg-white p-4 shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {element.title}
              </h3>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(element.id)}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
      <button
        onClick={() => setIsPopup(true)}
        className="fixed bottom-16 right-1 rounded bg-blueSecondary px-4 py-1 text-lightPrimary"
      >
        Add Category
      </button>

      {isPopup && (
        <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-navy-700/25 backdrop-blur-sm">
          <form
            className="relative rounded-md bg-white  px-8 py-6 shadow-lg"
            onSubmit={handleSubmit}
          >
            <button
              className="absolute top-1 right-1 rounded-md bg-green-700 px-2 py-2"
              onClick={() => setIsPopup(false)}
            >
              X
            </button>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Add Item
            </h2>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <InputField
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewsCategory;
