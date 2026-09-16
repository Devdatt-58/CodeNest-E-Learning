import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat with us",
    description: "Our friendly team is here to help.",
    details: "hello@codenest.dev",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="cn-card flex h-fit flex-col divide-y divide-line p-2">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex gap-3.5 p-4 text-sm text-richblack-100"
            key={i}
          >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-richblack-850 text-blue-100">
              <Icon size={17} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2 className="text-[0.95rem] font-semibold text-richblack-5">
                {ele?.heading}
              </h2>
              <p className="mt-0.5 text-xs text-richblack-300">
                {ele?.description}
              </p>
              <p className="mt-1.5 break-words font-medium text-richblack-25">
                {ele?.details}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails