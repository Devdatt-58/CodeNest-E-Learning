import React from "react"
import { Link } from "react-router-dom"

/**
 * Homepage call to action. `active` picks the primary treatment; everything
 * else falls back to the secondary button so both share one height, radius
 * and transition with the rest of the product.
 */
const Button = ({ children, active, linkto }) => {
  return (
    <Link
      to={linkto}
      className={`${active ? "cn-btn-primary" : "cn-btn-secondary"} cn-btn-lg`}
    >
      {children}
    </Link>
  )
}

export default Button
