import {
  Transition,
  Dialog,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { observer } from "mobx-react-lite";

import { useStoreContext } from "../../store";
import { Fragment } from "react/jsx-runtime";
import { PropsWithChildren } from "react";

export const CartWrapper = observer((props: PropsWithChildren) => {
  const {
    cartStore: { isDrawerOpen, closeCartDrawer },
  } = useStoreContext();

  return (
    <Transition show={isDrawerOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={closeCartDrawer}>
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  {props.children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});
