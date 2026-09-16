import React from "react"
import { TypeAnimation } from "react-type-animation"

/**
 * The signature element of the homepage: a CodeNest CLI session that types
 * itself out. It is the one place on the page where we spend any visual
 * boldness — everything around it stays quiet.
 */
export default function HeroTerminal() {
  return (
    <div className="cn-terminal w-full">
      {/* Window chrome */}
      <div className="cn-terminal-bar">
        <span className="cn-terminal-dot bg-pink-200/70" />
        <span className="cn-terminal-dot bg-brown-100/70" />
        <span className="cn-terminal-dot bg-caribbeangreen-200/70" />
        <span className="ml-2 font-mono text-[11px] text-richblack-300">
          ~/codenest
        </span>
      </div>

      <div className="min-h-[248px] p-5 font-mono text-[12.5px] leading-[1.9] sm:text-[13.5px]">
        <TypeAnimation
          sequence={[
            "$ codenest start\n" +
              "→ picking a track…\n" +
              "  [1] Full-stack JavaScript\n" +
              "  [2] Data engineering\n" +
              "  [3] Systems & DevOps\n" +
              "$ codenest learn 1 --project\n" +
              "✔ lesson 01 · components\n" +
              "✔ review from your mentor\n" +
              "✔ shipped to your portfolio",
            2600,
            "",
          ]}
          cursor={true}
          repeat={Infinity}
          omitDeletionAnimation={true}
          style={{
            whiteSpace: "pre-line",
            display: "block",
            color: "#CBD5E1",
          }}
        />
      </div>

      {/* Status bar — borrows the vocabulary of an editor footer. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line bg-richblack-800 px-4 py-2 font-mono text-[11px] text-richblack-300">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-caribbeangreen-100" />
          connected
        </span>
        <span>main</span>
        <span className="hidden sm:inline">utf-8</span>
        <span className="ml-auto hidden sm:inline">
          press <kbd className="cn-kbd">⌘K</kbd> to search courses
        </span>
      </div>
    </div>
  )
}
