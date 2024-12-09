import React from "react";
import { Link } from "react-router-dom";

const CardHome = ({ categoryName, link, id }) => {
  return (
    <Link
      to={`/subcategories/${categoryName}/${id}`}
      className="my-2 ml-4 flex h-[9.5rem] w-[9.5rem] rounded-lg bg-white p-5 pb-6 md:h-[10rem] md:w-[10rem] lg:w-[12rem] xl:h-[14rem] xl:w-[15.5rem]"
    >
      <div className="ml-3.5 flex flex-col items-center justify-center rounded-full align-middle text-base font-semibold text-cyan-600">
        <img src={link} alt="anh" className="h-full w-full rounded-t-xl" />
        <h2 className="text-center">{categoryName}</h2>
      </div>
    </Link>
  );
};

export default CardHome;
