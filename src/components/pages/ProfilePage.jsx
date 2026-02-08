import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faEnvelope, 
  faCalendarAlt,
  faEdit,
  faSignOutAlt,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/actions";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/atoms/Button";

export const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Perfil de Usuario</h1>
        <p className="page-subtitle">
          Gestiona tu información personal
        </p>
      </div>

      <div className="max-w-2xl">
        {/* Profile Card */}
        <div className="card p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mb-4 shadow-xl">
              <FontAwesomeIcon icon={faUser} className="text-white text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {user?.username || "Usuario"}
            </h2>
            <p className="text-gray-400">{user?.email || "correo@ejemplo.com"}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-secondary-700/50 rounded-lg">
              <div className="p-3 bg-primary-500/20 rounded-lg">
                <FontAwesomeIcon icon={faUser} className="text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Nombre de Usuario</p>
                <p className="font-medium text-white">
                  {user?.username || "No definido"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-secondary-700/50 rounded-lg">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Correo Electrónico</p>
                <p className="font-medium text-white">
                  {user?.email || "No definido"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-secondary-700/50 rounded-lg">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Fecha de Registro</p>
                <p className="font-medium text-white">
                  {formatDate(user?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t border-secondary-700">
            <Button className="flex-1">
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Editar Perfil
            </Button>
            <Button 
              onClick={handleLogout}
              variant="danger"
              className="flex-1"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="card p-6 mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Acceso Rápido
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/home"
              className="flex items-center gap-3 p-4 bg-secondary-700/50 rounded-lg hover:bg-secondary-700 transition-colors"
            >
              <FontAwesomeIcon icon={faHome} className="text-primary-400" />
              <span className="text-white">Dashboard</span>
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-3 p-4 bg-secondary-700/50 rounded-lg hover:bg-secondary-700 transition-colors"
            >
              <FontAwesomeIcon icon={faUser} className="text-blue-400" />
              <span className="text-white">Productos</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
