import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-4rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-richblack-900 lg:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
        <div className="mx-auto w-11/12 max-w-[1040px] py-8 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
