import { useEffect, useState } from "react";
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
    <div className="h-screen bg-slate-100 p-5 md:px-[15rem]">
      <div className="bg-white-200 mt-9 w-[full] bg-white p-10">
        <h2 className="text-left text-xl font-bold">My Profile</h2>
        <form className="grid grid-cols-2 gap-5 pt-5">
          <div>
            <p>FullName:</p>
            <input
              type="text"
              value={profile.fullName}
              className="border-slate-500-200 w-full rounded-md border-2 border-solid px-3 py-1"
            />
          </div>
          <div>
            <p>Email:</p>
            <input
              type="text"
              value={profile.email}
              className="border-slate-500-200 w-full rounded-md border-2 border-solid px-3 py-1"
            />
          </div>
          <div>
            <p>Phone: </p>
            <input
              type="text"
              value={profile.phone}
              className="border-slate-500-200 w-full rounded-md border-2 border-solid px-3 py-1"
            />
          </div>
          <div>
            <p>Address: </p>
            <input
              type="text"
              value={profile.address}
              className="border-slate-500-200 w-full rounded-md border-2 border-solid px-3 py-1"
            />
          </div>
          <div className="col-span-2">
            <button className="rounded-full bg-slate-200 p-2 hover:bg-cyan-700 hover:text-white">
              Save Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
