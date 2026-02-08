import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/organisms/Navbar";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { protectedRoutes, publicRoutes } from "./routes/routes";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary-900">
        <Navbar />

        <div className="flex pt-16">
          <main className={`flex-1 transition-all duration-300 `}>
            <Routes>
              {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
              <Route element={<ProtectedRoutes />}>
                {protectedRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>
            </Routes>
          </main>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;
