import InputField from "components/fields/InputField";
import StackholderCard from "./Card";
import FileInput from "components/file/fileInput";
import { useState, useEffect } from "react";
import useFirebaseClient from "helper/uploadFile";
import axiosInstance from "config/customAxios";
import Loading from "components/Loading";
import Notification from "components/Notification";
import { FiXSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Stackholder = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isRemovedModal, setIsRemovedModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [change, setChange] = useState(false);

  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const { uploadImages } = useFirebaseClient();
  const user = localStorage.getItem("user");
  const [stackholders, setStackholders] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await axiosInstance.get("/getStackholders");

        setLoading(false);

        console.log(result);
        setStackholders(result?.data?.data);
      } catch (error) {
        setLoading(false);
        setError(true);
        setMessage("fetching Error");
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
  }, [change]);

  const handleChange = (value) => {
    setImage(value);
  };

  const handleDelete = () => {
    setChange(!change);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setMessage(null);
      setError(false);
      setLoading(true);

      const url = await uploadImages(image);
      console.log(JSON.parse(user)?.id);

      const result = await axiosInstance.post("/addStackholders", {
        user_id: JSON.parse(user)?.id,
        name: name,
        logo: url,
        type: selectedOption,
      });
      setChange(!change);
      setMessage("successfull");
      setLoading(false);
      setIsRemovedModal(true);
      setName(null);
    } catch (error) {
      setError(true);
      setLoading(false);
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
      setMessage("Error Please Try Again");
    }
  };

  const controllModale = () => {
    setIsRemovedModal(true);
    setLoading(false);
    setError(false);
  };

  return (
    <div className="relative w-full">
      {loading ? (
        <Loading />
      ) : error ? (
        <Notification type="error">{message} </Notification>
      ) : (
        message && <Notification>{message}</Notification>
      )}
      <div className="flex w-full flex-wrap gap-5 py-11">
        {stackholders?.map((element) => {
          return (
            <StackholderCard
              id={element.id}
              name={element.name}
              logo={element.logo}
              key={element.id}
              touched_by={element.fname + " " + element.lname}
              type={element.type}
              onDelete={handleDelete}
            ></StackholderCard>
          );
        })}
      </div>
      {!isRemovedModal && (
        <div className=" fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-navy-700/25">
          <form
            className="relative flex  w-[80%] flex-col gap-5 rounded-md bg-lightPrimary px-4 py-4 md:max-w-[30rem]"
            onSubmit={handleAdd}
          >
            <div className="flex cursor-pointer flex-col gap-2">
              <FiXSquare
                className="absolute top-2 right-1 w-5"
                onClick={controllModale}
              />
              <label>Logo</label>
              <FileInput onFileChange={handleChange} />
            </div>
            <select
              className="mb-4 mt-10 w-64 rounded-md border border-gray-300  bg-white p-2 py-3 text-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="" disabled>
                Select Client Type
              </option>
              {["client", "partner", "both"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <InputField
              name="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="name of client or partner "
              label="Name"
            ></InputField>

            <button
              type="submit"
              className="rounded-md bg-blueSecondary px-6 py-2 text-lightPrimary"
            >
              Add Stackholder
            </button>
          </form>
        </div>
      )}

      <div className="right-o sticky top-[2rem] flex justify-end">
        <button
          className="rounded-md bg-blueSecondary px-6 py-2 text-lightPrimary"
          onClick={() => {
            setIsRemovedModal(false);
          }}
        >
          Add Stackholder
        </button>
      </div>
    </div>
  );
};

export default Stackholder;
