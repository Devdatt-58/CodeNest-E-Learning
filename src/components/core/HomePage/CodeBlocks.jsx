import React from "react"
import { TypeAnimation } from "react-type-animation"
import { FaArrowRight } from "react-icons/fa"

import CTAButton from "./Button"

/**
 * A heading/copy column paired with an editor pane that types itself out.
 * The pane carries window chrome and a filename tab so it reads as a real
 * editor rather than as decoration.
 */
const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
  filename = "index.html",
}) => {
  return (
    <div
      className={`flex ${position} my-16 flex-col justify-between gap-12 lg:my-24 lg:items-center lg:gap-16`}
    >
      {/* Copy */}
      <div className="flex w-full flex-col gap-5 lg:w-[48%]">
        {heading}
        <p className="max-w-[52ch] text-[0.975rem] leading-7 text-richblack-100">
          {subheading}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            {ctabtn1.btnText}
            <FaArrowRight aria-hidden="true" className="text-xs" />
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Editor pane */}
      <div className="relative w-full lg:w-[46%]">
        {backgroundGradient}
        <div className="code-border relative overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="cn-terminal-dot bg-pink-200/70" />
            <span className="cn-terminal-dot bg-brown-100/70" />
            <span className="cn-terminal-dot bg-caribbeangreen-200/70" />
            <span className="ml-2 font-mono text-[11px] text-richblack-300">
              {filename}
            </span>
          </div>

          <div className="flex flex-row py-4 text-[11px] leading-5 sm:text-[13px] sm:leading-6">
            {/* Gutter */}
            <div
              aria-hidden="true"
              className="flex w-9 shrink-0 select-none flex-col text-right font-mono text-richblack-500"
            >
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>

            <div
              className={`w-full overflow-x-auto pr-3 font-mono ${codeColor}`}
            >
              <TypeAnimation
                sequence={[codeblock, 1600, ""]}
                cursor={true}
                repeat={Infinity}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                }}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
