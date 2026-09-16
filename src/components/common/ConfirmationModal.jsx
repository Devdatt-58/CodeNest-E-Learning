import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-900/70 px-4 backdrop-blur-sm"
    >
      <div className="animate-fade-up w-full max-w-[400px] rounded-xl border border-line bg-richblack-800 p-6 shadow-lift">
        <p className="text-lg font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-2 text-sm leading-6 text-richblack-100">
          {modalData?.text2}
        </p>
        <div className="mt-6 flex items-center justify-end gap-x-3">
          <button
            type="button"
            className="cn-btn-secondary"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
          <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text} />
        </div>
      </div>
    </div>
  )
}
