/** Segmented control. Used for the student / instructor choice at signup. */
export default function Tab({ tabData, field, setField }) {
  return (
    <div
      role="tablist"
      className="my-3 flex max-w-max gap-1 rounded-[0.7rem] border border-line bg-richblack-850 p-1"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={field === tab.type}
          onClick={() => setField(tab.type)}
          className={`rounded-[0.5rem] px-4 py-1.5 text-sm font-medium transition-all duration-200 ease-nest ${
            field === tab.type
              ? "bg-yellow-50 text-white shadow-card"
              : "bg-transparent text-richblack-100 hover:text-richblack-5"
          }`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  )
}
