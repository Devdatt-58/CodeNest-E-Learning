import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

  return (
    <>
      <div
        className="cn-card flex flex-col gap-4 p-4 text-richblack-5"
      >
        {/* Course Image */}
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="aspect-video w-full rounded-lg border border-line object-cover"
        />

        <div className="px-4">
          <p className="pb-4 text-3xl font-bold tracking-tight">Rs. {CurrentPrice}</p>
          <div className="flex flex-col gap-4">
            <button
              className="cn-btn-primary cn-btn-lg w-full"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go to course"
                : "Buy now"}
            </button>
            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="cn-btn-secondary cn-btn-lg w-full">
                Add to cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-5 text-center text-xs text-richblack-300">
              30-day money-back guarantee
            </p>
          </div>

          <div className={``}>
            <p className="mb-3 mt-2 text-sm font-semibold text-richblack-5">
              This course includes
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-richblack-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className="flex gap-2" key={i}>
                    <BsFillCaretRightFill className="mt-1 shrink-0 text-caribbeangreen-100" aria-hidden="true" />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-5 text-sm font-medium text-blue-100 hover:underline"
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard