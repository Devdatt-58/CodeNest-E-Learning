import React from "react"

/**
 * Marks the key phrase inside a heading.
 *
 * Rendered as a solid cyan phrase sitting on a soft accent rule rather than a
 * gradient wash — it stays legible at small sizes and keeps the accent colour
 * doing one job across the product.
 */
const HighlightText = ({ text }) => {
  return (
    <>
      {" "}
      <span className="relative inline-block whitespace-nowrap font-bold text-blue-100">
        {text}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-gradient-to-r from-yellow-50 to-blue-100 opacity-70"
        />
      </span>
    </>
  )
}

export default HighlightText
