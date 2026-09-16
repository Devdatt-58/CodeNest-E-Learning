import React from "react"
import { HiUsers } from "react-icons/hi"
import { ImTree } from "react-icons/im"

/**
 * Category card on the homepage. Selection is shown with an indigo border and
 * a soft glow rather than by inverting the card to white, so the whole
 * section stays on the dark theme.
 */
const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={() => setCurrentCard(cardData?.heading)}
      className={`flex h-full w-full flex-col rounded-xl border bg-richblack-800 text-left transition-all duration-200 ease-nest ${
        isActive
          ? "border-yellow-50 shadow-glow"
          : "border-line hover:-translate-y-1 hover:border-line-strong"
      }`}
    >
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3
          className={`text-[1.05rem] font-semibold ${
            isActive ? "text-blue-100" : "text-richblack-5"
          }`}
        >
          {cardData?.heading}
        </h3>
        <p className="text-sm leading-6 text-richblack-100">
          {cardData?.description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-line px-5 py-3 text-xs font-medium text-richblack-300">
        <span className="flex items-center gap-2">
          <HiUsers aria-hidden="true" />
          {cardData?.level}
        </span>
        <span className="flex items-center gap-2">
          <ImTree aria-hidden="true" />
          {cardData?.lessionNumber} lessons
        </span>
      </div>
    </button>
  )
}

export default CourseCard
