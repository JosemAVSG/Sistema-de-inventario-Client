import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import { verifyTokenAction } from "./redux/actions";
const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  useEffect(() => {
    dispatch(verifyTokenAction());
  }, [isAuthenticated]);
  if (loading) return <h1>Loading....</h1>;

  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
