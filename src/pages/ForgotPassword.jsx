import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { HiOutlineMailOpen } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
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
          {emailSent && (
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg border border-line bg-richblack-850 text-blue-100">
              <HiOutlineMailOpen size={20} aria-hidden="true" />
            </div>
          )}

          <h1 className="text-[1.6rem] font-bold leading-tight text-richblack-5">
            {!emailSent ? "Reset your password" : "Check your inbox"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-richblack-100">
            {!emailSent ? (
              "Enter the email on your account and we'll send you a link to set a new password."
            ) : (
              <>
                We sent a reset link to{" "}
                <span className="font-medium text-richblack-5">{email}</span>.
                The link expires in a few minutes.
              </>
            )}
          </p>

          <form onSubmit={handleOnSubmit} className="mt-7">
            {!emailSent && (
              <div>
                <label htmlFor="reset-email" className="cn-label">
                  Email address <span className="text-pink-100">*</span>
                </label>
                <input
                  required
                  id="reset-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="cn-input"
                />
              </div>
            )}
            <button
              type="submit"
              className="cn-btn-primary cn-btn-lg mt-6 w-full"
            >
              {!emailSent ? "Send reset link" : "Send it again"}
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

export default ForgotPassword
