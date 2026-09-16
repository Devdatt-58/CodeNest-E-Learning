import React from "react"
import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa"

import { FooterLink2 } from "../../data/footer-links"
import Logo from "./Logo"

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]

const Platform = [
  { title: "Courses", link: "/catalog/web-development" },
  { title: "Become an instructor", link: "/signup" },
  { title: "Pricing", link: "/paid-memberships" },
  { title: "For teams", link: "/business-solutions" },
]

const Resources = [
  { title: "Docs", link: "/docs" },
  { title: "Blog", link: "/blog" },
  { title: "Code challenges", link: "/code-challenges" },
  { title: "Projects", link: "/projects" },
]

const Company = [
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
  { title: "Careers", link: "/careers" },
  { title: "Help centre", link: "/help-center" },
]

const socials = [
  { Icon: FaGithub, label: "CodeNest on GitHub" },
  { Icon: FaTwitter, label: "CodeNest on X" },
  { Icon: FaLinkedin, label: "CodeNest on LinkedIn" },
  { Icon: FaYoutube, label: "CodeNest on YouTube" },
]

/** One column of links — keeps the five columns structurally identical. */
const LinkColumn = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-richblack-5">{title}</h3>
    <ul className="mt-4 flex flex-col gap-2.5">
      {links.map((link, i) => (
        <li key={i}>
          <Link
            to={link.link}
            className="text-sm text-richblack-100 transition-colors duration-150 hover:text-richblack-5"
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const Footer = () => {
  // The subjects list in the data file is long; the footer shows a short,
  // scannable slice and sends people to the catalog for the rest.
  const subjects = FooterLink2[0]?.links?.slice(0, 5) ?? []
  const languages = FooterLink2[1]?.links?.slice(0, 5) ?? []

  return (
    <footer className="border-t border-line bg-richblack-850">
      <div className="mx-auto w-11/12 max-w-maxContent py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" aria-label="CodeNest home">
              <Logo withTagline />
            </Link>
            <p className="mt-5 max-w-[34ch] text-sm leading-6 text-richblack-100">
              Project-based courses in web development, data and systems —
              taught by engineers who ship for a living.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="/"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line text-richblack-100 transition-colors duration-150 hover:border-line-strong hover:text-richblack-5"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <LinkColumn title="Platform" links={Platform} />
          <LinkColumn title="Resources" links={Resources} />
          <LinkColumn title="Company" links={Company} />

          <div>
            <LinkColumn title="Subjects" links={subjects} />
            <div className="mt-8">
              <LinkColumn title="Languages" links={languages} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-richblack-300">
            © {new Date().getFullYear()} CodeNest. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {BottomFooter.map((ele, i) => (
              <li key={i}>
                <Link
                  to={ele.split(" ").join("-").toLocaleLowerCase()}
                  className="text-sm text-richblack-300 transition-colors duration-150 hover:text-richblack-5"
                >
                  {ele}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
