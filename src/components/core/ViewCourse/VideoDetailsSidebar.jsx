import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { HiOutlineMenuAlt2, HiOutlineX } from "react-icons/hi"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  // Below lg the rail becomes an off-canvas drawer, so the player is not
  // squeezed into whatever is left of a phone screen.
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  // Close the drawer once a lecture has been picked.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const progress = totalNoOfLectures
    ? Math.round((completedLectures?.length / totalNoOfLectures) * 100)
    : 0

  return (
    <>
      {/* Drawer trigger — only exists below lg */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Show course contents"
        className="cn-btn-secondary cn-btn-sm fixed bottom-4 left-4 z-40 shadow-lift lg:hidden"
      >
        <HiOutlineMenuAlt2 aria-hidden="true" />
        Contents
      </button>

      {/* Scrim */}
      {open && (
        <div
          className="animate-fade-in fixed inset-0 z-40 bg-richblack-900/70 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-[330px] flex-col border-r border-line bg-richblack-850 transition-transform duration-300 ease-nest lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100vh-4rem)] lg:w-[320px] lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Course contents"
      >
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-line px-4 py-4">
          <div className="flex w-full items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              title="Back to enrolled courses"
              aria-label="Back to enrolled courses"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-richblack-100 transition-colors duration-150 hover:border-line-strong hover:text-richblack-5"
            >
              <IoIosArrowBack size={18} aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2">
              <IconBtn
                text="Add review"
                customClasses="cn-btn-sm"
                onclick={() => setReviewModal(true)}
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close course contents"
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-richblack-100 lg:hidden"
              >
                <HiOutlineX size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div>
            <p className="text-[0.95rem] font-semibold leading-snug text-richblack-5">
              {courseEntireData?.courseName}
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-richblack-700">
                <div
                  className="h-full rounded-full bg-yellow-50 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-[11px] text-richblack-300">
                {completedLectures?.length}/{totalNoOfLectures}
              </span>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto py-2">
          {courseSectionData.map((course, index) => (
            <div className="text-sm text-richblack-5" key={index}>
              {/* Section */}
              <button
                type="button"
                onClick={() => setActiveStatus(course?._id)}
                aria-expanded={activeStatus === course?._id}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-richblack-800"
              >
                <span className="font-medium">{course?.sectionName}</span>
                <BsChevronDown
                  aria-hidden="true"
                  className={`shrink-0 text-xs text-richblack-300 transition-transform duration-300 ${
                    activeStatus === course?._id ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="border-l border-line pb-1 pl-3 ml-4">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex cursor-pointer items-start gap-2.5 rounded-lg px-3 py-2.5 text-[0.8125rem] leading-5 transition-colors duration-150 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-50/20 font-medium text-blue-100"
                          : "text-richblack-100 hover:bg-richblack-800"
                      }`}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 shrink-0 accent-[#6366F1]"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                        aria-label={`${topic.title} completed`}
                      />
                      <span>{topic.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
