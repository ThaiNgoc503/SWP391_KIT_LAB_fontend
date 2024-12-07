import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className="grid grid-cols-3 bg-slate-50 py-5 pl-24">
      <div>
        <h2 className="text-xl font-semibold">About Us</h2>
        <p>
          Stempede Kit and Lab 1 offers an excellent environment for fostering
          children's creativity and critical thinking. It includes a variety of
          activities ranging from intellectual and logical games to those
          related to the fascinating world of physics.
        </p>
      </div>
      <div className="pl-5">
        <h2 className="text-xl font-semibold">Information</h2>
        <p className="flex items-center">
          <FaLocationDot />{" "}
          <div className="p-2">
            Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức,
            TP.HCM
          </div>
        </p>
        <p className="flex items-center">
          <IoMdMail />
          <div className="p-2">stempedeshop@gmail.com</div>
        </p>
        <p className="flex items-center">
          <FaPhoneAlt />
          <div className="p-2">0918-888-777</div>
        </p>
      </div>
      <div className="pl-5">
        <h2 className="text-xl font-semibold">Service</h2>
        <p>Kit</p>
        <p>Lab</p>
        <p>Support</p>
      </div>
    </div>
  );
};

export default Footer;
