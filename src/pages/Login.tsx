import React, { useState } from "react"
import logo from "../assets/RedBook.svg"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import clsx from "clsx"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../app/store"
import { signupUser, loginUser as loginUserThunk } from "../app/thunks/auth"
import { LOGIN_USER_PAYLOAD, SIGNUP_USER_PAYLOAD } from "../utils/types"

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const [isLogin, setIsLogin] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors: inputErr },
  } = useForm()

  const registerUser: SubmitHandler<FieldValues> = (data) => {
    dispatch(signupUser(data as SIGNUP_USER_PAYLOAD))
  }

  const loginUser: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUserThunk(data as LOGIN_USER_PAYLOAD))
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {isLogin ? (
        <div className="w-[276px] flex flex-col gap-y-4 justify-between">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="RedBook" className="w-48" />
          </div>
          <h1 className="text-xl font-semibold text-center">Login</h1>
          <form
            onSubmit={handleSubmit(loginUser)}
            className="w-full flex flex-col justify-between"
          >
            <label
              className={clsx(
                "input input-bordered flex items-center gap-2",
                !inputErr.userAddress && "mb-4"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                {...register("userAddress", {
                  required: "Username or Password is required",
                  pattern: {
                    value:
                      /^(?=.{2,})([a-zA-Z0-9._]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/i,
                    message: "Invalid username or email",
                  },
                })}
                type="text"
                className="grow"
                placeholder="Username / Email"
              />
            </label>
            {inputErr.email && (
              <span className="text-red-500 mb-4 mt-1">
                {inputErr.email?.message as string}
              </span>
            )}
            <label
              className={clsx(
                "input input-bordered flex items-center gap-2",
                !inputErr.password && "mb-4"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                className="grow"
                placeholder="Password"
              />
            </label>
            <button type="submit" className="btn btn-success text-lg">
              Login
            </button>
          </form>
          <div>
            Don't have an account?
            <br />
            <button
              onClick={() => setIsLogin(false)}
              className="link link-info inline-block"
            >
              Sign up here
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[276px] flex flex-col gap-y-4 justify-between">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="RedBook" className="w-48" />
          </div>

          <h1 className="text-xl font-semibold text-center">Sign up</h1>
          <form
            onSubmit={handleSubmit(registerUser)}
            className="w-full flex flex-col justify-between"
          >
            <label
              className={clsx(
                "input input-bordered flex items-center gap-2",
                !inputErr.name && "mb-4"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name must be at most 50 characters",
                  },
                })}
                type="text"
                className="grow"
                placeholder="Name"
              />
            </label>
            {inputErr.name && (
              <span className="text-red-500 mb-4 mt-1">
                {inputErr.name?.message as string}
              </span>
            )}
            <label
              className={clsx(
                "input input-bordered flex items-center gap-2",
                !inputErr.email && "mb-4"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="text"
                className="grow"
                placeholder="Email"
              />
            </label>
            {inputErr.email && (
              <span className="text-red-500 mb-4 mt-1">
                {inputErr.email?.message as string}
              </span>
            )}
            <label
              className={clsx(
                "input input-bordered flex items-center gap-2",
                !inputErr.username && "mb-4"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 2,
                    message: "Username must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Username must be at most 50 characters",
                  },
                })}
                type="text"
                className="grow"
                placeholder="Username"
              />
            </label>
            {inputErr.username && (
              <span className="text-red-500 mb-4 mt-1">
                {inputErr.username?.message as string}
              </span>
            )}
            <label
              className={clsx(
                "input input-bordered flex items-center gap-2",
                !inputErr.password && "mb-4"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
                    message:
                      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
                  },
                })}
                type="password"
                className="grow"
                placeholder="Password"
              />
            </label>
            {inputErr.password && (
              <span className="text-red-500 mb-4 mt-1">
                {inputErr.password?.message as string}
              </span>
            )}
            <button type="submit" className="btn btn-success text-lg">
              Sign up
            </button>
          </form>
          <div>
            Already have an account?
            <br />
            <button
              onClick={() => setIsLogin(true)}
              className="link link-info inline-block"
            >
              Login here
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default Login
