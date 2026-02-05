import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCubes,
  faDashboard,
  faHandshake,
  faMoneyBill1Wave,
  faTags,
  faUserTie,
  faX,
  faBox,
  faArrowTrendUp,
  faUsers,
  faClipboardList,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const cierreDiarioRealizado = useSelector(
    (state) => state.transacciones.cierreDiarioRealizado,
  );

  const menuItems = [
    { path: "/home", label: "Dashboard", icon: faDashboard },

    {
      path: "/products",
      label: "Productos",
      icon: faBox,
      children: [
        { path: "/products", label: "Lista de Productos", icon: faTags },
        { path: "/add-products", label: "Nuevo Producto", icon: faCubes },
      ],
    },
    {
      path: "/categoria",
      label: "Categorías",
      icon: faClipboardList,
      children: [
        { path: "/categoria", label: "Lista de Categorías", icon: faTags },
        { path: "/add-categoria", label: "Nueva Categoría", icon: faCubes },
      ],
    },
    {
      path: "/proveedor",
      label: "Proveedores",
      icon: faUsers,
      children: [
        { path: "/proveedor", label: "Lista de Proveedores", icon: faUserTie },
        { path: "/add-proveedor", label: "Nuevo Proveedor", icon: faHandshake },
      ],
    },
    {
      path: "/ventas",
      label: "Ventas",
      icon: faMoneyBill1Wave,
      children: [
        { path: "/ventas", label: "Historial de Ventas", icon: faArrowTrendUp },
        { path: "/add-ventas", label: "Nueva Venta", icon: faMoneyBill1Wave },
      ],
    },
    {
      path: "/compras",
      label: "Compras",
      icon: faHandshake,
      children: [
        {
          path: "/compras",
          label: "Historial de Compras",
          icon: faArrowTrendUp,
        },
        { path: "/add-compras", label: "Nueva Compra", icon: faHandshake },
      ],
    },
  ];

  const item =
    "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200";
  const subItem =
    "flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all duration-200";
  const quickItem =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200";

  return (
    <>
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed top-20 left-4 z-50 p-3 bg-secondary-800 rounded-lg text-white shadow-lg"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}

      <aside
        className={clsx(
          "fixed lg:static top-16 left-0 h-screen bg-secondary-800 border-r border-secondary-700 z-40 transition-all duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "w-20" : "w-64",
        )}
      >
        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-6 w-8 h-8 bg-primary-600 rounded-full items-center justify-center text-white shadow-lg"
        >
          <FontAwesomeIcon icon={collapsed ? faBars : faX} />
        </button>

        {/* Collapsed logo */}
        {collapsed && (
          <div className="py-6 flex justify-center border-b border-secondary-700">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faDashboard} />
            </div>
          </div>
        )}

        <nav className="py-6 px-3 space-y-6 overflow-y-auto h-full">
          {!collapsed && (
            <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Menú principal
            </p>
          )}

          {menuItems.map((itemData, index) => (
            <div key={index} className="space-y-2">
              {index !== 0 && (
                <div className="my-3 border-t border-secondary-700/60" />
              )}

              <NavLink
                to={itemData.path}
                end={!itemData.children}
                className={({ isActive }) =>
                  clsx(
                    item,
                    collapsed && "justify-center",
                    isActive && !itemData.children
                      ? "bg-primary-600/20 text-primary-400 border-l-2 border-primary-500"
                      : "text-gray-400 hover:bg-secondary-700 hover:text-white hover:translate-x-1",
                  )
                }
              >
                <FontAwesomeIcon icon={itemData.icon} className="w-6 h-6" />
                {!collapsed && (
                  <>
                    <span className="font-medium">{itemData.label}</span>
                    {itemData.children && (
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="ml-auto text-xs opacity-60"
                      />
                    )}
                  </>
                )}
              </NavLink>

              {!collapsed && itemData.children && (
                <div className="ml-6 mt-2 space-y-1">
                  {itemData.children.map((child, i) => (
                    <NavLink
                      key={i}
                      to={child.path}
                      className={({ isActive }) =>
                        clsx(
                          subItem,
                          isActive
                            ? "bg-primary-600/10 text-primary-400"
                            : "text-gray-500 hover:bg-secondary-700/50 hover:text-white",
                        )
                      }
                    >
                      <FontAwesomeIcon icon={child.icon} className="w-5 h-5" />
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}

          {!collapsed && (
            <div className="mt-10 pt-6 border-t border-secondary-600/60 space-y-3">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Acciones rápidas
              </p>

              <NavLink
                to="/add-products"
                className={({ isActive }) =>
                  clsx(
                    quickItem,
                    isActive
                      ? "bg-primary-600/20 text-primary-400"
                      : "text-gray-400 hover:bg-secondary-700 hover:text-white",
                  )
                }
              >
                <FontAwesomeIcon icon={faBox} />
                <span>Nuevo Producto</span>
              </NavLink>

              <NavLink
                to="/add-ventas"
                onClick={(e) => cierreDiarioRealizado && e.preventDefault()}
                className={({ isActive }) =>
                  clsx(
                    quickItem,
                    cierreDiarioRealizado && "opacity-50 cursor-not-allowed",
                    isActive
                      ? "bg-primary-600/20 text-primary-400"
                      : "text-gray-400 hover:bg-secondary-700 hover:text-white",
                  )
                }
              >
                <FontAwesomeIcon icon={faMoneyBill1Wave} />
                <span>Nueva Venta</span>
              </NavLink>
            </div>
          )}
        </nav>
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
