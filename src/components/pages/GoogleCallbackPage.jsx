import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyTokenAction } from "@/redux/actions";

export const GoogleCallbackPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errors = useSelector((state) => state.auth.errors);
  const settled = useRef(false);

  useEffect(() => {
    dispatch(verifyTokenAction());
    const timer = setTimeout(() => {
      if (!settled.current) {
        settled.current = true;
        navigate("/login?google_error=1", { replace: true });
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  useEffect(() => {
    if (settled.current) return;
    if (isAuthenticated) {
      settled.current = true;
      navigate("/home", { replace: true });
    } else if (errors && errors.length > 0) {
      settled.current = true;
      navigate("/login?google_error=1", { replace: true });
    }
  }, [isAuthenticated, errors, navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 p-4 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900">
      <div className="w-12 h-12 border-4 border-white/20 border-t-primary-500 rounded-full animate-spin"></div>
      <p className="text-white text-lg">Iniciando sesión con Google...</p>
    </div>
  );
};