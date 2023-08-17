import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import PaginationComponent from "./PaginationComponent";
import LoaderSpinner from "./LoaderSpinner";

const TableComponent = ({
  data,
  isAddNewButtonVisible = false,
  isSearchInputVisible = false,
  isViewButtonVisible,
  onViewButtonClick = () => {},
  onEditButtonClick = () => {},
  onDeleteButtonClick = () => {},
  openModal = () => {},
}) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortColumn, setSortedColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage, setVehiclesPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setTotalItems(data.length);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    const clonedData = [...data];
    const result = clonedData.slice(0, vehiclesPerPage);
    setSortedData(result);
  }, [vehiclesPerPage]);

  useEffect(() => {
    const clonedData = [...data];
    const result = clonedData.slice(
      vehiclesPerPage * currentPage - vehiclesPerPage,
      vehiclesPerPage * currentPage
    );
    setSortedData(result);
  }, [currentPage]);

  const handleLimitChange = (newLimit) => {
    setCurrentPage(1);
    setVehiclesPerPage(newLimit);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredVehiclesSearch = searchText
    ? data.filter(
        (vehicle) =>
          vehicle.name.toLowerCase().includes(searchText.toLowerCase()) ||
          vehicle.abrv.toLowerCase().includes(searchText.toLowerCase())
      )
    : sortedData;

  const handleSort = (column) => {
    const isAsc = sortDirection === "asc";
    const sorted = sortedData.sort((a, b) => {
      if (a[column] < b[column]) return isAsc ? 1 : -1;
      if (a[column] > b[column]) return isAsc ? -1 : 1;

      return 0;
    });

    setSortedData(sorted);
    setSortedColumn(column);
    setSortDirection(isAsc ? "desc" : "asc");
  };

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full max-w-5xl items-center justify-between flex-col border border-gray-200 font-monouppercase lg:flex md:flex sm:flex rounded-sm">
        <div className="flex w-full justify-between items-center">
          <div className="flex">
            {isSearchInputVisible && (
              <input
                type="text"
                placeholder="Search by name or abbreviation..."
                value={searchText}
                onChange={handleSearchTextChange}
                className="focus:border focus:outline-none p-2 w-72 rounded-sm border-b border-r border-b-gray-200 mb-1"
              />
            )}
          </div>
          <div className="flex">
            {isAddNewButtonVisible && (
              <button className="" onClick={openModal}>
                <span className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 flex items-center text-base justify-center text-white transition duration-200 hover:cursor-pointer dark:text-white mb-1 p-2 rounded-md">
                  {" "}
                  <AiOutlinePlus /> Add new
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="table w-full bg-blue-50">
          <div className="table-header-group w-full ">
            <div className="table-row shadow-md text-black uppercase bg-blue-500 text-base">
              <div className="table-cell text-center cursor-default">
                <span className="flex items-center justify-center">
                  <span
                    className="cursor-pointer hover:text-white"
                    onClick={() => handleSort("id")}
                  >
                    ID
                  </span>
                  {sortDirection === "asc" ? (
                    <FaSortDown size={16} />
                  ) : (
                    <FaSortUp size={16} />
                  )}
                </span>
              </div>
              <div className="table-cell text-center">
                <span className="flex items-center justify-center">
                  <span
                    className="cursor-pointer hover:text-white"
                    onClick={() => handleSort("name")}
                  >
                    Model
                  </span>
                  {sortDirection === "asc" ? (
                    <FaSortDown size={16} />
                  ) : (
                    <FaSortUp size={16} />
                  )}
                </span>
              </div>
              <div className="table-cell text-center">
                <span className="flex items-center justify-center">
                  <span
                    className="cursor-pointer hover:text-white"
                    onClick={() => handleSort("abrv")}
                  >
                    Abbreviation
                  </span>
                  {sortDirection === "asc" ? (
                    <FaSortDown size={16} />
                  ) : (
                    <FaSortUp size={16} />
                  )}
                </span>
              </div>
              <div className="table-cell text-center">View</div>
              <div className="table-cell text-center">Edit</div>
              <div className="table-cell text-center">Delete</div>
            </div>
          </div>

          <div className="table-row-group font-medium text-gray-900 whitespace-nowrap dark:text-white shadow-md">
            {Array.isArray(filteredVehiclesSearch) ? (
              filteredVehiclesSearch.map((vehicle) => (
                <div className="table-row" key={vehicle.id}>
                  <div className="table-cell text-center">{vehicle.id}</div>
                  <div className="table-cell text-center py-1">
                    {vehicle.name}
                  </div>
                  <div className="table-cell text-center">{vehicle.abrv}</div>
                  <div className="table-cell text-center">
                    {isViewButtonVisible && (
                      <button
                        className="font-bold rounded inline-flex items-center cursor-pointer"
                        onClick={() => onViewButtonClick(vehicle.name)}
                      >
                        <span className="view-icon">
                          <BsEyeFill />
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="table-cell text-center">
                    <button
                      className="font-bold rounded inline-flex items-center cursor-pointer"
                      onClick={() => onEditButtonClick(vehicle.id)}
                    >
                      <span className="edit-icon">
                        <FaEdit />
                      </span>
                    </button>
                  </div>
                  <div className="table-cell text-center">
                    <button
                      className="font-bold rounded inline-flex items-center"
                      onClick={() => onDeleteButtonClick(vehicle)}
                    >
                      <span className="delete-icon">
                        <MdDelete />
                      </span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="table-cell text-center">
                No data vehicle(s) to show.
              </div>
            )}
          </div>
        </div>
        <PaginationComponent
          totalItems={totalItems}
          itemsPerPage={vehiclesPerPage}
          onPageChange={setCurrentPage}
          onLimitChange={handleLimitChange}
          
        />
      </div>
    </main>
  );
};

export default TableComponent;
