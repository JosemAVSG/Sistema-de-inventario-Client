import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signinUser,signinFailure } from "../redux/actions";
import {useDispatch,useSelector} from 'react-redux'
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
  const loginError= useSelector((state) => state.auth.errors);

  const submiting = handleSubmit((data) => {
     dispatch(signinUser(data));
  });

  const handleRegister = () => {
    navigation("/register"); // Navega a la ruta /task al hacer clic en el botón
  };

  useEffect(() => {
      if (loginError > 0){

        setTimeout(() => {
          dispatch(signinFailure(null));
     }, 5000);
      }
  }, [loginError]);
 
 

  useEffect(() => {
    if (isAuthenticated) navigation("/home");
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="bg-zinc-800 max-w-md  p-10 rounded-md ">
        {loginError.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 text-center text-white">
            {error}
          </div>
        ))}

        <h1 className="text-2xl font-bold">Login</h1>

        <form onSubmit={submiting}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="email"
          ></input>
          {errors.email && <p className="text-red-500">email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="password"
          ></input>
          {errors.password && (
            <p className="text-red-500">Username is required</p>
          )}
          <div className="flex justify-between py-5">
            <button type="submit" className='bg-indigo-700 rounded-lg px-4 py-1' >Login</button>
          <button type="button"className='bg-indigo-700 rounded-lg px-4 py-1'  onClick={handleRegister}>
            Register here
          </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
