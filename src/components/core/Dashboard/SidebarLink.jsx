import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName, compact = false }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const isActive = matchRoute(link.path)

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center gap-x-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-nest ${
        compact ? "shrink-0 whitespace-nowrap px-3 py-2" : "px-3 py-2.5"
      } ${
        isActive
          ? "bg-yellow-50/10 text-blue-100"
          : "text-richblack-200 hover:bg-richblack-800 hover:text-richblack-5"
      }`}
    >
      {Icon && <Icon className="text-base" aria-hidden="true" />}
      <span>{link.name}</span>
    </NavLink>
  )
}
