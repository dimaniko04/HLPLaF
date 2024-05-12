import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { useStoreContext } from "./store";
import { Registration } from "./pages/Registration";
import { PrivateRoute } from "./components/PrivateRoute";
import { Header } from "./components/Header";
import { Products } from "./pages/Products";

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
          <Route index element={<Products />} />
        </Route>
      </Route>
      <Route element={isAuth ? <Navigate to="/" /> : null}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Route>
    </Routes>
  );
});
