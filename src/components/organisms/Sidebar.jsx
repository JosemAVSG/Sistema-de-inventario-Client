import { Link, NavLink } from "react-router-dom";
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
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Sidebar.scss";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const cierreDiarioRealizado = useSelector(
    (state) => state.transacciones.cierreDiarioRealizado
  );
  console.log(cierreDiarioRealizado);
  return (
    <div className={` flex 2xl:h-screen xl:h-screen overflow-hidden ${isOpen ? "ml-0" : "-ml-55"}`}>
      <button
        className={`boton top-1 z-50 p-2 ml-5 ${
          isOpen ? " text-white" : " rounded-lg text-white"
        }`}
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <FontAwesomeIcon
            icon={faX}
            className="-ml-2  text-xl leading-none rounded-lg py-3 shadow-sm"
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className=" -ml-2 text-xl leading-none rounded-lg py-3 shadow-sm"
          />
        )}
      </button>

      <div
        className={`bg-zinc-900  side p-8 transition-all duration-500 ${
          isOpen ? "ml-0" : "-ml-72"
        }`}
      >
        <ul className={`py-2 mr-10 ${isOpen? "":"mr-24"}`}>
          <div>
            <li className="flex  items-center">
              <FontAwesomeIcon
                icon={faDashboard}
                className=" text-lg leading-none rounded-lg py-2 mr-3 shadow-sm"
              />
              <NavLink
                to="/home"
                activeClassname="active"
                className="font-bold text-lg"
              >
                Dashboard
              </NavLink>
            </li>
          </div>
          <div>
            <li className=" flex  items-center">
              <FontAwesomeIcon
                icon={faCubes}
                className=" text-lg leading-none rounded-lg py-2 mr-3 shadow-sm"
              />
              <NavLink to="/categoria" className="font-bold text-lg">
                Categorias
              </NavLink>
            </li>
            <NavLink
              exact="true"
              to="/categoria/new"
              className="bg-indigo-700 block rounded-lg text-center mt-5 py-1 w-48"
            >
              Tarea Nueva
            </NavLink>
          </div>
          <div>
            <li className=" flex items-center">
              <FontAwesomeIcon
                icon={faUserTie}
                className=" text-lg leading-none rounded-lg py-2 mr-3 shadow-sm"
              />
              <NavLink to="/proveedor" className="font-bold text-lg">
                Proveedores
              </NavLink>
            </li>{" "}
            <NavLink
              exact="true"
              to="/proveedor/new"
              className="bg-indigo-700 block rounded-lg text-center mt-5 py-1 w-48"
            >
              Nuevo Proveedor
            </NavLink>
          </div>
          <div>
            <li className="flex items-center">
              <FontAwesomeIcon
                icon={faTags}
                className=" text-lg leading-none rounded-lg py-2 mr-3 shadow-sm"
              />
              <NavLink to="/products" className="font-bold text-lg">
                Productos
              </NavLink>
            </li>
            <NavLink
              exact="true"
              to="/products/new"
              className="bg-indigo-700 block rounded-lg text-center mt-5 py-1 w-48"
            >
              Nuevo Producto
            </NavLink>
          </div>
          <div>
            <li className="flex items-center">
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className=" text-lg leading-none rounded-lg py-2 mr-3 shadow-sm"
              />
              <NavLink to="/ventas" className="font-bold text-lg">
                Ventas
              </NavLink>
            </li>
            {cierreDiarioRealizado ? (
              <NavLink
                to="/ventas/new"
                onClick={(e) =>
                  cierreDiarioRealizado ? e.preventDefault() : null
                }
                className={`bg-indigo-700 block rounded-lg text-center mt-5 py-1 w-48 ${
                  cierreDiarioRealizado ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                nuevo
              </NavLink>
            ) : (
              <NavLink
                to="/ventas/new"
                className="bg-indigo-700 block rounded-lg text-center mt-5 py-1 w-48"
              >
                nuevo
              </NavLink>
            )}
          </div>
          <div>
            <li className=" flex items-center">
              <FontAwesomeIcon
                icon={faHandshake}
                className=" text-lg leading-none rounded-lg py-2 mr-3 shadow-sm"
              />
              <NavLink to="/compras" className="font-bold text-lg">
                Compras
              </NavLink>
            </li>
            {cierreDiarioRealizado ? (
              <NavLink
                to="/compras/new"
                onClick={(e) =>
                  cierreDiarioRealizado ? e.preventDefault() : null
                }
                className={`bg-indigo-700 block rounded-lg text-center mt-5 py-1 w-48 ${
                  cierreDiarioRealizado ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                nuevo
              </NavLink>
            ) : (
              <NavLink
                exact="true"
                to="/compras/new"
                className="bg-indigo-700 block rounded-lg text-center mt-5 py-1 w-48"
              >
                nuevo
              </NavLink>
            )}
          </div>
        </ul>
      </div>
      <div
        className={`flex flex-col absolute justify-evenly pl-4 sm:top-20 sm:mt-6 md:top-10 w-10 min-h-screen text-white ${
          isOpen ? "hidden" : ""
        }`}
      >
        <Link to="/home">
          <FontAwesomeIcon
            icon={faDashboard}
            className="text-xl hover:text-red-400 activeicon mb-2"
          />
        </Link>

        <Link to={"/categoria"}>
          <FontAwesomeIcon
            icon={faCubes}
            className="text-xl    hover:text-red-400 mb-2"
          />
        </Link>
        <Link to={"/proveedor"}>
          <FontAwesomeIcon
            icon={faUserTie}
            className="text-xl mb-2  hover:text-red-400"
          />
        </Link>
        <Link to={"/products"}>
          <FontAwesomeIcon
            icon={faTags}
            className="text-xl mb-2  hover:text-red-400"
          />
        </Link>
        <Link to={"/ventas"}>
          <FontAwesomeIcon
            icon={faMoneyBill1Wave}
            className="text-xl  hover:text-red-400 mb-2"
          />
        </Link>
        <Link to={"/compras"}>
          <FontAwesomeIcon
            icon={faHandshake}
            className="text-xl  hover:text-red-400 mb-2"
          />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
