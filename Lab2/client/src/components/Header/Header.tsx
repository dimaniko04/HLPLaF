import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

import logo from "../../assets/logo.svg";
import { useStoreContext } from "../../store";
import { Cart } from "../Cart";

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
                  <img className="h-8 w-auto" src={logo} alt="" />
                </Link>
              </div>

              <div className="ml-8 flex h-full space-x-8">
                <NavLink
                  to="products"
                  className={({ isActive }) =>
                    "flex border-b-2 " +
                    (isActive
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-700 hover:text-gray-800")
                  }
                >
                  <button
                    type="button"
                    className={
                      "relative z-10 -mb-px pt-px text-sm font-medium transition-colors duration-200 ease-out"
                    }
                  >
                    Products
                  </button>
                </NavLink>

                <NavLink
                  to="orders"
                  className={({ isActive }) =>
                    "flex border-b-2 " +
                    (isActive
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-700 hover:text-gray-800")
                  }
                >
                  <button
                    type="button"
                    className="z-10 -mb-px pt-px text-sm font-medium transition-colors duration-200 ease-out"
                  >
                    Orders
                  </button>
                </NavLink>
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
      </header>
      <Cart />
    </div>
  );
});
