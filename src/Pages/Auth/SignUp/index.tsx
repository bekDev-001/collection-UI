import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import { FaFacebookF } from "react-icons/fa"
import { AiOutlineGoogle } from "react-icons/ai"
import { HiHome } from "react-icons/hi"
import { BsTwitch, BsSnapchat } from "react-icons/bs"
import authService from "../../../services/auth";
import { toast } from 'react-toastify';
import "./style.css"

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username == "" || password == "" || email == "") {
      toast.error('Please fill the form!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else if (username && password && email) {
      authService.userRegistration(username, password, email)
        .then((res) => {
          // console.log(res);
          if (res.status === 200 || res.status === 201) {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userId", res.data.user._id)
            localStorage.setItem("username", res.data.user.username)
            localStorage.setItem("email", res.data.user.email)

            toast.success('Registered successfully!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate("/")
            }, 1000); 
          } else if (res.status === 500) {
            toast.error('This username is already exist', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
          }
        }).catch((err) => {
          if (err.response.status)
            toast.error('This username is already exist', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
        })
    } else {
      toast.error('Something went wrong!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  }

  return (
    <div className="relative min-h-screen bg-purple-100 backdrop-blur flex justify-center items-center bg-texture bg-cover py-28 sm:py-0">
      <div onClick={() => navigate("/")} className="absolute cursor-pointer flex justify-center items-center border border-white text-lg font-medium text-white top-4 right-10 px-3 py-2 rounded transition-all hover:bg-slate-50 hover:text-pink-400">
        <span className="pr-3 text-2xl"><HiHome /></span>
        Home
      </div>
      <div className="p-4 my-8 sm:p-8 flex-1 ">
        <div className="max-w-[420px] min-w-[320px] bg-white rounded-b-3xl mx-auto">
          <div onClick={() => navigate("/")} className="relative h-auto">
            <svg
              className="absolute -top-20 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#fff"
                fillOpacity="1"
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
            <div className="absolute bottom-5 right-2">
              <div className="block transition hover:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 stroke-current text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="px-10 pt-4 pb-8 rounded-3xl shadow-xl">
            <div className="mx-auto text-center">
              <h1 className="text-4xl text-gray-800 font-mono">Register</h1>
              <p className="mt-4">How do you want to sign up ?</p>
            </div>
            <div className="flex items-center justify-around mt-6">
              <div className="w-14 h-14 text-center rounded-full bg-blue-500 text-white saturate-200 transition-all hover:bg-blue-600">
                <a href="#" className="mt-4 flex justify-center">
                  <FaFacebookF className="text-2xl" />
                </a>
              </div>
              <div className="w-14 h-14 text-center rounded-full bg-red-500 text-white saturate-100 transition-all hover:bg-red-600">
                <a href="#" className="flex justify-center items-center mt-4">
                  <AiOutlineGoogle className="text-3xl" />
                </a>
              </div>
              <div className="w-14 h-14 text-center rounded-full bg-indigo-500 text-white saturate-100 transition-all hover:bg-indigo-600">
                <a href="#" className="flex justify-center items-center mt-4">
                  <BsTwitch className="text-2xl" />
                </a>
              </div>
              <div className="w-14 h-14 text-center rounded-full bg-green-500 text-white saturate-100 transition-all hover:bg-green-600">
                <a href="#" className="flex justify-center mt-4">
                  <BsSnapchat className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="flex items-center my-6">
              <hr className="flex-1" />
              <span className="px-4 text-sm text-gray-400">
                Or countinue with
              </span>
              <hr className="flex-1" />
            </div>
            <form action="" method="POST">
              <div className="relative">
                <input
                  required
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="peer w-full outline-none px-0.5 border-0 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-purple-600"
                  placeholder="willPig@tailwind.com"
                />
                <label
                  htmlFor="username"
                  className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-top-1 peer-focus:-top-5 peer-focus:text-purple-600 peer-focus:text-sm"
                >
                  Username
                </label>
              </div>
              <div className="mt-10 relative">
                <input
                  required
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full outline-none px-0.5 border-0 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-purple-600"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-top-1 peer-focus:-top-5 peer-focus:text-purple-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              <div className="mt-10 relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full outline-none px-0.5 border-0 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-purple-600"
                  placeholder="Password"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-top-1 peer-focus:-top-5 peer-focus:text-purple-600 peer-focus:text-sm"
                >
                  Email
                </label>
              </div>
              <div className="mt-10">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200/50"
                  // checked
                  />
                  <span className="ml-2 text-sm">
                    Check here that you have agree to{" "}
                    <a
                      href="#"
                      className="font-semibold text-purple-600 hover:underline"
                    >
                      the terms.
                    </a>
                  </span>
                </label>
              </div>
              <button
                onClick={() => handleSubmit()}
                type="button"
                className="w-full mt-14 py-4 text-lg text-white font-semibold text-center rounded-full bg-purple-500 transition-all hover:bg-purple-600 focus:outline-none"
              >
                Sign up
              </button>
              <p className="text-center text-sm text-gray-400 mt-4">
                Have an account ?{" "}
                <Link
                  to="/auth/signIn"
                  className="font-semibold text-purple-600 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
