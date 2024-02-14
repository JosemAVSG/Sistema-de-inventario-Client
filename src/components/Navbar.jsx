import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions";
import imguser from "../img/user.svg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };
  const [isOpen, setIsOpen] = useState(false);
 
  
  return (
    <div className="bg-zinc-700  flex justify-between py-5 mt-0 px-10 rounded-sm">
      

        <h1 className="text-2xl ml-16 text-white font-bold">
         
          Sistema de Inventario
        </h1>
 
      
      <div className="flex  gap-x-6">
        {isAuthenticated ? (
          <>
            <div className="dropdown relative md:static ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="menu-btn focus:outline-none focus:shadow-outline flex flex-wrap items-center"
              >
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <img className="w-full h-full object-cover" src={imguser} />
                </div>
                <div className="ml-2 capitalize flex ">
                  <h1 className="text-xl text-white font-semibold m-0 p-0 leading-none">
                    {user.username}
                  </h1>
                </div>
                <FontAwesomeIcon
                  icon={isOpen ? faChevronUp : faChevronDown}
                  className="ml-2 text-xs leading-none"
                />
              </button>
              <div
                className={`absolute right-0 mt-2 w-48 bg-white text-neutral-900 rounded-lg py-2 shadow-xl ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <NavLink
                  exact="true"
                  to="/task/new"
                  className="px-4 py-2 block bg-white hover:bg-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out"
                >
                  Tarea Nueva
                </NavLink>
                <hr></hr>
                <NavLink
                  exact="true"
                  to="/login"
                  className="px-4 py-2 block bg-white hover:bg-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out"
                  onClick={() => logout()}
                >
                  Logout
                </NavLink>
              </div>
            </div>
            
          </>
        ) : (
          <>
          
            <Link
              exact="true"
              to="/login"
              className="bg-indigo-700 rounded-lg px-4 py-1"
            >
              Login
            </Link>
            <Link
              exact="true"
              to="/register"
              className="bg-indigo-700 rounded-lg px-4 py-1"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
