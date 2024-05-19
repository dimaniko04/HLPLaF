import { observer } from "mobx-react-lite";
import { CloseButton, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { CartItem } from "./CartItem";
import { CartWrapper } from "./CartWrapper";
import { useStoreContext } from "../../store";
import { Spinner } from "../Loaders";
import { useEffect } from "react";

export const Cart = observer(() => {
  const {
    orderStore: { checkout },
    uiStore: { isPosting, postError, setPostError },
    cartStore: { totalPrice, items, removeFromCart },
  } = useStoreContext();

  useEffect(() => {
    return () => setPostError(null);
  });

  return (
    <CartWrapper>
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-lg font-medium text-gray-900">
              Shopping cart
            </DialogTitle>
            <div className="ml-3 flex h-7 items-center">
              <CloseButton className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </CloseButton>
            </div>
          </div>
          <div className="mt-8">
            <div className="flow-root">
              <ul
                role="list"
                className="-my-6 divide-y divide-gray-200 overflow-hidden"
              >
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                    remove={() => removeFromCart(item)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>${totalPrice}</p>
          </div>
          {postError && <h1 className="text-red-600">{postError}</h1>}
          <button
            className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            onClick={checkout}
          >
            {isPosting ? <Spinner /> : "Checkout"}
          </button>
        </div>
      </div>
    </CartWrapper>
  );
});
