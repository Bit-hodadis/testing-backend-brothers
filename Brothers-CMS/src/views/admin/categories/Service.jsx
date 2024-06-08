import NewCard from "components/card/New";
import FileInput from "components/file/fileInput";
// import Form from "./Form";
import { useState, useEffect } from "react";
import axiosInstance from "config/customAxios";
// import NewsDetail from "./NewDetail";
// import EditForm from "./EditForm";

import ServiceCategoryCard from "components/card/ServiceCategory";
import ServiceCategoryForm from "./ServiceForm";
import ServiceCategoryEditForm from "./ServiceEditForm";
import { useNavigate } from "react-router-dom";

const ServiceCategory = () => {
  const [serviceCategory, setServiceCategory] = useState([]);
  const [newID, setNewID] = useState(null);
  const [change, setChange] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axiosInstance.get("/getServiceCategory");
        setServiceCategory(result?.data?.data);
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
    console.log("show ");
    console.log(id, " the id is");
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
    <div className="flex justify-between gap-6 md:flex-row">
      <div className="max-h-[calc(100vh-10rem)] overflow-y-auto pt-16 md:w-1/3">
        <h2 className="py-3 text-lg">Service Category</h2>

        <div className="flex w-full flex-col gap-3">
          {serviceCategory.map((element) => {
            return (
              <ServiceCategoryCard
                className={
                  newID === element.id ? "border border-blueSecondary" : ""
                }
                onClick={handleSelect}
                key={element.id}
                id={element.id}
                title={element.title}
                image={element.image}
                description={element.description}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            );
          })}
          {serviceCategory?.length <= 0 ? (
            <p className="py-20  text-lg text-green-600">No Service Category</p>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <div className=" bg-gray-50 py-5 md:w-[70%]">
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
            <NewsDetail
              id={newID}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )
        ) : (
          <Form onClick={Save} />
        )}
      </div> */}
      <div className="h-screen w-[2px] bg-blueSecondary/20"></div>

      <div className="py-8 md:w-[50%]">
        {isEdit || newID ? (
          <div className="flex w-full justify-end pb-7">
            {" "}
            <button
              onClick={() => {
                setEdit(false);
                setNewID(null);
              }}
              className="self-end rounded-md bg-blueSecondary  py-2 px-10 text-sm font-semibold text-lightPrimary"
            >
              Add Service Cat
            </button>
          </div>
        ) : (
          ""
        )}
        {isEdit || newID ? (
          <ServiceCategoryEditForm
            id={newID}
            onSave={Save}
          ></ServiceCategoryEditForm>
        ) : (
          <ServiceCategoryForm onClick={Save}></ServiceCategoryForm>
        )}
      </div>
    </div>
  );
};

export default ServiceCategory;
