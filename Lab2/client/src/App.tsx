import { Suspense, lazy, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { useStoreContext } from "./store";
import PrivateRoute from "./components/PrivateRoute";

const Login = lazy(() => import("./pages/Login"));
const Registration = lazy(() => import("./pages/Registration"));
const Header = lazy(() => import("./components/Header"));
const Products = lazy(() => import("./pages/Products"));
const Orders = lazy(() => import("./pages/Orders"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Recommendations = lazy(() => import("./pages/Recommendations"));

export const App = observer(() => {
  const {
    userStore: { checkAuth, isAuth },
  } = useStoreContext();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback="loading...">
      <Routes>
        <Route element={<PrivateRoute isAllowed={isAuth} />}>
          <Route
            element={
              <>
                <Header />
                <Outlet />
              </>
            }
          >
            <Route index element={<Recommendations />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Route>
        <Route element={isAuth ? <Navigate to="/" /> : null}>
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>
      </Routes>
    </Suspense>
  );
});
