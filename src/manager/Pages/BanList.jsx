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
    <div className="bg-slate-500">
      <h1 className="pb-5 pt-5 text-center text-3xl font-black">User List</h1>

      <div class="relative overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                    class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <th
                      scope="row"
                      class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td class="px-6 py-4">{user.userId}</td>
                    <td class="px-6 py-4">{user.fullName}</td>
                    <td class="px-6 py-4">{user.username}</td>
                    <td class="px-6 py-4">{user.status}</td>
                    <td class="px-6 py-4">{user.roles}</td>
                    <td class="px-6 py-4">
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
