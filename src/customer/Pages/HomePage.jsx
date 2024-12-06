import React, { useEffect, useState } from "react";
import banner from "../../assets/banner.png";
import banner2 from "../../assets/banner2.png";
import { getAllSubcategories } from "../../api/SubcategoriesAPI";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import CardHome from "../components/CardHome";
import CategoryHome from "../components/CategoryHome";
const HomePage = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubcategoriesAPI();
  }, []);

  const fetchSubcategoriesAPI = async () => {
    const response = await getAllSubcategories();
    setSubcategories(response);
  };

  const handleSearch = (e) => {
    if (searchValue.trim()) {
      console.log(searchValue);
      e.preventDefault();
      navigate(`/search-page?q=${searchValue.trim()}`);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-3 p-5 sm:grid-cols-2 md:mr-1 md:grid-cols-4 md:pl-[6rem]">
        <div className="sm:col-span-1 md:pl-2">
          <div className="z-50 h-[16rem] w-[10rem] bg-slate-100 transition-all ease-in-out md:h-[25rem] md:w-[15rem]">
            <div className="bg-cyan-700 p-2 text-xl">Categories</div>
            <ul className="h-[13rem] overflow-x-scroll text-black md:h-[22rem] [&::-webkit-scrollbar]:hidden">
              {subcategories.map((subcategories, index) => (
                <Link
                  to={`subcategories/${subcategories.subcategoryName}/${subcategories.subcategoryId}`}
                >
                  <li
                    key={index}
                    className="bg-opacity-50 p-2 text-sm font-medium hover:rounded-t-sm hover:bg-gradient-to-r hover:from-slate-300 hover:via-slate-300 hover:to-slate-200 hover:text-slate-900 md:py-4"
                  >
                    {subcategories.subcategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 grid space-y-2 sm:col-span-1 md:col-span-3 md:mr-20 md:gap-2">
          <div className="flex justify-between">
            <form className="relative flex w-full items-center md:w-auto">
              {/* SEARCH */}
              <input
                type="text"
                placeholder="Enter product you want"
                className="w-full rounded-sm border border-solid border-slate-200 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 md:w-[20rem]"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              <button
                onClick={handleSearch}
                className="absolute right-2 rounded bg-cyan-700 p-2 text-white hover:bg-cyan-800"
              >
                <IoIosSearch />
              </button>
            </form>
            {/* ------------ */}
            <div className="right-0 items-center md:flex">
              <FaPhoneAlt className="md:mr-3" /> 0918-888-777
            </div>
          </div>
          <div>
            <img
              src={banner}
              alt=""
              className="h-[13rem] w-[25rem] md:h-[350px] md:w-[80rem]"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 md:px-[5rem]">
        <CardHome
          categoryName="Chemistry"
          id={4}
          link="https://i5.walmartimages.com/seo/Dr-STEM-Toys-Kids-First-Chemistry-Set-Science-Kit-28-Pieces-Includes-Ten-Experiments-Goggles-Test-Tubes-All-in-a-Storage-Bucket_31ff2e67-3f27-45e2-94b0-d1d01ea27ad1.ca1ea5c89b0cb71f40ca992336a213c3.jpeg"
        />
        <CardHome
          categoryName="Physics"
          id={6}
          link="https://images-na.ssl-images-amazon.com/images/I/81Yeb65r3vL.jpg"
        />
        <CardHome
          categoryName="Subscription"
          id={7}
          link="https://www.subscriptionboxes.ca/wp-content/uploads/2016/02/all-inside-tinker2.jpg"
        />
        <CardHome
          categoryName="Engineering"
          id={8}
          link="https://upload.digoodcms.com/913/image_1667548255_Makerspace-Kit-(3).jpg"
        />
        <CardHome
          categoryName="Subscription"
          id={9}
          link="https://the3doodler.com/cdn/shop/files/3doodler-start_-box-2024.jpg?v=1732022233"
        />
      </div>
      <div>
        <CategoryHome currentSubCategoryId={1} subcategoryName="Robotics" />
        <img src={banner2} alt="" className="px-2 py-5 md:pl-[8rem]" />
        <CategoryHome currentSubCategoryId={2} subcategoryName="Computing" />
        <CategoryHome currentSubCategoryId={3} subcategoryName="Electronics" />
      </div>
    </div>
  );
};

export default HomePage;
