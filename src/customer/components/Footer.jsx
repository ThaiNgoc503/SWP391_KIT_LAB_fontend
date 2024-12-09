import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className="grid grid-cols-4 bg-slate-50 py-5 pl-24">
      <div>
        <h2 className="text-xl font-semibold">About Us</h2>
        <p>
          Stempede Kit and Lab 1 offers an excellent environment for fostering
          children's creativity and critical thinking. It includes a variety of
          activities ranging from intellectual and logical games to those
          related to the fascinating world of physics.
        </p>
      </div>
      <div className="pl-10">
        <h2 className="text-xl font-semibold">Information</h2>
        <p className="flex items-center">
          <FaLocationDot className="text-2xl" />
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
      <div className="pl-32">
        <h2 className="text-xl font-semibold">Service</h2>
        <p>Kit</p>
        <p>Lab</p>
        <p>Support</p>
      </div>
      <div className="pl-5">
        <h2 className="text-xl font-semibold">Contact</h2>
        <div className="flex space-x-1 pt-2">
          <a href="https://www.linkedin.com/in/kit-and-lab-stempede-39b0a9340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
            <FaLinkedin className="text-lg" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61570075288398">
            <FaFacebookSquare className="text-lg" />
          </a>
          <a href="https://www.instagram.com/stem.pedeshop/?igsh=MTh2cGpqdzR2aGN1MQ%3D%3D">
            <FaInstagramSquare className="text-lg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
