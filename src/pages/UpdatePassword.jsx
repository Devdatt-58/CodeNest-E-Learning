import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { resetPassword } from "../services/operations/authAPI"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData
  const mismatch = confirmPassword.length > 0 && password !== confirmPassword

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="relative grid min-h-[calc(100vh-4rem)] place-items-center px-4">
      <div
        aria-hidden="true"
        className="cn-grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_30%,black,transparent)]"
      />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="cn-card animate-fade-up relative w-full max-w-[460px] p-6 sm:p-8">
          <h1 className="text-[1.6rem] font-bold leading-tight text-richblack-5">
            Choose a new password
          </h1>
          <p className="mt-2 text-sm leading-6 text-richblack-100">
            Almost done. Pick something you haven't used here before.
          </p>

          <form onSubmit={handleOnSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <label htmlFor="new-password" className="cn-label">
                New password <span className="text-pink-100">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="At least 8 characters"
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

            <div>
              <label htmlFor="confirm-new-password" className="cn-label">
                Confirm new password <span className="text-pink-100">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  id="confirm-new-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Re-enter password"
                  aria-invalid={mismatch}
                  className={`cn-input pr-11 ${mismatch ? "cn-input-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-richblack-300 transition-colors duration-150 hover:text-richblack-5"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={19} />
                  ) : (
                    <AiOutlineEye size={19} />
                  )}
                </button>
              </div>
              {mismatch && (
                <p className="cn-error-text" role="alert">
                  Passwords don't match yet.
                </p>
              )}
            </div>

            <button type="submit" className="cn-btn-primary cn-btn-lg mt-3 w-full">
              Reset password
            </button>
          </form>

          <div className="mt-6 border-t border-line pt-5">
            <Link
              to="/login"
              className="flex items-center gap-x-2 text-sm text-richblack-100 transition-colors duration-150 hover:text-richblack-5"
            >
              <BiArrowBack aria-hidden="true" /> Back to log in
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
