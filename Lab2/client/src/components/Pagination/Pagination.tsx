import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface Props {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, pageCount, onPageChange }: Props) => {
  return (
    <ReactPaginate
      breakLabel="..."
      forcePage={page - 1}
      pageCount={pageCount}
      pageRangeDisplayed={5}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      nextLabel={<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />}
      previousLabel={<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />}
      previousLinkClassName="px-2 py-2"
      nextLinkClassName="px-2 py-2"
      nextClassName="relative inline-flex items-center rounded-r-md text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      previousClassName="relative inline-flex items-center rounded-l-md text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      containerClassName="my-6 mx-auto w-fit flex rounded-md shadow-sm"
      pageLinkClassName="px-4 py-2"
      pageClassName="relative inline-flex items-center text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
      activeLinkClassName="z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    />
  );
};
