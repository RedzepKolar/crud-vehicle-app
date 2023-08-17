import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import ReactPaginate from "react-paginate";

const PaginationComponent = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  onLimitChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePerPageChange = (newPage) => {
    onPageChange(newPage);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    onLimitChange(newLimit);
    onPageChange(1);
  };

  return (
    <div className="table-footer-group w-full shadow-md">
      <div className="flex justify-between">
        <div>
          <select
            onChange={handleLimitChange}
            value={itemsPerPage}
            className=" h-9 cursor-pointer shadow-sm dark:bg-gray-700 border hover:bg-gray-100 focus:border focus:outline-none"
          >
            <option value={5}>Show 5</option>
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
          </select>
        </div>

        <div className="">
          <ReactPaginate
            breakLabel={<span className="mr-4">...</span>}
            nextLabel={
              <span className="w-9 h-6 flex items-center justify-center border rounded-md mr-4 hover:bg-gray-100">
                <GrNext size={12} />
              </span>
            }
            forcePage={0}
            onPageChange={(data) => handlePerPageChange(data.selected + 1)}
            pageCount={totalPages}
            previousLabel={
              <span className="w-9 h-6 flex items-center justify-center border border-solid rounded-md mr-4 hover:bg-gray-100">
                <GrPrevious size={12} />
              </span>
            }
            containerClassName="flex items-center justify-center h-9 border border-gray-300 p-2"
            pageClassName="border border-gray-300 hover:bg-gray-100 w-9 h-6 flex items-center justify-center rounded-md mr-4 cursor-pointer"
            activeClassName="items-center justify-center text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            pageLinkClassName="w-full h-full flex items-center justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
