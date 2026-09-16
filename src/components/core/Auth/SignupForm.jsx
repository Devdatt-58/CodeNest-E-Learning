import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"

/** Small local field wrapper so every input on this form is spaced alike. */
const Field = ({ id, label, children }) => (
  <div className="w-full">
    <label htmlFor={id} className="cn-label">
      {label} <span className="text-pink-100">*</span>
    </label>
    {children}
  </div>
)

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const mismatch =
    confirmPassword.length > 0 && password !== confirmPassword

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      <p className="mt-7 text-[0.8125rem] font-medium text-richblack-25">
        I'm signing up as
      </p>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Field id="signup-first" label="First name">
            <input
              required
              id="signup-first"
              type="text"
              name="firstName"
              autoComplete="given-name"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Ada"
              className="cn-input"
            />
          </Field>
          <Field id="signup-last" label="Last name">
            <input
              required
              id="signup-last"
              type="text"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Lovelace"
              className="cn-input"
            />
          </Field>
        </div>

        <Field id="signup-email" label="Email address">
          <input
            required
            id="signup-email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleOnChange}
            placeholder="you@example.com"
            className="cn-input"
          />
          <p className="cn-help-text">
            We'll send a 6-digit code here to confirm it's you.
          </p>
        </Field>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Field id="signup-password" label="Create password">
            <div className="relative">
              <input
                required
                id="signup-password"
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
          </Field>

          <Field id="signup-confirm" label="Confirm password">
            <div className="relative">
              <input
                required
                id="signup-confirm"
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
          </Field>
        </div>

        <button type="submit" className="cn-btn-primary cn-btn-lg mt-3 w-full">
          Create account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
