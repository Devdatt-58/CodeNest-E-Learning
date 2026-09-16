import React from "react"

import Compare_with_others from "../../../assets/Images/Compare_with_others.svg"
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg"
import CTAButton from "./Button"
import HighlightText from "./HighlightText"

const LearningLanguageSection = () => {
  return (
    <div className="mt-20 text-center sm:mt-24">
      <h2 className="section_heading mx-auto max-w-[24ch]">
        Everything you need to
        <HighlightText text={"stay on track"} />
      </h2>
      <p className="mx-auto mt-3 max-w-[60ch] text-[0.975rem] leading-7 text-richblack-100">
        Progress tracking, a schedule that adapts to the time you actually
        have, and a clear view of where you stand across 20+ languages and
        frameworks.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-0">
        <img
          src={Know_your_progress}
          alt="A progress chart showing lessons completed over time"
          className="w-full max-w-[340px] object-contain lg:-mr-24"
          loading="lazy"
        />
        <img
          src={Compare_with_others}
          alt="A comparison of your pace against other learners"
          className="w-full max-w-[340px] object-contain lg:-mb-8"
          loading="lazy"
        />
        <img
          src={Plan_your_lessons}
          alt="A weekly schedule of planned lessons"
          className="w-full max-w-[340px] object-contain lg:-ml-24 lg:-mt-4"
          loading="lazy"
        />
      </div>

      <div className="mt-10 flex justify-center">
        <CTAButton active={true} linkto={"/signup"}>
          Create your account
        </CTAButton>
      </div>
    </div>
  )
}

export default LearningLanguageSection
