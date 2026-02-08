import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signinUser, signinFailure } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
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
          {loginError.length > 0 && (
            <div className="mb-6">
              {loginError.map((error, i) => (
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
                  type="password"
                  {...register("password", { required: true })}
                  className="input-field !pl-10"
                  placeholder="••••••••"
                ></input>
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
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          © 2024 InventarioPro. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};
