import { useState, useEffect } from "react";
import axiosInstance from "config/customAxios";
import ServicesDetail from "./ServiceDetail";
import EditForm from "./EditForm";
import Form from "./Form";
import ServiceCard from "components/card/ServiceCard";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [newID, setNewID] = useState(null);
  const [change, setChange] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axiosInstance.get("/getServices");
        setServices(result?.data?.data);
        console.log(result.data.data);
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.logout) {
          navigate("/auth/sign-in", { replace: true });
        }
      }
    };
    fetch();
  }, [change]);

  const handleDelete = (value) => {
    setChange(!change);
    setNewID(null);
  };

  const handleEdit = (id) => {
    setNewID(id);
    setEdit(true);
  };

  const handleSelect = (id) => {
    setNewID(id);
    setEdit(false);
  };
  const Save = () => {
    setChange(!change);
    setEdit(false);
  };

  return (
    <div className="flex gap-6 md:flex-row">
      <div className="max-h-[calc(100vh-10rem)] overflow-y-auto md:w-1/3">
        <h2>Service</h2>

        <div className="flex w-full flex-col gap-3">
          {services.map((element) => {
            return (
              <ServiceCard
                className={
                  newID === element.id ? "border border-blueSecondary" : ""
                }
                onClick={handleSelect}
                key={element.id}
                id={element.id}
                title={element.title}
                image={element.image}
                description={element.description}
              />
            );
          })}
        </div>
      </div>
      <div className=" bg-gray-50 py-5 md:w-[70%]">
        {newID && (
          <div className="flex justify-end">
            {" "}
            <button
              className="rounded-md bg-blueSecondary px-6 py-1 text-sm font-medium text-lightPrimary"
              onClick={() => {
                setNewID(null);
              }}
            >
              add News
            </button>
          </div>
        )}
        {newID ? (
          isEdit ? (
            <EditForm id={newID} onSave={Save} />
          ) : (
            <ServicesDetail
              id={newID}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )
        ) : (
          <Form onClick={Save} />
        )}
      </div>
    </div>
  );
};

export default Services;
