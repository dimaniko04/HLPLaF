import { Transition } from "@headlessui/react";
import { API_URL } from "../../http";
import { IProduct } from "../../models/IProduct";
import { useState } from "react";

interface Props {
  product: IProduct;
  quantity: number;
  remove: () => void;
}

export const CartItem = ({ product, quantity, remove }: Props) => {
  const [isRemoved, setIsRemoved] = useState(false);

  const onRemove = () => {
    if (quantity == 1) {
      setIsRemoved(true);
    } else {
      remove();
    }
  };

  return (
    <Transition
      show={!isRemoved}
      leave="transform transition ease-in-out duration-100 sm:duration-200"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
      afterLeave={remove}
    >
      <li key={product.id} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={`${API_URL}/${product.img}`}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="ml-4 flex flex-1 flex-col">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{product.name}</h3>
            <p className="ml-4">
              ${(+product.price * quantity).toPrecision(2)}
            </p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">{quantity}</p>

            <div className="flex">
              <button
                type="button"
                onClick={onRemove}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    </Transition>
  );
};
