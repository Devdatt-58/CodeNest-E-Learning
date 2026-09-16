import React from "react"
import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className="relative grid min-h-[calc(100vh-4rem)] place-items-center px-4">
      <div
        aria-hidden="true"
        className="cn-grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_40%,black,transparent)]"
      />
      <div className="relative w-full max-w-[520px] text-center">
        <div className="cn-terminal mx-auto text-left">
          <div className="cn-terminal-bar">
            <span className="cn-terminal-dot bg-pink-200/70" />
            <span className="cn-terminal-dot bg-brown-100/70" />
            <span className="cn-terminal-dot bg-caribbeangreen-200/70" />
            <span className="ml-2 font-mono text-[11px] text-richblack-300">
              ~/codenest
            </span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7 text-richblack-200">
            <span className="text-richblack-400">$ </span>codenest open{" "}
            {window.location.pathname}
            {"\n"}
            <span className="text-pink-100">error</span>: 404 — no route matches
            that path
          </pre>
        </div>

        <h1 className="mt-8 text-2xl font-bold text-richblack-5">
          This page doesn't exist
        </h1>
        <p className="mx-auto mt-2 max-w-[44ch] text-sm leading-6 text-richblack-100">
          The link may be out of date, or the course may have been unpublished.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className="cn-btn-primary">
            Back to home
          </Link>
          <Link to="/contact" className="cn-btn-secondary">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error
