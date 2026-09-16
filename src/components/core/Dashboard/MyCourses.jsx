import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-richblack-5">My courses</h1>
          <p className="mt-1 text-sm text-richblack-300">
            Everything you've published or drafted.
          </p>
        </div>
        <IconBtn
          text="New course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd aria-hidden="true" />
        </IconBtn>
      </header>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}