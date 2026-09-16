import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import Logo from "../../common/Logo"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

/**
 * Shared shell for Log in / Sign up.
 *
 * Left: the form, on a card, at a comfortable reading width.
 * Right: a quiet proof panel that keeps the page from feeling like a
 * dead-end. Collapses away on small screens so the form is what you see.
 */
function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div
        aria-hidden="true"
        className="cn-grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
      />

      {loading ? (
        <div className="grid min-h-[calc(100vh-4rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="relative mx-auto grid w-11/12 max-w-maxContent items-center gap-12 py-12 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-20 lg:py-16">
          {/* Form column */}
          <div className="animate-fade-up w-full">
            <div className="cn-card p-6 sm:p-8">
              <Logo className="mb-6 lg:hidden" />
              <h1 className="text-[1.6rem] font-bold leading-tight text-richblack-5">
                {title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-richblack-100">
                {description1}{" "}
                <span className="text-blue-100">{description2}</span>
              </p>

              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>

            <p className="mt-5 text-center text-xs text-richblack-300">
              {formType === "signup" ? (
                <>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-100 hover:underline">
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  New to CodeNest?{" "}
                  <Link to="/signup" className="text-blue-100 hover:underline">
                    Create an account
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* Proof column */}
          <div className="hidden lg:block">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -right-3 -top-3 h-full w-full rounded-xl border border-yellow-50/30"
              />
              <img
                src={image}
                alt="CodeNest learners working through a project"
                className="relative w-full rounded-xl border border-line object-cover"
                loading="lazy"
              />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "260+", label: "Guided projects" },
                { value: "42k", label: "Learners building" },
                { value: "4.8", label: "Average rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold text-richblack-5">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-richblack-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
