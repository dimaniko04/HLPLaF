import { Transition } from "@headlessui/react";
import { API_URL } from "../../http";
import { IProduct } from "../../models/IProduct";
import { useState } from "react";

interface Props {
  item: IProduct;
  remove: () => void;
}

export const CartItem = ({ item, remove }: Props) => {
  const [isRemoved, setIsRemoved] = useState(false);

  const onRemove = () => {
    setIsRemoved(true);
  };

  return (
    <Transition
      show={!isRemoved}
      leave="transform transition ease-in-out duration-100 sm:duration-200"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
      afterLeave={remove}
    >
      <li key={item.id} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={`${API_URL}/${item.img}`}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="ml-4 flex flex-1 flex-col">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">${item.price}</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="mt-auto ml-auto font-medium text-indigo-600 hover:text-indigo-500"
          >
            Remove
          </button>
        </div>
      </li>
    </Transition>
  );
};
