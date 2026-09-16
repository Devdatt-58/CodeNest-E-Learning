import React from "react";

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponenet = () => {
  return (
    <div className="border-y border-line bg-richblack-850">
      <dl className="mx-auto grid w-11/12 max-w-maxContent grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
        {Stats.map((data, index) => (
          <div key={index} className="px-1 py-10 text-center md:px-6">
            <dt className="text-3xl font-bold tracking-tight text-richblack-5">
              {data.count}
            </dt>
            <dd className="mt-1.5 text-sm text-richblack-300">{data.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default StatsComponenet;