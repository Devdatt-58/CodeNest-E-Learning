import { useEffect, useRef, useState } from "react"
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import Logo from "./Logo"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mobilePanelRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false)
    setMobileCatalogOpen(false)
  }, [location.pathname])

  // The bar gains a border + blur only once the page has scrolled, so the
  // hero reads as full-bleed at rest.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const catalogLinks = subLinks?.filter((subLink) => subLink?.courses?.length > 0) ?? []

  return (
    <header
      className={`sticky top-0 z-[60] w-full border-b transition-all duration-200 ease-nest ${
        scrolled || mobileOpen || location.pathname !== "/"
          ? "border-line bg-richblack-900/90 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-11/12 max-w-maxContent items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" aria-label="CodeNest home" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:block" aria-label="Main">
          <ul className="flex items-center gap-x-1 text-sm">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="group relative">
                    <button
                      type="button"
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-medium transition-colors duration-150 ${
                        matchRoute("/catalog/:catalogName")
                          ? "bg-yellow-50/10 text-blue-100"
                          : "text-richblack-100 hover:bg-richblack-800 hover:text-richblack-5"
                      }`}
                      aria-haspopup="true"
                    >
                      {link.title}
                      <BsChevronDown className="text-[11px] transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    <div className="invisible absolute left-1/2 top-full z-[1000] w-[260px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 ease-nest group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="overflow-hidden rounded-xl border border-line bg-richblack-850 p-1.5 shadow-lift">
                        {loading ? (
                          <div className="space-y-1.5 p-2">
                            <div className="skeleton h-8 w-full" />
                            <div className="skeleton h-8 w-4/5" />
                          </div>
                        ) : catalogLinks.length ? (
                          catalogLinks.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-richblack-50 transition-colors duration-150 hover:bg-richblack-800 hover:text-richblack-5"
                              key={i}
                            >
                              <span>{subLink.name}</span>
                              <span className="font-mono text-[11px] text-richblack-400">
                                {subLink.courses.length}
                              </span>
                            </Link>
                          ))
                        ) : (
                          <p className="px-3 py-4 text-center text-sm text-richblack-300">
                            No courses published yet
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className={`block rounded-lg px-3 py-2 font-medium transition-colors duration-150 ${
                      matchRoute(link?.path)
                        ? "bg-yellow-50/10 text-blue-100"
                        : "text-richblack-100 hover:bg-richblack-800 hover:text-richblack-5"
                    }`}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Account actions */}
        <div className="hidden items-center gap-x-3 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/cart"
              className="relative grid h-9 w-9 place-items-center rounded-lg border border-line text-richblack-100 transition-colors duration-150 hover:border-line-strong hover:text-richblack-5"
              aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
            >
              <AiOutlineShoppingCart className="text-lg" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-yellow-50 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <>
              <Link to="/login" className="cn-btn-ghost cn-btn-sm">
                Log in
              </Link>
              <Link to="/signup" className="cn-btn-primary cn-btn-sm">
                Get started
              </Link>
            </>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center gap-2 md:hidden">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/cart"
              className="relative grid h-9 w-9 place-items-center rounded-lg border border-line text-richblack-100"
              aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
            >
              <AiOutlineShoppingCart className="text-lg" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-yellow-50 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-richblack-50"
            aria-expanded={mobileOpen}
            aria-controls="cn-mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <AiOutlineClose size={18} /> : <AiOutlineMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="cn-mobile-nav"
          ref={mobilePanelRef}
          className="animate-fade-in border-t border-line bg-richblack-900/95 backdrop-blur-xl md:hidden"
        >
          <nav className="mx-auto w-11/12 max-w-maxContent py-4" aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setMobileCatalogOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[0.95rem] font-medium text-richblack-50"
                        aria-expanded={mobileCatalogOpen}
                      >
                        {link.title}
                        <BsChevronDown
                          className={`text-xs transition-transform duration-200 ${
                            mobileCatalogOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileCatalogOpen && (
                        <div className="ml-3 flex flex-col border-l border-line pl-3">
                          {loading ? (
                            <div className="skeleton my-2 h-8 w-4/5" />
                          ) : catalogLinks.length ? (
                            catalogLinks.map((subLink, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg px-3 py-2.5 text-sm text-richblack-100"
                              >
                                {subLink.name}
                              </Link>
                            ))
                          ) : (
                            <p className="px-3 py-2.5 text-sm text-richblack-300">
                              No courses published yet
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link?.path}
                      className={`block rounded-lg px-3 py-3 text-[0.95rem] font-medium ${
                        matchRoute(link?.path)
                          ? "bg-yellow-50/10 text-blue-100"
                          : "text-richblack-50"
                      }`}
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {token === null ? (
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
                <Link to="/login" className="cn-btn-secondary w-full">
                  Log in
                </Link>
                <Link to="/signup" className="cn-btn-primary w-full">
                  Get started
                </Link>
              </div>
            ) : (
              <div className="mt-4 border-t border-line pt-4">
                <Link to="/dashboard/my-profile" className="cn-btn-secondary w-full">
                  Go to dashboard
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
