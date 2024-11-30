import  { useEffect, useState } from "react";
import { getUserProfile } from "../../api/UsersAPI";

const Profile = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    fetchAPI();
  }, []);
  
  const fetchAPI = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const response = await getUserProfile();
      setProfile(response);
    }
  };

  return (
    <div className="p-5 md:px-[15rem] bg-slate-100 h-screen">
      <div className=" w-[full] mt-9 bg-white p-10 bg-white-200">
        <h2 className="text-left font-bold text-xl">My Profile</h2>
        <form className="pt-5 grid grid-cols-2 gap-5">
          <div>
            <p>FullName:</p>
            <input
              type="text"
              value={profile.fullName}
              className="border-solid border-slate-500-200 border-2 rounded-md px-3 py-1  w-full"
            />
          </div>
          <div>
            <p>Email:</p>
            <input
              type="text"
              value={profile.email}
              className="border-solid border-slate-500-200 border-2 rounded-md px-3 py-1  w-full"
            />
          </div>
          <div>
            <p>Phone: </p>
            <input
              type="text"
              value={profile.phone}
              className="border-solid border-slate-500-200 border-2 rounded-md px-3 py-1  w-full"
            />
          </div>
          <div>
            <p>Address: </p>
            <input
              type="text"
              value={profile.address}
              className="border-solid border-slate-500-200 border-2 rounded-md px-3 py-1  w-full"
            />
          </div>
          <div className="col-span-2">
          <button className="bg-green-400 p-2 rounded-full">Save Change</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
