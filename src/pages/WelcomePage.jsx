import { Link } from "react-router-dom";

const Welcome= () => {
    return (
      <div className="flex justify-center align-middle ">
        <main className="grid min-h-screen place-items-center w-full  justify-center bg-gray px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className=" font-semibold text-indigo-600 text-5xl">Bienvenido</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-withe-200 sm:text-5xl">Registrate o Ingresa</h1>
        <p className="mt-6 text-base leading-7 text-withe-200">Esperamos Tengas una excelente Experiencia</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link to={"/login"} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Login</Link> 
        <Link  to={"/register"} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Registrarse
        </Link>
       
        </div>
      </div>
    </main>
      </div>
      
    );
  };
  
  export default Welcome;
  