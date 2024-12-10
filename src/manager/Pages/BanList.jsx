import React, { useEffect, useState } from "react";
import { getAllUser, unbanUser } from "../../api/AdminAPI";
import { IoIosSearch } from "react-icons/io";

const BanList = () => {
  const [user, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const fetchedUsers = (await getAllUser()).data.data;
    setUser(fetchedUsers);
    setFilteredUsers(fetchedUsers);
  };

  const handleUnBanUser = async (userId) => {
    await unbanUser(userId);
    fetchAPI();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue && searchValue.length > 0) {
      const data = user.filter((user) => {
        const userName = user.username
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const FullName = user.fullName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        return userName || FullName;
      });
      setFilteredUsers(data);
    } else {
      setFilteredUsers(user);
    }
  };

  return (
    <div className="max-w-screen min-h-screen bg-slate-100 pt-5">
      <div className="flex justify-end pb-5 pr-10">
        <form onSubmit={handleSearch} className="relative inline-block">
          <input
            type="text"
            placeholder="Enter user you want"
            className="h-[2rem] w-[10rem] rounded-lg border-[1px] border-solid border-cyan-100 px-2 py-1 pr-5 text-sm sm:h-[2.5rem] sm:w-[14rem] md:h-[2.5rem] md:w-[16rem] md:text-base lg:h-10 lg:w-[20rem] lg:text-lg"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary absolute right-1 top-1 rounded-md bg-cyan-600 p-1 text-white sm:right-2 sm:top-1 md:right-1 md:top-1 md:p-2 xl:top-[4px] xl:p-2"
          >
            <IoIosSearch />
          </button>
        </form>
        <button
          className="ml-3 h-8 rounded-md bg-green-400 px-2"
          onClick={() => {
            fetchAPI();
            setSearchValue("");
          }}
        >
          Reset All
        </button>
      </div>
      <div class="relative overflow-auto">
        <table className="max-w-screen mx-5 text-left text-sm text-black">
          <thead className="border-b-[4px] border-slate-100 bg-white text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" class="w-20 px-3 py-2">
                #
              </th>
              <th scope="col" class="w-[200px] px-3 py-2">
                FullName
              </th>
              <th scope="col" class="w-[300px] px-3 py-2">
                Username
              </th>

              <th scope="col" class="w-[300px] px-3 py-2">
                roles
              </th>
              <th scope="col" class="w-[200px] px-3 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.filter((user) => user.status === "Banned").length ===
            0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  No users banded
                </td>
              </tr>
            ) : (
              filteredUsers
                .filter((user) => user.status === "Banned")
                .map((user, index) => (
                  <tr key={user.id} className="border-b-[2px] bg-white">
                    <th
                      scope="row"
                      className="whitespace-nowrap border-r-[1px] px-3 py-4 text-base font-semibold text-cyan-600"
                    >
                      {index + 1}
                    </th>
                    <td class="border-r-[1px] px-6 py-4">{user.fullName}</td>
                    <td class="border-r-[1px] px-6 py-4">{user.username}</td>
                    <td class="border-r-[1px] px-6 py-4">
                      {" "}
                      {user.roles == "" ? "Customer" : user.roles}
                    </td>
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
