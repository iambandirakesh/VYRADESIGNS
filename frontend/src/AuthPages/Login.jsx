import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../apiCalls/User";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/UserSlice";
const SocialLoginButton = () => (
  <Fragment>
    <button className="bg-blue-600 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
      <FontAwesomeIcon icon={faFacebook} className=" mr-2 text-white" />
      <span className="text-center">Continue with Facebook</span>
    </button>
    <button className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
      <FontAwesomeIcon icon={faGoogle} className=" mr-2 text-white" />
      <span className="text-center">Continue with Google</span>
    </button>
  </Fragment>
);

const SignInForm = () => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.email === "" || userData.password === "") {
      setValidated(true);
      toast.error("Please fill in all fields");
      return;
    }
    const res = await LoginUser(userData);
    if (res.data.status) {
      toast.success(res.data.message);
      dispatch(setUser(res.data.data));
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 font-normal" htmlFor="email">
          Email Address
        </label>
        <input
          type="text"
          className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
          id="email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Enter Email Address"
        />
      </div>
      <div className="mb-4 relative">
        <label className="block mb-2 font-normal" htmlFor="password">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
          id="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Enter Password"
        />
        <div className="absolute right-3 top-[60%]  cursor-pointer">
          {showPassword ? (
            <RxEyeOpen onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <GoEyeClosed onClick={() => setShowPassword(!showPassword)} />
          )}
        </div>
      </div>
      <div className="mb-4">
        <input type="checkbox" className="mr-2" id="remember-me" checked />
        <label className="font-normal" htmlFor="remember-me">
          Remember me
        </label>
      </div>
      <button className="bg-green-600 text-white py-3 px-6 rounded w-full">
        Log In
      </button>
      <button className="hover:text-blue-600 font-medium py-2 px-4 rounded-lg w-full mt-4">
        Forget your password?
      </button>
      <div className="relative">
        <hr className="my-8 border-t border-gray-300" />
        <span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800">
          Or
        </span>
      </div>

      <SocialLoginButton />

      <div className="text-center mt-8">
        <p className="opacity-50">Don't have an account?</p>
        <Link to="/register" className="hover:text-blue-600 font-medium">
          Create account
        </Link>
      </div>
    </form>
  );
};

const Login = () => {
  return (
    <section className="ezy__signin3 light py-8 bg-gray-100 dark:bg-[#0b1727] text-indigo-900 dark:text-white bg-cover bg-center bg-no-repeat">
      <div className="container flex justify-center px-4">
        <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl">
          <div className="p-8 lg:p-10">
            <h2 className="text-3xl leading-none font-bold mb-12">Log In</h2>
            <SignInForm />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AuthLayout(Login);
