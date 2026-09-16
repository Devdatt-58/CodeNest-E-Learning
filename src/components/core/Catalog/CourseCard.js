import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";

const CourseCard = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link to={`/courses/${course._id}`} className="group block h-full">
      <article className="cn-card-hover flex h-full flex-col overflow-hidden">
        <div className="overflow-hidden border-b border-line">
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            loading="lazy"
            className={`${Height} w-full object-cover transition-transform duration-300 ease-nest group-hover:scale-[1.03]`}
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="text-[1.02rem] font-semibold leading-snug text-richblack-5">
            {course?.courseName}
          </h3>

          <p className="text-sm text-richblack-300">
            {course?.instructor?.firstName}{" "}
            {course?.instructor?.lastName}
          </p>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-brown-50">
              {avgReviewCount || 0}
            </span>

            <RatingStars Review_Count={avgReviewCount} />

            <span className="text-richblack-400">
              ({course?.ratingAndReviews?.length})
            </span>
          </div>

          <p className="mt-auto pt-2 text-base font-bold text-richblack-5">
            Rs. {course?.price}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default CourseCard;