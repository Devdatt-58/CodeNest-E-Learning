import React, { useState } from "react"

import { HomePageExplore } from "../../../data/homepage-explore"
import CourseCard from "./CourseCard"
import HighlightText from "./HighlightText"

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
]

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0])
  const [courses, setCourses] = useState(HomePageExplore[0].courses)
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  )

  const setMyCards = (value) => {
    setCurrentTab(value)
    const result = HomePageExplore.filter((course) => course.tag === value)
    setCourses(result[0].courses)
    setCurrentCard(result[0].courses[0].heading)
  }

  return (
    <div>
      <div className="max-w-[60ch]">
        <h2 className="section_heading">
          Unlock the
          <HighlightText text={"power of code"} />
        </h2>
        <p className="mt-3 text-[0.975rem] leading-7 text-richblack-100">
          Start wherever you are. Each path bundles lessons, projects and
          reviews into one ordered route.
        </p>
      </div>

      {/* Segmented control — scrolls horizontally on small screens instead of
          disappearing, which is what the old layout did. */}
      <div
        role="tablist"
        aria-label="Course collections"
        className="mt-8 -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-2"
      >
        {tabsName.map((ele, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={currentTab === ele}
            onClick={() => setMyCards(ele)}
            className={`whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 ease-nest ${
              currentTab === ele
                ? "border-yellow-50 bg-yellow-50/10 text-blue-100"
                : "border-line bg-richblack-800 text-richblack-100 hover:border-line-strong hover:text-richblack-5"
            }`}
          >
            {ele}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((ele, index) => (
          <CourseCard
            key={index}
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  )
}

export default ExploreMore
