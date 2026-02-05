import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "@/redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const registerError = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigation("/home");
  }, [isAuthenticated]);

  const submiting = handleSubmit(async (values) => {
    dispatch(signupUser(values));
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg mb-4">
            <FontAwesomeIcon icon={faUserPlus} className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-white">InventarioPro</h1>
          <p className="text-gray-400 mt-2">Crea tu cuenta</p>
        </div>

        {/* Register Card */}
        <div className="card p-8">
          {registerError.length > 0 && (
            <div className="mb-6 space-y-2">
              {registerError.map((error, i) => (
                <div
                  key={i}
                  className="p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-sm"
                >
                  {error}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={submiting} className="space-y-5">
            <div>
              <label className="label">Nombre de Usuario</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register("username", { required: true })}
                  className="input-field pl-10"
                  placeholder="johndoe"
                ></input>
              </div>
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">El nombre de usuario es requerido</p>
              )}
            </div>

            <div>
              <label className="label">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input-field pl-10"
                  placeholder="correo@ejemplo.com"
                ></input>
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">El correo es requerido</p>
              )}
            </div>

            <div>
              <label className="label">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="input-field pl-10"
                  placeholder="••••••••"
                ></input>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">La contraseña es requerida</p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Crear Cuenta
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                Inicia sesión aquí
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

export default RegisterPage;
