import React, { useEffect, useState } from "react";
import {
  deleteLabAPI,
  getAllLabs,
  getLabsPaginationAPI,
} from "../../api/LabAPI";
import PopupAddNewLab from "../components/PopupAddNewLab";
import PopupUpdateLabs from "../components/PopupUpdateLabs";

const LabManager = () => {
  const [labs, setLab] = useState([]);
  const [openPopupAddNew, setOpenPopupAddNew] = useState(false);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [LabLength, setLabLength] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = { PageNumber: pageNumber, PageSize: 10 }; //gồm số tang và độ dài của sản phẩm
    const response = await getLabsPaginationAPI(data);
    setLab(response);
    const getLabs = await getAllLabs(); //lấy độ dài mãng
    const length = Math.ceil(getLabs.length / 10); //lấy số trang
    setLabLength(length);
  };

  const loadData = async (pageNumber) => {
    const data = { PageNumber: pageNumber, PageSize: 10 };
    const response = await getLabsPaginationAPI(data);
    setLab(response); //lấy đc 12 sản phẩm để hiện
    setPageNumber(pageNumber); //set lại số trang
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
        if (response.success == true) {
          fetchData();
        }
      }
    }
  };

  const renderPagination = () => {
    const pages = Array.from({ length: LabLength }, (_, index) => index + 1);
    return pages.map((page) => (
      <button
        key={page}
        className={`mx-1 rounded px-2 py-1 ${
          pageNumber === page
            ? "bg-cyan-600 text-white"
            : "bg-gray-200 text-cyan-600"
        }`}
        onClick={() => loadData(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="bg-slate-100 pt-5">
      {/* ADD NEW */}
      {openPopupAddNew && (
        <PopupAddNewLab
          handleClosePopupAddNew={handleClosePopupAddNew}
          fetchLab={fetchData}
        />
      )}
      {/* ------ */}
      <div className="flex justify-end pb-5">
        <button
          onClick={() => setOpenPopupAddNew(!openPopupAddNew)}
          className="m-3 rounded-md bg-green-400 p-2 px-3 text-white"
        >
          Add new
        </button>
      </div>

      <div class="relative overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <table className="max-w-screen mx-3 text-left text-base text-black">
          <thead className="border-b-[5px] border-slate-100 bg-white text-sm uppercase text-gray-700">
            <tr>
              <th scope="col" class="px-6 py-3">
                #
              </th>
              <th scope="col" class="px-6 py-3">
                LabName
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="w-20 px-6 py-3">
                labFileUrl
              </th>
              <th scope="col" class="px-6 py-3">
                labVideoUrl
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {labs.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  No Lab found.
                </td>
              </tr>
            ) : (
              labs.map((labs, index) => (
                <tr key={labs.LabId} className="border-b-[2px] bg-white">
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r-[1px] px-6 py-4 text-xl font-medium text-cyan-600"
                  >
                    {(pageNumber - 1) * 10 + index + 1}
                  </th>
                  <td class="border-r-[1px] px-3 py-4">{labs.labName}</td>
                  <td class="border-r-[1px] px-3 py-4">{labs.description}</td>
                  <td class="w-[200px] break-all border-r-[1px] px-3 py-4">
                    <a href={labs.labFileUrl} target="_blank">
                      {labs.labFileUrl}
                    </a>
                  </td>
                  <td class="w-[200px] break-all border-r-[1px] px-3 py-4">
                    <a href={labs.videoURL} target="_blank">
                      {labs.videoURL}
                    </a>
                  </td>
                  <td class="border-r-[1px] px-3 py-4">
                    <div className="flex flex-col gap-y-3">
                      <button
                        onClick={() => handleUpdate(labs.labId)}
                        className="rounded-md bg-green-400 p-2 px-3 text-white"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteLabs(labs.labId)}
                        className="rounded-md bg-red-400 p-2 px-3 text-white"
                      >
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
            fetchLab={fetchData}
          />
        )}
      </div>

      <div className="flex justify-center p-10">{renderPagination()}</div>
    </div>
  );
};

export default LabManager;
