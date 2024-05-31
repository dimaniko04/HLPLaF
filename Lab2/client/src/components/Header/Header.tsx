import { lazy } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { LazyLoadImage } from "react-lazy-load-image-component";

import logo from "../../assets/logo.svg";
import { useStoreContext } from "../../store";
import { HeaderNavLink } from "./HeaderNavLink";

const Cart = lazy(() => import("../Cart"));

export const Header = observer(() => {
  const {
    userStore: { logout },
    cartStore: { itemCount, openCartDrawer },
  } = useStoreContext();

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <LazyLoadImage
                    className="h-8 min-w-20 w-auto"
                    src={logo}
                    alt=""
                  />
                </Link>
              </div>

              <div className="ml-8 flex h-full space-x-8">
                <HeaderNavLink to="products" text="Products" />
                <HeaderNavLink to="orders" text="Orders" />
              </div>

              <div className="ml-auto flex items-center">
                <div className="flex flex-1 items-center justify-end space-x-6">
                  <button
                    onClick={() => logout()}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Logout
                  </button>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                </div>

                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    className="group -m-2 flex items-center p-2"
                    onClick={itemCount ? openCartDrawer : undefined}
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {itemCount}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Cart />
      </header>
    </div>
  );
});
