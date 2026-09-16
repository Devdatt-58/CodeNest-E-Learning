import { useEffect, useState } from "react"
import OtpInput from "react-otp-input"
import { BiArrowBack } from "react-icons/bi"
import { RxCountdownTimer } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { sendOtp, signUp } from "../services/operations/authAPI"

function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const { signupData, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleVerifyAndSignup = (e) => {
    e.preventDefault()
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    )
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
            Confirm your email
          </h1>
          <p className="mt-2 text-sm leading-6 text-richblack-100">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-richblack-5">
              {signupData?.email}
            </span>
            . Enter it below to finish creating your account.
          </p>

          <form onSubmit={handleVerifyAndSignup} className="mt-7">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="·"
                  inputMode="numeric"
                  aria-label="Verification code digit"
                  className="!h-12 !w-full rounded-[0.6rem] border border-line bg-richblack-850 text-center text-lg font-semibold text-richblack-5 transition-all duration-150 placeholder:text-richblack-500 focus:border-yellow-50 focus:outline-none focus:ring-[3px] focus:ring-yellow-50/25"
                />
              )}
              containerStyle={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                gap: "8px",
              }}
            />
            <button
              type="submit"
              className="cn-btn-primary cn-btn-lg mt-6 w-full"
            >
              Verify email
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
            <Link
              to="/signup"
              className="flex items-center gap-x-2 text-sm text-richblack-100 transition-colors duration-150 hover:text-richblack-5"
            >
              <BiArrowBack aria-hidden="true" /> Back to sign up
            </Link>
            <button
              type="button"
              className="flex items-center gap-x-2 text-sm text-blue-100 hover:underline"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer aria-hidden="true" />
              Send a new code
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail
