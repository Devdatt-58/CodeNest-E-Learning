import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

/** One label/value pair. Keeps every detail row aligned identically. */
const Detail = ({ label, value, placeholder }) => (
  <div>
    <dt className="text-xs text-richblack-300">{label}</dt>
    <dd
      className={`mt-1 text-sm font-medium ${
        value ? "text-richblack-5" : "text-richblack-400"
      }`}
    >
      {value || placeholder}
    </dd>
  </div>
)

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  const goToSettings = () => navigate("/dashboard/settings")

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-richblack-5">My profile</h1>
        <p className="mt-1 text-sm text-richblack-300">
          How you appear to instructors and other learners on CodeNest.
        </p>
      </header>

      {/* Identity */}
      <section className="cn-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="aspect-square w-16 rounded-xl border border-line object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="mt-0.5 text-sm text-richblack-300">{user?.email}</p>
            <span className="cn-chip mt-2">{user?.accountType}</span>
          </div>
        </div>
        <IconBtn text="Edit" onclick={goToSettings}>
          <RiEditBoxLine aria-hidden="true" />
        </IconBtn>
      </section>

      {/* About */}
      <section className="cn-card mt-6 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-richblack-5">About</h2>
          <IconBtn text="Edit" onclick={goToSettings}>
            <RiEditBoxLine aria-hidden="true" />
          </IconBtn>
        </div>
        <p
          className={`mt-4 max-w-[70ch] text-sm leading-6 ${
            user?.additionalDetails?.about
              ? "text-richblack-100"
              : "text-richblack-400"
          }`}
        >
          {user?.additionalDetails?.about ??
            "Add a short bio so instructors know what you're working towards."}
        </p>
      </section>

      {/* Personal details */}
      <section className="cn-card mt-6 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-richblack-5">
            Personal details
          </h2>
          <IconBtn text="Edit" onclick={goToSettings}>
            <RiEditBoxLine aria-hidden="true" />
          </IconBtn>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          <Detail label="First name" value={user?.firstName} />
          <Detail label="Last name" value={user?.lastName} />
          <Detail label="Email" value={user?.email} />
          <Detail
            label="Phone number"
            value={user?.additionalDetails?.contactNumber}
            placeholder="Not added"
          />
          <Detail
            label="Gender"
            value={user?.additionalDetails?.gender}
            placeholder="Not added"
          />
          <Detail
            label="Date of birth"
            value={formattedDate(user?.additionalDetails?.dateOfBirth)}
            placeholder="Not added"
          />
        </dl>
      </section>
    </>
  )
}
