import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSettingsGear, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button
      className="relative"
      onClick={() => setOpen(true)}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-label="Account menu"
    >
      <div className="flex items-center gap-x-1.5 rounded-lg border border-line p-1 pr-2 transition-colors duration-150 hover:border-line-strong">
        <img
          src={user?.image}
          alt=""
          className="aspect-square w-[26px] rounded-md object-cover"
        />
        <AiOutlineCaretDown className="text-[10px] text-richblack-200" />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          role="menu"
          className="animate-fade-in absolute right-0 top-[calc(100%+8px)] z-[1000] w-[230px] overflow-hidden rounded-xl border border-line bg-richblack-850 p-1.5 text-left shadow-lift"
          ref={ref}
        >
          <div className="border-b border-line px-3 pb-3 pt-2">
            <p className="truncate text-sm font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="mt-0.5 truncate text-xs text-richblack-300">
              {user?.email}
            </p>
          </div>

          <div className="pt-1.5">
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-2.5 rounded-lg px-3 py-2 text-sm text-richblack-100 transition-colors duration-150 hover:bg-richblack-800 hover:text-richblack-5">
                <VscDashboard className="text-base" aria-hidden="true" />
                Dashboard
              </div>
            </Link>
            <Link to="/dashboard/settings" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-2.5 rounded-lg px-3 py-2 text-sm text-richblack-100 transition-colors duration-150 hover:bg-richblack-800 hover:text-richblack-5">
                <VscSettingsGear className="text-base" aria-hidden="true" />
                Settings
              </div>
            </Link>
            <div
              onClick={() => {
                dispatch(logout(navigate))
                setOpen(false)
              }}
              className="mt-1 flex w-full cursor-pointer items-center gap-x-2.5 rounded-lg px-3 py-2 text-sm text-richblack-100 transition-colors duration-150 hover:bg-pink-200/10 hover:text-pink-50"
            >
              <VscSignOut className="text-base" aria-hidden="true" />
              Log out
            </div>
          </div>
        </div>
      )}
    </button>
  )
}
