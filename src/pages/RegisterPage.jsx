import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../redux/actions";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
  const registerError= useSelector((state) => state.auth.errors);
  const dispatch=useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigation("/home");
  }, [isAuthenticated]);

  const submiting = handleSubmit(async (values) => {
    dispatch(signupUser(values));
  });

  return (
        <div className="h-screen flex justify-center items-center ">
            
        <div className="bg-zinc-800 max-w-md  p-10 rounded-md ">

            {registerError.map((error, i) => (
            <div key ={i} className="bg-red-500 text-white">{error}</div>
            ))}

            <form onSubmit={submiting}>
            <input
                type="text"
                {...register("username", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="username"
            ></input>
            {errors.username && (
                <p className="text-red-500">Username is required</p>
                )}
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
            <button type="submit" className='bg-cyan-600 rounded-lg px-4 py-1'>Registrarse</button>
            </form>
        </div>
        </div>
  );
};

export default RegisterPage;
