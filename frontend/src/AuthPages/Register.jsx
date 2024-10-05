import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { RegisterUser } from "../apiCalls/User";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userdata);
    const res = await RegisterUser(userdata);
    console.log(res);
    if (res.data.status) {
      toast.success(res.data.message);
      navigate("/login");
    } else {
      toast.error(res.data.message);
    }
    //   const form = event.currentTarget;
    //   if (form.checkValidity() === false) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //   }

    //   setValidated(true);
    // };
  };
  return (
    <form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 font-normal" htmlFor="email">
          Name
        </label>
        <input
          type="text"
          className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
          id="name"
          onChange={(e) => setUserdata({ ...userdata, name: e.target.value })}
          placeholder="Enter Name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-normal" htmlFor="email">
          Email Address
        </label>
        <input
          type="text"
          className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
          id="email"
          onChange={(e) => setUserdata({ ...userdata, email: e.target.value })}
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
            setUserdata({ ...userdata, password: e.target.value })
          }
          placeholder="Enter Password"
        />
        <div className="absolute right-3 top-[60%] cursor-pointer">
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
      <div className="mb-4 hover:text-blue-500">
        <Link to="/login">
          <div>Already have a account?</div>
        </Link>
      </div>
      <button className="bg-green-600 text-white py-3 px-6 rounded w-full">
        Register
      </button>

      <div className="relative">
        <hr className="my-8 border-t border-gray-300" />
        <span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800">
          Or
        </span>
      </div>

      <SocialLoginButton />
    </form>
  );
};

const Register = () => {
  return (
    <section className="ezy__signin3 light py-8 bg-gray-100 dark:bg-[#0b1727] text-indigo-900 dark:text-white bg-cover bg-center bg-no-repeat">
      <div className="container flex justify-center px-4">
        <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl">
          <div className="p-8 lg:p-10">
            <h2 className="text-3xl leading-none font-bold mb-12">Register</h2>
            <SignInForm />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AuthLayout(Register);
