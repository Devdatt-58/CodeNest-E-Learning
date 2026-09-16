import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token)

      setEnrolledCourses(res)
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  }
  useEffect(() => {
    getEnrolledCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openCourse = (course) => {
    navigate(
      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
    )
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-richblack-5">Enrolled courses</h1>
        <p className="mt-1 text-sm text-richblack-300">
          Everything you're working through, with where you left off.
        </p>
      </header>

      {!enrolledCourses ? (
        /* Skeleton rows keep the layout stable while the list loads. */
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="cn-card flex items-center gap-4 p-4">
              <div className="skeleton h-14 w-14 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-1/3" />
                <div className="skeleton h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : !enrolledCourses.length ? (
        <div className="cn-empty">
          <p className="text-base font-semibold text-richblack-5">
            No courses yet
          </p>
          <p className="max-w-[44ch] text-sm text-richblack-100">
            Pick a track and your first lesson will show up right here.
          </p>
          <Link to="/" className="cn-btn-primary mt-2">
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-line">
          {/* Column headings — desktop only; each row is self-describing on
              mobile so the table never has to scroll sideways. */}
          <div className="hidden bg-richblack-850 px-5 py-3 text-xs font-semibold text-richblack-200 md:flex">
            <p className="w-[46%]">Course</p>
            <p className="w-[22%]">Duration</p>
            <p className="flex-1">Progress</p>
          </div>

          <ul className="divide-y divide-line">
            {enrolledCourses.map((course, i) => {
              const progress = course.progressPercentage || 0
              return (
                <li key={i} className="bg-richblack-800">
                  <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:px-5">
                    <button
                      type="button"
                      onClick={() => openCourse(course)}
                      className="flex flex-1 items-center gap-4 text-left md:w-[46%] md:flex-none"
                    >
                      <img
                        src={course.thumbnail}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-lg border border-line object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-richblack-5">
                          {course.courseName}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-richblack-300">
                          {course.courseDescription?.length > 70
                            ? `${course.courseDescription.slice(0, 70)}…`
                            : course.courseDescription}
                        </p>
                      </div>
                    </button>

                    <p className="text-xs text-richblack-200 md:w-[22%]">
                      <span className="text-richblack-400 md:hidden">
                        Duration:{" "}
                      </span>
                      {course?.totalDuration}
                    </p>

                    <div className="md:flex-1">
                      <div className="mb-1.5 flex items-center justify-between text-xs text-richblack-200">
                        <span>Progress</span>
                        <span className="font-mono">{progress}%</span>
                      </div>
                      <ProgressBar
                        completed={progress}
                        height="6px"
                        isLabelVisible={false}
                        bgColor="#6366F1"
                        baseBgColor="#1E293B"
                        borderRadius="999px"
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
