/**
 * CodeNest wordmark.
 *
 * The mark is `<•>` — two chevrons closing around a single dot. It reads as a
 * code fragment and as a nest holding something small, which is the whole
 * brand idea in one glyph. Drawn in SVG so it stays crisp at any size and
 * needs no image asset.
 */
export function LogoMark({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="cn-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0B1120" />
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="14.5"
        fill="none"
        stroke="url(#cn-logo-grad)"
        strokeWidth="3"
      />
      <path
        d="M25 21 L14 32 L25 43"
        fill="none"
        stroke="#F8FAFC"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39 21 L50 32 L39 43"
        fill="none"
        stroke="#F8FAFC"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="4.5" fill="#22D3EE" />
    </svg>
  )
}

/**
 * @param {"sm"|"md"} size
 * @param {boolean} withTagline  Show "Learn. Build. Grow." under the wordmark.
 */
export default function Logo({ size = "md", withTagline = false, className = "" }) {
  const markSize = size === "sm" ? 26 : 30

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={markSize} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-[-0.02em] text-richblack-5 ${
            size === "sm" ? "text-[1.05rem]" : "text-[1.2rem]"
          }`}
        >
          Code<span className="text-blue-100">Nest</span>
        </span>
        {withTagline && (
          <span className="mt-1.5 font-mono text-[11px] tracking-tight text-richblack-300">
            Learn. Build. Grow.
          </span>
        )}
      </span>
    </span>
  )
}
