import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { VscAdd } from "react-icons/vsc"

import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../../services/operations/profileAPI"
import InstructorChart from "./InstructorChart"

/** Statistic tile. Same shape for every metric so the row scans in one pass. */
const Stat = ({ label, value, hint }) => (
  <div className="cn-card p-5">
    <p className="text-xs text-richblack-300">{label}</p>
    <p className="mt-2 text-2xl font-bold tracking-tight text-richblack-5">
      {value}
    </p>
    {hint && <p className="mt-1 text-xs text-richblack-400">{hint}</p>}
  </div>
)

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-richblack-5">
            Hi {user?.firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-richblack-300">
            Here's how your courses are doing.
          </p>
        </div>
        <Link to="/dashboard/add-course" className="cn-btn-primary">
          <VscAdd aria-hidden="true" />
          New course
        </Link>
      </header>

      {loading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-28" />
          ))}
        </div>
      ) : courses.length > 0 ? (
        <>
          {/* Statistics */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Total courses" value={courses.length} />
            <Stat label="Total students" value={totalStudents ?? 0} />
            <Stat
              label="Total income"
              value={`Rs. ${totalAmount ?? 0}`}
              hint="Across all published courses"
            />
          </div>

          {/* Chart */}
          <div className="mt-6">
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="cn-empty">
                <p className="text-base font-semibold text-richblack-5">
                  Nothing to chart yet
                </p>
                <p className="max-w-[44ch] text-sm text-richblack-100">
                  Once students enrol, their numbers will appear here.
                </p>
              </div>
            )}
          </div>

          {/* Recent courses */}
          <section className="cn-card mt-6 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-base font-semibold text-richblack-5">
                Your courses
              </h2>
              <Link
                to="/dashboard/my-courses"
                className="text-sm font-medium text-blue-100 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <article key={course._id}>
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="aspect-video w-full rounded-lg border border-line object-cover"
                    loading="lazy"
                  />
                  <h3 className="mt-3 truncate text-sm font-semibold text-richblack-5">
                    {course.courseName}
                  </h3>
                  <p className="mt-1 text-xs text-richblack-300">
                    {course.studentsEnroled.length} students · Rs. {course.price}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="cn-empty mt-10">
          <p className="text-lg font-semibold text-richblack-5">
            No courses yet
          </p>
          <p className="max-w-[48ch] text-sm text-richblack-100">
            Publish your first course to start reaching learners. The course
            builder walks you through sections, lessons and pricing.
          </p>
          <Link to="/dashboard/add-course" className="cn-btn-primary mt-2">
            Create a course
          </Link>
        </div>
      )}
    </div>
  )
}
