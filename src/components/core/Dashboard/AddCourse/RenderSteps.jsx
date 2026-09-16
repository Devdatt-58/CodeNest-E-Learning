import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course information",
    },
    {
      id: 2,
      title: "Course builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      {/* Progress rail. Labels sit under their own marker instead of in a
          second, separately-spaced row, so the two never drift apart. */}
      <ol className="mb-10 flex w-full items-start">
        {steps.map((item, index) => {
          const isDone = step > item.id
          const isCurrent = step === item.id

          return (
            <li
              key={item.id}
              className={`flex items-start ${
                index !== steps.length - 1 ? "flex-1" : ""
              }`}
            >
              <div className="flex w-[110px] shrink-0 flex-col items-center gap-2 text-center">
                <span
                  aria-current={isCurrent ? "step" : undefined}
                  className={`grid aspect-square w-9 place-items-center rounded-full border text-sm font-semibold transition-all duration-200 ease-nest ${
                    isDone
                      ? "border-yellow-50 bg-yellow-50 text-white"
                      : isCurrent
                      ? "border-yellow-50 bg-yellow-50/20 text-blue-100"
                      : "border-line bg-richblack-800 text-richblack-400"
                  }`}
                >
                  {isDone ? (
                    <FaCheck className="text-xs" aria-hidden="true" />
                  ) : (
                    item.id
                  )}
                </span>
                <p
                  className={`text-xs leading-4 ${
                    step >= item.id ? "text-richblack-5" : "text-richblack-400"
                  }`}
                >
                  {item.title}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`mt-[18px] h-px flex-1 ${
                    isDone ? "bg-yellow-50" : "bg-line-strong"
                  }`}
                />
              )}
            </li>
          )
        })}
      </ol>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
