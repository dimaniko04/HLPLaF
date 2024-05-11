import { useEffect } from "react";
import { Login } from "./pages/Login";
import { useStoreContext } from "./store";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { observer } from "mobx-react-lite";

export const App = observer(() => {
  const {
    userStore: { checkAuth, isAuth },
  } = useStoreContext();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  return (
    <Routes>
      <Route element={<PrivateRoute isAllowed={isAuth} />}>
        <Route index element={<h1>Home</h1>} />
      </Route>
      <Route element={isAuth ? <Navigate to="/" /> : null}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
});
