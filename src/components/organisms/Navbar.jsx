import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/redux/actions";
import imguser from "@/img/user.svg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faSignOutAlt,
  faUser,
  faChartLine,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

import { cerrarDia } from "@/redux/actionTransaccion";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const ventas = useSelector((state) => state.transacciones.ventas);
  const compras = useSelector((state) => state.transacciones.compras);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleCerrarDia = () => {
    const fechaActual = new Date().toISOString();
    const ventasDelDia = ventas.filter((venta) =>
      venta.createdAt.includes(fechaActual),
    );
    const comprasDelDia = compras.filter((compra) =>
      compra.createdAt.includes(fechaActual),
    );
    dispatch(cerrarDia(fechaActual, ventasDelDia, comprasDelDia));
  };

  return (
    <nav className="bg-secondary-800/95 backdrop-blur-sm border-b border-secondary-700 sticky top-0 z-50">
      <div className="!px-4 !sm:px-6 !lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-lg">
              <FontAwesomeIcon
                icon={faChartLine}
                className="text-white text-lg"
              />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              Inventario<span className="text-primary-400">Pro</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated && (
              <>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-primary-400"
                        : "text-gray-400 hover:text-white"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-primary-400"
                        : "text-gray-400 hover:text-white"
                    }`
                  }
                >
                  Productos
                </NavLink>
                <NavLink
                  to="/ventas"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-primary-400"
                        : "text-gray-400 hover:text-white"
                    }`
                  }
                >
                  Ventas
                </NavLink>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200">
                  <FontAwesomeIcon icon={faBell} className="text-lg" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-secondary-700 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 overflow-hidden rounded-full bg-secondary-700 flex items-center justify-center">
                      <img
                        className="w-full h-full object-cover"
                        src={imguser}
                        alt="Usuario"
                      />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-white leading-none">
                        {user?.username || "Usuario"}
                      </p>
                      <p className="text-xs text-gray-400 leading-none mt-0.5">
                        Admin
                      </p>
                    </div>
                    <FontAwesomeIcon
                      icon={isOpen ? faChevronUp : faChevronDown}
                      className="text-xs text-gray-400 hidden sm:block"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute right-0 w-56 bg-secondary-800 border border-secondary-700 rounded-xl shadow-xl py-2 transform transition-all duration-200 ${
                      isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="px-4 py-2 border-b border-secondary-700">
                      <p className="text-sm font-medium text-white">
                        {user?.username}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user?.email || "admin@inventario.com"}
                      </p>
                    </div>

                    <div className="py-1">
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-secondary-700 hover:text-white transition-colors duration-150"
                      >
                        <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                        Perfil
                      </NavLink>
                      <NavLink
                        to="/home"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-secondary-700 hover:text-white transition-colors duration-150"
                      >
                        <FontAwesomeIcon
                          icon={faChartLine}
                          className="w-4 h-4"
                        />
                        Dashboard
                      </NavLink>
                    </div>

                    <div className="border-t border-secondary-700 pt-1">
                      <button
                        onClick={handleCerrarDia}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-amber-400 hover:bg-secondary-700 w-full transition-colors duration-150"
                      >
                        <FontAwesomeIcon
                          icon={faChartLine}
                          className="w-4 h-4"
                        />
                        Cerrar Día
                      </button>
                      <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-secondary-700 w-full transition-colors duration-150"
                      >
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          className="w-4 h-4"
                        />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && isAuthenticated && (
        <div className="md:hidden bg-secondary-800 border-t border-secondary-700">
          <div className="px-4 py-3 space-y-1">
            <NavLink
              to="/home"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-secondary-700 rounded-lg"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/products"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-secondary-700 rounded-lg"
            >
              Productos
            </NavLink>
            <NavLink
              to="/ventas"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-secondary-700 rounded-lg"
            >
              Ventas
            </NavLink>
            <NavLink
              to="/compras"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-secondary-700 rounded-lg"
            >
              Compras
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
