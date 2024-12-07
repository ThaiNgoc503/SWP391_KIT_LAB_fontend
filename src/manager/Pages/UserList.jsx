import React, { useEffect, useState } from "react";
import { banUser, getAllUser } from "../../api/AdminAPI";

const UserList = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const fetchedUsers = (await getAllUser()).data.data;
    setUser(fetchedUsers);
  };

  const handleBanUser = async (userId) => {
    await banUser(userId); //ban user
    fetchAPI(); //load lại dữ liệu
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <h1 className="inline-block bg-gradient-to-br pb-5 pl-5 pt-5 text-2xl font-semibold">
        User List
      </h1>

      <div className="relative overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-left text-sm text-black">
          <thead className="border-t-[1px] border-white bg-slate-200 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                UserID
              </th>
              <th scope="col" className="px-6 py-3">
                FullName
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>

              <th scope="col" className="px-6 py-3">
                roles
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {user.length == 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              user
                .filter((user) => user.status === "Active")
                .map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b-[2px] bg-gradient-to-r from-slate-200 via-slate-100 to-violet-100 shadow-2xl backdrop-blur-3xl"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap border-r-[1px] px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="border-r-[1px] px-6 py-4">{user.userId}</td>
                    <td className="border-r-[1px] px-6 py-4">
                      {user.fullName}
                    </td>
                    <td className="border-r-[1px] px-6 py-4">
                      {user.username}
                    </td>
                    <td className="border-r-[1px] px-6 py-4">{user.roles}</td>
                    <td className="border-r-[1px] px-6 py-4">
                      <div className="flex gap-x-3">
                        <button
                          onClick={() => handleBanUser(user.userId)}
                          className="rounded-md bg-red-400 p-2 px-5 text-white"
                        >
                          Ban
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
