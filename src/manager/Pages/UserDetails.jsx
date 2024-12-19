import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../api/UsersAPI";

const UserDetails = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const response = await getUserProfile(username);
    if (response) {
      if (response.data) {
        setProfile(response.data.data);
      }
    }
  };
  return (
    <div className="h-screen bg-slate-100 p-5 md:px-[15rem]">
      <div className="bg-white-200 mt-9 w-[full] bg-white p-10">
        <h2 className="pb-5 text-left text-xl font-bold">
          Information of {username}
        </h2>
        <div className="flex flex-col gap-4 pl-5">
          <div className="flex gap-2">
            <h2 className="font-semibold">FullName:</h2>
            <p className="font-medium">{profile.fullName}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-semibold">Email:</h2>
            <p className="font-medium">{profile.email}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-semibold">Phone: </h2>
            <p className="font-medium">{profile.phone}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-semibold">Address: </h2>
            <p className="font-medium">{profile.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
