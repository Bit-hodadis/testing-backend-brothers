import { useState } from "react";
import NewsCategory from "./News";
import ServiceCategory from "./Service";

const Category = () => {
  const [active, setActive] = useState("new");
  const [link, setLink] = useState(["new", "service"]);

  const handleClick = (value) => {
    setActive(value);
  };

  return (
    <div className="w-full flex-col gap-16 py-16 ">
      <ul className="text-lm flex w-full justify-center gap-6">
        {link.map((ele) => {
          return (
            <li
              onClick={() => handleClick(ele)}
              className={`'roundedmd text-lightPrimary' cursor-pointer rounded-full border  border-blueSecondary  px-7 py-1 ${
                ele == active ? "bg-blueSecondary text-lightPrimary" : ""
              }`}
              key={ele}
            >
              {ele}
            </li>
          );
        })}
      </ul>
      <hr />
      {active == "new" ? (
        <NewsCategory></NewsCategory>
      ) : (
        <ServiceCategory></ServiceCategory>
      )}
    </div>
  );
};
export default Category;
