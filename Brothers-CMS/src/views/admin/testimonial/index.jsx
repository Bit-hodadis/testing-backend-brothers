import React from "react";
import image3 from "assets/img/profile/image3.png";
import { useEffect, useState } from "react";
import axiosInstance from "config/customAxios";
import TextField from "components/fields/TextField";
import Loading from "components/Loading";
import Notification from "components/Notification";
import { useNavigate } from "react-router-dom";

const Testimonial = () => {
  const testimonials = [
    {
      logo: image3,
      title: "Hahu Jobs",
      description: "this is the description of something",
    },
    {
      logo: image3,
      title: "Hahu Jobs",
      description: "this is the description of something",
    },
    {
      logo: image3,
      title: "Hahu Jobs",
      description: "this is the description of something",
    },
    {
      logo: image3,
      title: "Hahu Jobs",
      description: "this is the description of something",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonial, setTestimonial] = useState(null);
  const [change, setChanged] = useState(false);
  const [client, setClient] = useState([]);
  const [testimonialValue, setTestimonialValue] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(false);
        setMessage("");
        const result = await axiosInstance.get("/getTestimonial");
        console.log(result);
        setLoading(false);
        setTestimonial(result?.data?.data);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
        setMessage("fetching Error");
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
  }, [change]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(false);
        setMessage("");
        const result = await axiosInstance.get(
          "/getStackholders/?type='client"
        );
        console.log(result);
        setLoading(false);
        setClient(result?.data?.data);
      } catch (error) {
        console.log(error);
        setMessage("fetching Error");
        setLoading(false);
        setError(true);
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOption && testimonialValue) {
      setLoading(true);
      setError(false);
      setMessage("");
      try {
        const result = await axiosInstance.post("/addTestimonial", {
          description: testimonialValue,
          client_id: selectedOption,
        });
        setLoading(false);
        setIsModalOpen(false);

        setMessage("Successfully Add");
        setSelectedOption("");
        setTestimonialValue("");
        setChanged(!change);
      } catch (error) {
        setLoading(false);
        setError(true);
        setMessage("Error Please Try again");
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    } else {
      setMessage("please fill the form properly");
    }
  };

  const onDelete = async (id) => {
    // Handle delete functionality here

    try {
      setLoading(true);
      setError(false);
      setMessage("");

      const res = await axiosInstance.delete(`/deleteTestimonial/${id}`);
      setLoading(true);
      setError(false);
      setMessage("Successfully Deleted");
      setLoading(false);
      setChanged(!change);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      setMessage("Error Please Try again");
      if (error?.response?.data?.logout) {
        navigate("/auth/sign-in", { replace: true });
      }
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Notification type="error">{message}</Notification>
      ) : (
        message && <Notification>{message}</Notification>
      )}
      {isModalOpen && (
        <div className="fixed top-0 bottom-0 right-0 left-0 z-40 flex items-center justify-center overflow-y-auto bg-navy-800/60">
          <form
            className="relative flex min-h-[15rem] w-[80%] flex-col gap-2 rounded-md bg-white px-6 py-5 md:max-w-[30rem]"
            onSubmit={handleSubmit}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-2 rounded bg-red-400 px-2 py-1 text-lg font-medium text-lightPrimary"
            >
              X
            </button>
            <label className="px-3 text-lg font-semibold">Select Client</label>
            <select
              className="mb-5 h-[3rem] w-full rounded-md px-3"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e?.target?.value);
              }}
            >
              <option value="" disabled>
                Select The Client
              </option>
              {client.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e?.name}
                  </option>
                );
              })}
            </select>

            <TextField
              value={testimonialValue}
              label="Testimonial"
              placeholder="Enter The Testimonial Value"
              onChange={(e) => setTestimonialValue(e.target.value)}
            ></TextField>

            <button className="rounded bg-blueSecondary py-3 px-3 text-lightPrimary">
              Send
            </button>
          </form>
        </div>
      )}
      <div className="flex w-full flex-row justify-end py-8 ">
        {" "}
        <button
          className="w-[10rem] rounded bg-blueSecondary py-3 px-3 font-medium text-lightPrimary"
          onClick={() => setIsModalOpen(true)}
        >
          Add Testimonial
        </button>
      </div>

      <div className="flex flex-row flex-wrap gap-5">
        {testimonial?.map((test) => (
          <div
            key={test?.id}
            className="relative m-4 max-w-sm overflow-hidden rounded bg-white p-4 pt-12 shadow-lg md:w-[16rem] md:max-w-md"
          >
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <img
                className="h-24 w-24 rounded-full border-4 border-white object-contain object-center"
                src={test.logo}
                alt={test.name}
              />
            </div>
            <div className="mt-16 text-center">
              <div className="mb-2 text-xl font-bold text-gray-900">
                {test.name}
              </div>
              <p className="text-base text-gray-700">{test.description}</p>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => onDelete(test.id)}
                className="rounded-full bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {testimonial?.length === 0 && <p>No Testimonial</p>}
      </div>
    </div>
  );
};

export default Testimonial;
