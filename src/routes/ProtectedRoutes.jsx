import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/organisms/Sidebar";
import { Skeleton } from "@/components/atoms/Skeleton";
import { useEffect } from "react";
import { verifyTokenAction } from "@/redux/actions";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    dispatch(verifyTokenAction());
  }, [isAuthenticated]);

  if (loading) return <Skeleton variant="rectangular" className="w-full h-screen" />;

  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-auto p-6 bg-secondary-900">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedRoutes;
