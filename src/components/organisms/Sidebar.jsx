import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDashboard,
  faBox,
  faTags,
  faUsers,
  faHandshake,
  faMoneyBill1Wave,
  faChevronLeft,
  faChevronRight,
  faSignOutAlt,
  faUser,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { logoutUser } from "@/redux/actions";
import { cerrarDia } from "@/redux/actionTransaccion";
import { useVentas, useCompras } from "@/hooks/useTransactions";
import clsx from "clsx";
import imguser from "@/img/user.svg";

const sections = [
  {
    label: "General",
    items: [
      { path: "/home", label: "Dashboard", icon: faDashboard },
    ],
  },
  {
    label: "Inventario",
    items: [
      { path: "/products", label: "Productos", icon: faBox },
      { path: "/categoria", label: "Categorías", icon: faTags },
    ],
  },
  {
    label: "Contactos",
    items: [
      { path: "/proveedor", label: "Proveedores", icon: faUsers },
    ],
  },
  {
    label: "Operaciones",
    items: [
      { path: "/compras", label: "Compras", icon: faHandshake },
      { path: "/ventas", label: "Ventas", icon: faMoneyBill1Wave },
    ],
  },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const { data: ventas = [] } = useVentas();
  const { data: compras = [] } = useCompras();

  const closeMobile = () => setIsMobileOpen(false);

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

  const nav = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className={clsx(
        "flex items-center h-16 border-b border-secondary-700",
        collapsed ? "justify-center px-0" : "px-4",
      )}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faBox} className="text-white text-sm" />
          </div>
          {!collapsed && (
            <span className="font-bold text-white truncate text-base">
              Inventario<span className="text-primary-400">Pro</span>
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-6 last:mb-0">
            {!collapsed && (
              <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/home"}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                      collapsed && "justify-center px-0",
                      isActive
                        ? "bg-primary-600/20 text-primary-400 font-medium"
                        : "text-gray-400 hover:bg-secondary-700 hover:text-white",
                    )
                  }
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Collapse */}
      <button
        onClick={onToggle}
        className={clsx(
          "flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-500 hover:text-white hover:bg-secondary-700/50 transition-colors border-t border-secondary-700",
          collapsed && "justify-center px-0",
        )}
        aria-label={collapsed ? "Expandir" : "Colapsar"}
      >
        <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} className="w-4 h-4" />
        {!collapsed && <span>Colapsar menú</span>}
      </button>

      {/* User menu */}
      <div className="border-t border-secondary-700 relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className={clsx(
            "flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-secondary-700/50 transition-colors",
            collapsed && "justify-center px-0",
          )}
        >
          <div className="w-7 h-7 rounded-full bg-secondary-700 flex items-center justify-center overflow-hidden shrink-0">
            <img src={imguser} alt="Usuario" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <span className="truncate">{user?.username || "Usuario"}</span>
          )}
        </button>

        {userMenuOpen && !collapsed && (
          <div className="absolute bottom-full left-0 right-0 mb-1 mx-2 bg-secondary-800 border border-secondary-700 rounded-xl shadow-xl py-2 overflow-hidden">
            <div className="px-4 py-2 border-b border-secondary-700">
              <p className="text-sm font-medium text-white">{user?.username}</p>
              <p className="text-xs text-gray-400">{user?.email || ""}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => { setUserMenuOpen(false); navigate("/profile"); }}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-secondary-700 transition-colors"
              >
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                Perfil
              </button>
              <button
                onClick={() => { setUserMenuOpen(false); navigate("/home"); }}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-secondary-700 transition-colors"
              >
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4" />
                Dashboard
              </button>
              <button
                onClick={() => { setUserMenuOpen(false); handleCerrarDia(); }}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-amber-400 hover:bg-secondary-700 transition-colors"
              >
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4" />
                Cerrar Día
              </button>
            </div>
            <div className="border-t border-secondary-700 pt-1">
              <button
                onClick={() => { setUserMenuOpen(false); logout(); }}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-secondary-700 transition-colors"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <>
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-secondary-800 rounded-lg text-white shadow-lg border border-secondary-700"
          aria-label="Abrir menú"
        >
          <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
        </button>
      )}

      <aside
        className={clsx(
          "hidden lg:flex flex-col bg-secondary-800 border-r border-secondary-700 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {nav}
      </aside>

      <aside
        className={clsx(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-secondary-800 border-r border-secondary-700 shadow-2xl transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {nav}
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}
    </>
  );
};

export default Sidebar;
