/**
 * Button with an optional trailing icon.
 *
 * API is unchanged (text, onclick, children, disabled, outline, customClasses,
 * type) — only the styling moved onto the shared button system.
 */
export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`${
        outline ? "cn-btn-secondary" : "cn-btn-primary"
      } ${customClasses ?? ""}`}
      type={type}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
