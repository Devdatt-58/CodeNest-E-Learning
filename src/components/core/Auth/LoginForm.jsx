import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form onSubmit={handleOnSubmit} className="mt-7 flex w-full flex-col gap-y-4">
      <div>
        <label htmlFor="login-email" className="cn-label">
          Email address <span className="text-pink-100">*</span>
        </label>
        <input
          required
          id="login-email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={handleOnChange}
          placeholder="you@example.com"
          className="cn-input"
        />
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="login-password" className="cn-label">
            Password <span className="text-pink-100">*</span>
          </label>
          <Link
            to="/forgot-password"
            className="mb-1.5 text-xs text-blue-100 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            required
            id="login-password"
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter your password"
            className="cn-input pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-richblack-300 transition-colors duration-150 hover:text-richblack-5"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={19} />
            ) : (
              <AiOutlineEye size={19} />
            )}
          </button>
        </div>
      </div>

      <button type="submit" className="cn-btn-primary cn-btn-lg mt-3 w-full">
        Log in
      </button>
    </form>
  )
}

export default LoginForm
