import React from "react";
import { Link } from "react-router-dom";

const CardHome = ({ categoryName, link, id }) => {
  return (
    <Link
      to={`/subcategories/${categoryName}/${id}`}
      className="my-3 flex h-[9.5rem] w-[9.5rem] rounded-lg bg-white p-10 md:ml-14 md:h-[10rem] md:w-[10rem] lg:ml-12 xl:h-[14rem] xl:w-[13rem]"
    >
      <div className="space-y-2 rounded-full text-base font-bold text-cyan-600">
        <img
          src={link}
          alt="anh"
          className="h-full w-full rounded-t-xl pt-[0px]"
        />

        <h2 className="text-center">{categoryName}</h2>
      </div>
    </Link>
  );
};

export default CardHome;
