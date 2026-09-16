import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Doughnut } from "react-chartjs-2"

Chart.register(...registerables)

/* A fixed palette walking from indigo to cyan. Random per-render colours made
   the same course change colour on every paint, which is not a chart. */
const PALETTE = [
  "#6366F1",
  "#22D3EE",
  "#818CF8",
  "#06B6D4",
  "#A5B4FC",
  "#0891B2",
  "#4F46E5",
  "#67E8F9",
]

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")

  const colorsFor = (count) =>
    Array.from({ length: count }, (_, i) => PALETTE[i % PALETTE.length])

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: colorsFor(courses.length),
        borderColor: "#151E2E",
        borderWidth: 2,
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: colorsFor(courses.length),
        borderColor: "#151E2E",
        borderWidth: 2,
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#94A3B8",
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: "circle",
          font: { family: "Inter", size: 12 },
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        borderColor: "rgba(148,163,184,0.2)",
        borderWidth: 1,
        titleColor: "#F8FAFC",
        bodyColor: "#CBD5E1",
        padding: 12,
        cornerRadius: 8,
      },
    },
  }

  return (
    <div className="cn-card flex flex-1 flex-col gap-y-4 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-richblack-5">Breakdown</h2>

        <div
          role="tablist"
          className="flex gap-1 rounded-[0.6rem] border border-line bg-richblack-850 p-1"
        >
          <button
            role="tab"
            aria-selected={currChart === "students"}
            onClick={() => setCurrChart("students")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              currChart === "students"
                ? "bg-yellow-50 text-white"
                : "text-richblack-100 hover:text-richblack-5"
            }`}
          >
            Students
          </button>
          <button
            role="tab"
            aria-selected={currChart === "income"}
            onClick={() => setCurrChart("income")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              currChart === "income"
                ? "bg-yellow-50 text-white"
                : "text-richblack-100 hover:text-richblack-5"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      <div className="relative mx-auto h-full min-h-[280px] w-full">
        <Doughnut
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}
