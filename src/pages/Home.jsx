import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

// Image and Video Import
import Banner from "../assets/Images/banner.mp4"
// Component Imports
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import HeroTerminal from "../components/core/HomePage/HeroTerminal"
import HighlightText from "../components/core/HomePage/HighlightText"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/TimelineSection"

const stats = [
  { value: "42k", label: "Learners building" },
  { value: "260+", label: "Guided projects" },
  { value: "120", label: "Working engineers teaching" },
  { value: "4.8", label: "Average course rating" },
]

/* "Learn. Build. Grow." is genuinely a sequence, so it is the one place on
   the page where numbered markers carry information rather than decoration. */
const path = [
  {
    step: "01",
    title: "Learn",
    body: "Short, dense lessons written by engineers. No filler modules, no three-hour lectures — just the concept and why it matters.",
    command: "codenest learn",
  },
  {
    step: "02",
    title: "Build",
    body: "Every track is anchored to a project you actually ship. You write the code in a real repo, not in a quiz box.",
    command: "codenest build",
  },
  {
    step: "03",
    title: "Grow",
    body: "Get your work reviewed, track what you've mastered, and leave with a portfolio a hiring manager can read.",
    command: "codenest ship",
  },
]

function Home() {
  return (
    <div>
      {/* ============================== Hero ============================== */}
      <section className="relative overflow-hidden border-b border-line">
        {/* Background: hairline grid, faded out toward the bottom, with a
            single indigo bloom behind the headline. */}
        <div
          aria-hidden="true"
          className="cn-grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-nest-glow"
        />

        <div className="relative mx-auto grid w-11/12 max-w-maxContent grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          {/* Copy column */}
          <div className="animate-fade-up">
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-richblack-850 py-1.5 pl-1.5 pr-4 text-sm text-richblack-100 transition-colors duration-200 hover:border-line-strong hover:text-richblack-5"
            >
              <span className="rounded-full bg-yellow-50/20 px-2.5 py-1 text-xs font-semibold text-blue-100">
                Teach
              </span>
              Share what you know — become an instructor
              <FaArrowRight
                aria-hidden="true"
                className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>

            <h1 className="cn-display mt-7">
              Learn<span className="text-blue-100">.</span> Build
              <span className="text-blue-100">.</span> Grow
              <span className="text-blue-100">.</span>
            </h1>

            <p className="mt-5 max-w-[56ch] text-lg leading-8 text-richblack-100">
              CodeNest turns software courses into shipped work. Follow a track,
              build the project, get your code reviewed by engineers who do this
              for a living.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CTAButton active={true} linkto={"/signup"}>
                Start learning free
                <FaArrowRight aria-hidden="true" className="text-xs" />
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Log in
              </CTAButton>
            </div>

            <p className="mt-5 font-mono text-[12px] text-richblack-300">
              No card required · Cancel any time
            </p>
          </div>

          {/* Terminal column */}
          <div className="animate-fade-up lg:justify-self-end">
            <HeroTerminal />
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-line">
          <dl className="mx-auto grid w-11/12 max-w-maxContent grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x">
            {stats.map((stat) => (
              <div key={stat.label} className="px-1 py-6 sm:px-6 sm:first:pl-0">
                <dt className="text-2xl font-bold tracking-tight text-richblack-5">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-richblack-300">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ========================= Product preview ========================= */}
      <section className="mx-auto w-11/12 max-w-maxContent py-16 lg:py-20">
        <div className="cn-terminal mx-auto max-w-4xl">
          <div className="cn-terminal-bar">
            <span className="cn-terminal-dot bg-pink-200/70" />
            <span className="cn-terminal-dot bg-brown-100/70" />
            <span className="cn-terminal-dot bg-caribbeangreen-200/70" />
            <span className="ml-2 font-mono text-[11px] text-richblack-300">
              codenest — lesson player
            </span>
          </div>
          <video
            className="block w-full"
            muted
            loop
            autoPlay
            playsInline
            aria-label="A short preview of the CodeNest lesson player"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ============================ Code panels ========================== */}
      <section className="mx-auto w-11/12 max-w-maxContent">
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <h2 className="section_heading">
              Write real code from the
              <HighlightText text={"very first lesson"} />
            </h2>
          }
          subheading={
            "Courses are designed and taught by engineers with years of production experience — and every concept lands in an editor, not a slide."
          }
          ctabtn1={{
            btnText: "Try it yourself",
            link: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Browse courses",
            link: "/signup",
            active: false,
          }}
          codeColor={"text-blue-50"}
          filename={"index.html"}
          codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>My first page</title>\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n    <a href="/one">One</a>\n    <a href="/two">Two</a>\n  </nav>\n</body>`}
          backgroundGradient={<div className="codeblock1"></div>}
        />

        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <h2 className="section_heading">
              Ship a project, not a
              <HighlightText text={"certificate"} />
            </h2>
          }
          subheading={
            "Every track ends with something you can put in front of a hiring manager. You keep the repo, the commits and the review notes."
          }
          ctabtn1={{
            btnText: "Continue a lesson",
            link: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "See the tracks",
            link: "/signup",
            active: false,
          }}
          codeColor={"text-richblack-25"}
          filename={"Home.jsx"}
          codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\n  return (\n    <div>Home</div>\n  );\n};\n\nexport default Home;`}
          backgroundGradient={<div className="codeblock2"></div>}
        />
      </section>

      {/* ============================ Categories =========================== */}
      <section className="border-y border-line bg-richblack-850">
        <div className="mx-auto w-11/12 max-w-maxContent py-16 lg:py-20">
          <ExploreMore />
        </div>
      </section>

      {/* ========================= Learn. Build. Grow. ===================== */}
      <section className="mx-auto w-11/12 max-w-maxContent py-16 lg:py-24">
        <div className="max-w-[60ch]">
          <h2 className="section_heading">How a CodeNest track works</h2>
          <p className="mt-3 text-[0.975rem] leading-7 text-richblack-100">
            Three stages, in order. You move on when the work is done, not when
            the video ends.
          </p>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {path.map((item) => (
            <li key={item.step} className="cn-card-hover p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-blue-100">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-richblack-5">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-richblack-100">
                {item.body}
              </p>
              <code className="mt-5 block rounded-lg border border-line bg-richblack-900 px-3 py-2 font-mono text-[12px] text-richblack-200">
                <span className="text-richblack-400">$ </span>
                {item.command}
              </code>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <CTAButton active={true} linkto={"/signup"}>
            Pick your track
            <FaArrowRight aria-hidden="true" className="text-xs" />
          </CTAButton>
        </div>
      </section>

      {/* ===================== Values + learning tools ===================== */}
      <section className="border-y border-line bg-richblack-850">
        <div className="mx-auto w-11/12 max-w-maxContent py-16 lg:py-20">
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </section>

      {/* ====================== Instructors + reviews ====================== */}
      <section className="mx-auto w-11/12 max-w-maxContent py-16 lg:py-24">
        <InstructorSection />

        <div className="mt-20">
          <h2 className="section_heading text-center">
            What learners say after shipping
          </h2>
          <ReviewSlider />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
