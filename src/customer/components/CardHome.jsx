import React from "react";
import { Link } from "react-router-dom";

const CardHome = ({ categoryName, link, id }) => {
  return (
    <div>
      <div className="relative m-2 inline-block h-[12rem] min-h-[12rem] w-[12rem] space-y-4 overflow-hidden rounded-lg bg-slate-50 p-10 hover:bg-slate-200">
        <Link
          to={`/subcategories/${categoryName}/${id}`}
          className="space-y-2 rounded-full text-base font-bold text-cyan-600"
        >
          <img
            src={link}
            alt="anh"
            className="h-full w-full rounded-t-xl pt-[0px]"
          />

          <h2 className="text-center">{categoryName}</h2>
        </Link>
      </div>
    </div>
  );
};

export default CardHome;
