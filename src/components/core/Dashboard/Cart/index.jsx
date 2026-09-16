import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-richblack-5">Your cart</h1>
        <p className="mt-1 text-sm text-richblack-300">
          {totalItems} {totalItems === 1 ? "course" : "courses"} ready to
          enrol in.
        </p>
      </header>

      {total > 0 ? (
        <div className="flex flex-col-reverse items-start gap-6 lg:flex-row lg:gap-8">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="cn-empty">
          <p className="text-base font-semibold text-richblack-5">
            Your cart is empty
          </p>
          <p className="max-w-[44ch] text-sm text-richblack-100">
            Add a course and it will show up here, ready to check out.
          </p>
          <Link to="/" className="cn-btn-primary mt-2">
            Browse courses
          </Link>
        </div>
      )}
    </>
  )
}