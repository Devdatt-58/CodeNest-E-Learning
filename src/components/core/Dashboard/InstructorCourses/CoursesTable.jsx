import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  // console.log("All Course ", courses)

  return (
    <>
      <Table className="overflow-hidden rounded-xl border border-line">
        <Thead>
          <Tr className="flex gap-x-6 border-b border-line bg-richblack-850 px-5 py-3">
            <Th className="flex-1 text-left text-xs font-semibold text-richblack-200">
              Course
            </Th>
            <Th className="w-[110px] text-left text-xs font-semibold text-richblack-200">
              Duration
            </Th>
            <Th className="w-[90px] text-left text-xs font-semibold text-richblack-200">
              Price
            </Th>
            <Th className="w-[90px] text-left text-xs font-semibold text-richblack-200">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="bg-richblack-800">
                <div className="cn-empty border-0 bg-transparent">
                  <p className="text-base font-semibold text-richblack-5">
                    No courses yet
                  </p>
                  <p className="max-w-[44ch] text-sm text-richblack-100">
                    Your published and drafted courses will be listed here.
                  </p>
                </div>
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-6 border-b border-line bg-richblack-800 px-5 py-5 last:border-b-0"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    loading="lazy"
                    className="h-[104px] w-[168px] shrink-0 rounded-lg border border-line object-cover"
                  />
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <p className="text-[0.975rem] font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs leading-5 text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-xs text-richblack-400">
                      Created {formatDate(course.createdAt)}
                    </p>

                    {/* Status pill: draft is a warning, published is a success —
                        the two now read differently at a glance. */}
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <span className="mt-1 flex w-fit items-center gap-1.5 rounded-full border border-brown-200/40 bg-brown-200/10 px-2.5 py-1 text-[11px] font-medium text-brown-50">
                        <HiClock size={12} aria-hidden="true" />
                        Draft
                      </span>
                    ) : (
                      <span className="mt-1 flex w-fit items-center gap-1.5 rounded-full border border-caribbeangreen-200/40 bg-caribbeangreen-200/10 px-2.5 py-1 text-[11px] font-medium text-caribbeangreen-50">
                        <FaCheck size={9} aria-hidden="true" />
                        Published
                      </span>
                    )}
                  </div>
                </Td>
                <Td className="w-[110px] text-sm text-richblack-100">
                  2hr 30min
                </Td>
                <Td className="w-[90px] text-sm font-medium text-richblack-5">
                  ₹{course.price}
                </Td>
                <Td className="w-[90px]">
                  <div className="flex items-center gap-1">
                    <button
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }}
                      title="Edit course"
                      aria-label={`Edit ${course.courseName}`}
                      className="grid h-8 w-8 place-items-center rounded-lg text-richblack-200 transition-colors duration-150 hover:bg-richblack-750 hover:text-richblack-5"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Delete this course?",
                          text2:
                            "Sections, lessons and student progress for this course will be removed. This can't be undone.",
                          btn1Text: !loading ? "Delete" : "Deleting…",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }}
                      title="Delete course"
                      aria-label={`Delete ${course.courseName}`}
                      className="grid h-8 w-8 place-items-center rounded-lg text-richblack-200 transition-colors duration-150 hover:bg-pink-200/10 hover:text-pink-100"
                    >
                      <RiDeleteBin6Line size={16} />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}