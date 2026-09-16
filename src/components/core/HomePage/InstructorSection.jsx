import React from "react"
import { FaArrowRight } from "react-icons/fa"

import Instructor from "../../../assets/Images/Instructor.png"
import CTAButton from "./Button"
import HighlightText from "./HighlightText"

const InstructorSection = () => {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="relative">
        {/* Offset accent frame replaces the old hard white drop shadow. */}
        <div
          aria-hidden="true"
          className="absolute -left-3 -top-3 h-full w-full rounded-xl border border-yellow-50/40"
        />
        <img
          src={Instructor}
          alt="An instructor recording a CodeNest lesson"
          className="relative w-full rounded-xl border border-line object-cover"
          loading="lazy"
        />
      </div>

      <div>
        <h2 className="section_heading">
          Teach on
          <HighlightText text={"CodeNest"} />
        </h2>
        <p className="mt-4 max-w-[54ch] text-[0.975rem] leading-7 text-richblack-100">
          Engineers around the world teach thousands of students on CodeNest.
          Bring the craft — we handle hosting, payments, reviews and the
          lesson player.
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {[
            "Publish a course with the built-in course builder",
            "Track students, revenue and ratings in one dashboard",
            "Get paid per enrolment, with no setup cost",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-6 text-richblack-100"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-100"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Start teaching today
            <FaArrowRight aria-hidden="true" className="text-xs" />
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
