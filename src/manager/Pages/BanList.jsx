import React, { useEffect, useState } from "react";
import { getAllUser, unbanUser } from "../../api/AdminAPI";

const BanList = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const fetchedUsers = (await getAllUser()).data.data;
    setUser(fetchedUsers);
  };

  const handleUnBanUser = async (userId) => {
    await unbanUser(userId);
    fetchAPI();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-cyan-300 backdrop-blur-3xl">
      <h1 className="inline-block bg-gradient-to-br from-red-500 via-yellow-500 to-purple-300 bg-clip-text pb-5 pl-5 pt-5 text-2xl font-semibold text-transparent">
        Ban User List
      </h1>

      <div class="relative overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <table class="w-full text-left text-sm text-white">
          <thead class="border-t-[1px] border-white bg-gray-50 bg-gradient-to-br from-red-200 to-cyan-300 text-xs uppercase text-gray-700 shadow-xl backdrop-blur-2xl">
            <tr>
              <th scope="col" class="px-6 py-3">
                #
              </th>
              <th scope="col" class="px-6 py-3">
                UserID
              </th>
              <th scope="col" class="px-6 py-3">
                FullName
              </th>
              <th scope="col" class="px-6 py-3">
                Username
              </th>
              <th scope="col" class="px-6 py-3">
                status
              </th>
              <th scope="col" class="px-6 py-3">
                roles
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {user.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              user
                .filter((user) => user.status === "Banned")
                .map((user, index) => (
                  <tr
                    key={user.id}
                    class="border-b-[2px] bg-gradient-to-r from-rose-300 via-sky-400 to-violet-300 shadow-2xl backdrop-blur-3xl"
                  >
                    <th
                      scope="row"
                      class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td class="border-r-[1px] px-6 py-4">{user.userId}</td>
                    <td class="border-r-[1px] px-6 py-4">{user.fullName}</td>
                    <td class="border-r-[1px] px-6 py-4">{user.username}</td>
                    <td class="border-r-[1px] px-6 py-4">{user.status}</td>
                    <td class="border-r-[1px] px-6 py-4">{user.roles}</td>
                    <td class="border-r-[1px] px-6 py-4">
                      <div className="flex gap-x-3">
                        <button
                          onClick={() => handleUnBanUser(user.userId)}
                          className="rounded-md bg-green-400 p-2 px-3 text-white"
                        >
                          Unban
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

export default BanList;
