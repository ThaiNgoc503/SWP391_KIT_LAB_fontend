import React, { useEffect, useState } from "react";
import banner from "../../assets/banner.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/bannerN2.png";
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
    <div className="bg-slate-100 p-2 sm:px-4 md:px-8 lg:px-10 xl:px-14">
      {/* BANNER SEARCH ADN CATEGORY */}
      <div className="flex justify-start">
        {/* Category list */}
        <div>
          <div className="mx-4 my-4 h-[10rem] w-[10rem] overflow-auto rounded-md bg-white px-2 py-1 text-xs sm:h-[13rem] sm:w-[10rem] md:h-[15rem] md:w-[13.4rem] md:text-base lg:h-[22rem] lg:w-[16.5] lg:font-medium xl:h-[25rem] xl:w-[16.5rem] [&::-webkit-scrollbar]:hidden">
            <h2 className="w-full rounded-sm bg-cyan-700 pl-2 text-sm md:text-base lg:text-lg xl:text-xl">
              Categories
            </h2>
            <ul className="p-2">
              {subcategories.map((subcategories, index) => (
                <Link
                  to={`subcategories/${subcategories.subcategoryName}/${subcategories.subcategoryId}`}
                >
                  <li
                    key={index}
                    className="from-slate-300 to-slate-200 p-1 hover:bg-gradient-to-r"
                  >
                    {subcategories.subcategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        {/* End Category */}
        {/* SEARCH AND BANNER*/}
        <div className="">
          {/* SEARCH AND PHONE */}
          <div className="flex w-full justify-start py-4">
            {/* SEARCH */}
            <form className="relative inline-block">
              <input
                type="text"
                placeholder="Enter product you want"
                className="h-[2rem] w-[10rem] rounded-md border-2 border-solid border-slate-300 px-2 py-1 pr-5 text-sm sm:h-[2.5rem] sm:w-[14rem] md:h-[3rem] md:w-[16rem] md:text-base lg:w-[22rem] lg:text-lg xl:h-[3.5rem] xl:w-[30rem] xl:text-xl"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="bg-primary absolute right-1 top-1 rounded-md bg-cyan-700 p-1 text-white sm:right-2 sm:top-2 md:right-2 md:top-1.5 md:p-2.5 xl:top-[8px] xl:p-3"
              >
                <IoIosSearch />
              </button>
            </form>

            {/* END SEARCH */}
            <div className="flex items-center pl-1 text-xs sm:pl-10 sm:text-sm md:text-base lg:text-lg xl:text-xl">
              <FaPhoneAlt className="w-2 sm:w-3 md:w-4 lg:w-5 xl:w-6" />{" "}
              <p className="pl-1">0918-888-777</p>
            </div>
          </div>
          {/* END SEARCH AND PHONE */}

          {/* BANNER */}
          <div>
            <img
              src={banner}
              alt=""
              className="w-[23.5rem] sm:w-[28rem] md:w-[30rem] lg:w-[45.5rem] xl:w-[55rem]"
            />
          </div>
          {/* END BANNER */}
        </div>
        {/* END SEARCH AND BANNER*/}
      </div>
      {/* END  BANNER SEARCH ADN CATEGORY  */}

      {/* PRODUCT CATEGORY AND BANNER  */}
      <div className="flex">
        {/* BANNER DOC */}
        <div>
          <div>
            <img
              src={banner3}
              alt=""
              className="mx-4 my-4 w-[9em] md:w-[13.5rem] lg:w-[12rem] xl:w-[15.5rem]"
            />
          </div>
          {/* END BANNER DOC */}
          <div className="">
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
        </div>
        {/* PRODUCT CATEGORY AND BANNER  */}

        <div>
          <CategoryHome currentSubCategoryId={1} subcategoryName="Robotics" />
          {/* <img src={banner2} alt="" className="" /> */}
          <CategoryHome currentSubCategoryId={2} subcategoryName="Computing" />
          <CategoryHome
            currentSubCategoryId={3}
            subcategoryName="Electronics"
          />
          <CategoryHome
            currentSubCategoryId={7}
            subcategoryName="Subscription"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
