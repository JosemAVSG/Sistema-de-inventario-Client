import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "@/ProtectedRoutes";
import Navbar from "@/components/organisms/Navbar";
import { publicRoutes, protectedRoutes } from "@/routes";
function App() {
  return (
    <Router>
      <Navbar></Navbar>

      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route element={<ProtectedRoutes />}>
          {protectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
