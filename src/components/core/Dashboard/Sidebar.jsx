import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[80px] w-full place-items-center border-b border-line bg-richblack-850 lg:h-[calc(100vh-4rem)] lg:w-[248px] lg:border-b-0 lg:border-r">
        <div className="spinner"></div>
      </div>
    )
  }

  const visibleLinks = sidebarLinks.filter(
    (link) => !link.type || user?.accountType === link.type
  )

  const logoutModal = () =>
    setConfirmationModal({
      text1: "Log out of CodeNest?",
      text2: "You'll need to sign in again to reach your courses.",
      btn1Text: "Log out",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(logout(navigate)),
      btn2Handler: () => setConfirmationModal(null),
    })

  return (
    <>
      {/* Desktop rail */}
      <aside
        className="hidden shrink-0 flex-col justify-between border-r border-line bg-richblack-850 py-6 lg:flex lg:h-[calc(100vh-4rem)] lg:w-[248px] lg:sticky lg:top-16"
        aria-label="Dashboard"
      >
        <div>
          <p className="px-4 pb-2 text-xs font-semibold tracking-wide text-richblack-300">
            {user?.accountType === "Instructor" ? "Instructor" : "Student"}
          </p>
          <nav className="flex flex-col gap-1 px-2">
            {visibleLinks.map((link) => (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            ))}
          </nav>

          <div className="mx-4 my-4 h-px bg-line" />

          <nav className="flex flex-col gap-1 px-2">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
          </nav>
        </div>

        <div className="px-2">
          <button
            onClick={logoutModal}
            className="flex w-full items-center gap-x-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-richblack-300 transition-colors duration-150 hover:bg-pink-200/10 hover:text-pink-50"
          >
            <VscSignOut className="text-base" aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile / tablet bar — the same links, scrollable, so nothing is
          lost on a narrow screen. */}
      <div className="sticky top-16 z-40 border-b border-line bg-richblack-850/95 backdrop-blur lg:hidden">
        <nav
          className="mx-auto flex w-11/12 max-w-[1040px] gap-1 overflow-x-auto py-2"
          aria-label="Dashboard"
        >
          {visibleLinks.map((link) => (
            <SidebarLink
              key={link.id}
              link={link}
              iconName={link.icon}
              compact
            />
          ))}
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
            compact
          />
          <button
            onClick={logoutModal}
            className="flex shrink-0 items-center gap-x-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-richblack-300"
          >
            <VscSignOut className="text-base" aria-hidden="true" />
            Log out
          </button>
        </nav>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
