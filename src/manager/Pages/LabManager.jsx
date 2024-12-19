import React, { useEffect, useState } from "react";
import {
  deleteLabAPI,
  getAllLabs,
  getLabsPaginationAPI,
} from "../../api/LabAPI";
import PopupAddNewLab from "../components/PopupAddNewLab";
import PopupUpdateLabs from "../components/PopupUpdateLabs";
import { FaPlus } from "react-icons/fa6";
import { RiExchange2Line } from "react-icons/ri";
import { IoIosRemoveCircleOutline, IoIosSearch } from "react-icons/io";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const LabManager = () => {
  const [labs, setLab] = useState([]);
  const [openPopupAddNew, setOpenPopupAddNew] = useState(false);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [LabLength, setLabLength] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filterLabs, setFilterLabs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const getLabs = await getAllLabs(); //lấy độ dài mãng
    setLab(getLabs);
    setFilterLabs(getLabs);
    const length = Math.ceil(getLabs.length / 10); //lấy số trang
    setLabLength(length);
  };

  const handleClosePopupAddNew = () => {
    setOpenPopupAddNew(false);
  };
  const handleClosePopupUpdate = () => {
    setOpenPopupUpdate(false);
  };

  const handleUpdate = (currentId) => {
    const labToUpdate = labs.find((lab) => lab.labId === currentId);
    if (labToUpdate) {
      setSelectedLab(labToUpdate); // Lưu thông tin sản phẩm được chọn
      setOpenPopupUpdate(true); // Hiển thị popup
    }
  };

  const deleteLabs = async (currentId) => {
    const labFind = labs.find((lab) => currentId === lab.labId);
    if (labFind) {
      const isConfirmed = confirm("Do you want to delete the labs?");
      if (isConfirmed) {
        const response = await deleteLabAPI(labFind.labId);
        if (response.success === true) {
          const updatedLabs = labs.filter((lab) => lab.labId !== currentId);
          setFilterLabs(updatedLabs);
        }
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchValue && searchValue.length > 0) {
      setCurrentPage(1);
      const data = labs.filter((lab) =>
        lab.labName.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilterLabs(data);
      const length = Math.ceil(data.length / 10);
      setLabLength(length);
    } else {
      setFilterLabs(labs);
      const length = Math.ceil(labs.length / 10);
      setLabLength(length);
    }
  };

  const pagination = () => {
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    return filterLabs.slice(start, end);
  };

  // const renderPagination = () => {
  //   const pages = Array.from({ length: LabLength }, (_, index) => index + 1);
  //   return pages.map((page) => (
  //     <button
  //       key={page}
  //       className={`mx-1 rounded px-2 py-1 ${
  //         pageNumber === page
  //           ? "bg-cyan-600 text-white"
  //           : "bg-gray-200 text-cyan-600"
  //       }`}
  //       onClick={() => {
  //         loadData(page);
  //         setCurrentPage(page);
  //       }}
  //     >
  //       {page}
  //     </button>
  //   ));
  // };

  return (
    <div className="bg-slate-100 pt-5">
      {/* ADD NEW */}
      {openPopupAddNew && (
        <PopupAddNewLab
          handleClosePopupAddNew={handleClosePopupAddNew}
          fetchLab={() => fetchData()}
        />
      )}
      {/* ------ */}

      <div className="flex items-center justify-end pb-5 pr-10">
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
        <div className="flex justify-end">
          <button
            onClick={() => setOpenPopupAddNew(!openPopupAddNew)}
            className="m-3 flex items-center gap-2 rounded-md bg-green-400 p-2 px-3 text-white"
          >
            <FaPlus />
            Add new
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <table className="max-w-screen mx-3 text-left text-base text-black">
          <thead className="border-b-[5px] border-slate-100 bg-white text-sm uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                LabName
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="w-20 px-6 py-3">
                labFileUrl
              </th>
              <th scope="col" className="px-6 py-3">
                labVideoUrl
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {pagination().length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  No Lab found.
                </td>
              </tr>
            ) : (
              pagination().map((labs, index) => (
                <tr key={index} className="border-b-[2px] bg-white">
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r-[1px] px-6 py-4 text-xl font-medium text-cyan-600"
                  >
                    {(currentPage - 1) * 10 + index + 1}
                  </th>
                  <td className="border-r-[1px] px-3 py-4">{labs.labName}</td>
                  <td className="border-r-[1px] px-3 py-4">
                    {labs.description}
                  </td>
                  <td className="w-[200px] break-all border-r-[1px] px-3 py-4">
                    <a href={labs.labFileUrl} target="_blank">
                      {labs.labFileUrl}
                    </a>
                  </td>
                  <td className="w-[200px] break-all border-r-[1px] px-3 py-4">
                    <a href={labs.videoURL} target="_blank">
                      {labs.videoURL}
                    </a>
                  </td>
                  <td className="border-r-[1px] px-3 py-4">
                    <div className="flex flex-col gap-y-3">
                      <button
                        onClick={() => handleUpdate(labs.labId)}
                        className="flex items-center gap-2 rounded-md bg-green-400 p-2 px-3 text-white"
                      >
                        <RiExchange2Line />
                        Update
                      </button>
                      <button
                        onClick={() => deleteLabs(labs.labId)}
                        className="flex items-center gap-2 rounded-md bg-red-400 p-2 px-3 text-white"
                      >
                        <IoIosRemoveCircleOutline />
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {openPopupUpdate && selectedLab && (
          <PopupUpdateLabs
            handleClosePopupUpdate={handleClosePopupUpdate}
            Lab={selectedLab}
            fetchLab={() => fetchData()}
          />
        )}
      </div>

      <div className="p-10">
        <ResponsivePagination
          current={currentPage}
          total={LabLength}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* <div className="flex justify-center p-10">{renderPagination()}</div> */}
    </div>
  );
};

export default LabManager;
