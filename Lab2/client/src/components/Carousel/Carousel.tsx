import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren, useState } from "react";

interface Props {
  limit: number;
  className?: string;
}

export const Carousel = (props: PropsWithChildren<Props>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const next = () => setActiveIndex(activeIndex + 1);
  const prev = () => setActiveIndex(activeIndex - 1);

  return (
    <div className="flex flex-row items-center">
      <button
        onClick={prev}
        disabled={activeIndex == 0}
        className="flex items-center px-1 py-5 mr-6 border border-gray-400 rounded-md h-6 disabled:opacity-50 disabled:hover:bg-transparent hover:bg-gray-100"
      >
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="overflow-hidden w-full">
        <div
          style={{ transform: `translate(-${25 * activeIndex}%)` }}
          className="duration-300"
        >
          <div className="mt-6 flex row [&>div]:w-full sm:[&>div]:w-1/2 lg:[&>div]:w-1/4 [&>div]:pr-6 [&>div]:flex-shrink-0">
            {props.children}
          </div>
        </div>
      </div>
      <button
        onClick={next}
        disabled={activeIndex == props.limit - 100 / 25}
        className="flex items-center px-1 py-5 mr-6 border border-gray-400 rounded-md h-6 disabled:opacity-70 hover:bg-gray-100"
      >
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};
