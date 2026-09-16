import React from "react"

import TimeLineImage from "../../../assets/Images/TimelineImage.png"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

const TimeLine = [
  {
    Logo: Logo1,
    Heading: "Mentorship",
    Description: "Working engineers review the code you write, line by line.",
  },
  {
    Logo: Logo2,
    Heading: "Accountability",
    Description: "Progress is measured in projects finished, not hours watched.",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "Learn at your own pace and switch tracks whenever you need.",
  },
  {
    Logo: Logo4,
    Heading: "Problem solving",
    Description: "Every lesson ends in a problem you have to reason through.",
  },
]

const TimelineSection = () => {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-5">
        {TimeLine.map((ele, i) => (
          <div key={i} className="flex gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line bg-richblack-800">
              <img src={ele.Logo} alt="" aria-hidden="true" className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-richblack-5">
                {ele.Heading}
              </h3>
              <p className="mt-1 text-sm leading-6 text-richblack-100">
                {ele.Description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <img
          src={TimeLineImage}
          alt="Learners working through a CodeNest project together"
          className="w-full rounded-xl border border-line object-cover"
          loading="lazy"
        />
        {/* Figures sit on the image as a single quiet band rather than as a
            second competing block of colour. */}
        <dl className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-richblack-800 sm:absolute sm:inset-x-6 sm:-bottom-7 sm:mt-0 sm:bg-richblack-800/95 sm:backdrop-blur">
          <div className="border-r border-line px-5 py-4">
            <dt className="text-2xl font-bold text-richblack-5">10</dt>
            <dd className="mt-0.5 text-xs text-richblack-300">
              Years of teaching experience
            </dd>
          </div>
          <div className="px-5 py-4">
            <dt className="text-2xl font-bold text-richblack-5">250</dt>
            <dd className="mt-0.5 text-xs text-richblack-300">
              Courses across every track
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default TimelineSection
