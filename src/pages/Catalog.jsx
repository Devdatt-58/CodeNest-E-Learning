import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { Link, useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import CourseCard from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { useSelector } from "react-redux";
import Error from "./Error";

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();

  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);

      const category_id =
        res?.data?.data
          ?.filter(
            (ct) =>
              ct.name.split(" ").join("-").toLowerCase() === catalogName
          )[0]?._id;

      setCategoryId(category_id);
    };

    getCategories();
  }, [catalogName]);

  // Fetch category details
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        console.log("PRinting res: ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-4rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  return (
    <>
      {/* Category header */}
      <header className="relative overflow-hidden border-b border-line bg-richblack-850">
        <div
          aria-hidden="true"
          className="cn-grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />

        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-center gap-3 py-14">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-richblack-300"
          >
            <Link to="/" className="hover:text-richblack-5">
              Home
            </Link>

            <span className="px-2">/</span>

            <span>Catalog</span>

            <span className="px-2">/</span>

            <span className="text-blue-100">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </nav>

          <h1 className="cn-display">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>

          <p className="max-w-[70ch] text-[0.975rem] leading-7 text-richblack-100">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </header>

      {/* Courses in this category */}
      <section className="mx-auto w-11/12 max-w-maxContent py-14">
        <h2 className="section_heading">
          Courses to get you started
        </h2>

        <div
          role="tablist"
          className="mt-5 flex gap-1 border-b border-line text-sm"
        >
          <button
            role="tab"
            aria-selected={active === 1}
            className={`-mb-px border-b-2 px-4 py-2.5 font-medium transition-colors duration-150 ${
              active === 1
                ? "border-yellow-50 text-blue-100"
                : "border-transparent text-richblack-200 hover:text-richblack-5"
            }`}
            onClick={() => setActive(1)}
          >
            Most popular
          </button>

          <button
            role="tab"
            aria-selected={active === 2}
            className={`-mb-px border-b-2 px-4 py-2.5 font-medium transition-colors duration-150 ${
              active === 2
                ? "border-yellow-50 text-blue-100"
                : "border-transparent text-richblack-200 hover:text-richblack-5"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </button>
        </div>

        <div className="mt-8">
          <CourseSlider
            Courses={
              catalogPageData?.data?.selectedCategory?.courses
            }
          />
        </div>
      </section>

      {/* Adjacent category */}
      <section className="mx-auto w-11/12 max-w-maxContent border-t border-line py-14">
        <h2 className="section_heading">
          Top courses in{" "}
          {catalogPageData?.data?.differentCategory?.name}
        </h2>

        <div className="mt-8">
          <CourseSlider
            Courses={
              catalogPageData?.data?.differentCategory?.courses
            }
          />
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto w-11/12 max-w-maxContent border-t border-line py-14">
        <h2 className="section_heading">
          Frequently bought together
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <CourseCard
                course={course}
                key={i}
                Height={"h-[220px]"}
              />
            ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Catalog;