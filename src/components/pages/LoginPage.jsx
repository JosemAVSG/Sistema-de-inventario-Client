import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { signinUser, signinFailure } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/atoms/Button";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loginError = useSelector((state) => state.auth.errors);

  const [showPassword, setShowPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const googleError = searchParams.get("google_error") === "1";

  const submiting = handleSubmit((data) => {
    dispatch(signinUser(data));
  });

  useEffect(() => {
    if (loginError.length > 0) {
      setTimeout(() => {
        dispatch(signinFailure([]));
      }, 8000);
    }
  }, [loginError]);

  useEffect(() => {
    if (isAuthenticated) navigation("/home");
  }, [isAuthenticated]);

  const errorMessages = googleError
    ? [...loginError, "No se pudo iniciar sesión con Google. Intenta de nuevo."]
    : loginError;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md flex gap-4 flex-col">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg mb-4">
            <FontAwesomeIcon
              icon={faSignInAlt}
              className="text-white text-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">InventarioPro</h1>
          <p className="text-gray-400 mt-2">Inicia sesión en tu cuenta</p>
        </div>

        {/* Login Card */}
        <div className="flex flex-col gap-4 p-10">
          {errorMessages.length > 0 && (
            <div className="mb-6">
              {errorMessages.map((error, i) => (
                <div
                  key={i}
                  className="p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-sm"
                >
                  {error}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={submiting} className="flex flex-col gap-4">
            <div>
              <label className="label">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400"
                  />
                </div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input-field !pl-10"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  El correo es requerido
                </p>
              )}
            </div>

            <div>
              <label className="label">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-5  flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="input-field !pl-10 !pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-5 flex items-center text-gray-400 hover:text-gray-200"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  tabIndex={-1}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  La contraseña es requerida
                </p>
              )}
            </div>

            <Button type="submit" className="w-full py-3">
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Iniciar Sesión
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-secondary-800 px-3 text-gray-500 text-sm">o</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
            }}
            className="w-full py-3 flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.85 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.82-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.67 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                fill="#EA4335"
              />
            </svg>
            Iniciar con Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          © 2024 InventarioPro. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};
