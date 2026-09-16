import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "CodeNest partners with engineering teams and universities to bring practical, job-relevant software training to people and organisations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "CodeNest partners with engineering teams and universities to bring practical training to",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "CodeNest partners with engineering teams and universities to bring practical training to",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "CodeNest partners with engineering teams and universities to bring practical training to",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "CodeNest partners with engineering teams and universities to bring practical training to",
  },
];

const LearningGrid = () => {
  return (
    <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {LearningGridArray.map((card, i) => {
        // The lead cell is the section's intro, not a card, so it spans and
        // keeps no border.
        if (card.order < 0) {
          return (
            <div
              key={i}
              className="flex flex-col gap-4 sm:col-span-2 xl:col-span-1 xl:pr-6"
            >
              <h2 className="section_heading">
                {card.heading}
                <HighlightText text={card.highlightText} />
              </h2>
              <p className="text-[0.975rem] leading-7 text-richblack-100">
                {card.description}
              </p>
              <div className="mt-2 w-fit">
                <CTAButton active={true} linkto={card.BtnLink}>
                  {card.BtnText}
                </CTAButton>
              </div>
            </div>
          );
        }

        return (
          <div key={i} className="cn-card-hover flex flex-col gap-3 p-6">
            <h3 className="text-[1.05rem] font-semibold text-richblack-5">
              {card.heading}
            </h3>
            <p className="text-sm leading-6 text-richblack-100">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;