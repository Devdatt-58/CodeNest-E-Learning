import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <aside className="cn-card w-full shrink-0 p-6 lg:sticky lg:top-24 lg:w-[300px]">
      <p className="text-sm text-richblack-300">Total</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-richblack-5">
        ₹{total}
      </p>
      <div className="my-5 h-px bg-line" />
      <IconBtn
        text="Check out"
        onclick={handleBuyCourse}
        customClasses="w-full cn-btn-lg"
      />
      <p className="mt-3 text-center text-xs text-richblack-400">
        Lifetime access · 30-day refund
      </p>
    </aside>
  )
}