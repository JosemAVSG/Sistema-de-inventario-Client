import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-full mb-6">
            <span className="text-6xl font-bold text-primary-400">404</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Página No Encontrada
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
            Es posible que la URL haya sido escrita incorrectamente o que la página haya sido movida.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/home"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faHome} />
            Ir al Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Volver Atrás
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-secondary-800/50 rounded-xl border border-secondary-700">
          <p className="text-gray-400 text-sm">
            ¿Necesitas ayuda?{" "}
            <a href="#" className="text-primary-400 hover:text-primary-300">
              Contacta al soporte técnico
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error404;
