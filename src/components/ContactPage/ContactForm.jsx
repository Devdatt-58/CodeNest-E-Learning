import React from "react"

import ContactUsForm from "./ContactUsForm"

const ContactForm = () => {
  return (
    <div className="cn-card p-6 sm:p-8">
      <h2 className="text-xl font-bold leading-tight text-richblack-5 sm:text-2xl">
        Tell us what you're building
      </h2>
      <p className="mt-2 text-sm leading-6 text-richblack-100">
        A short description is enough — we'll follow up within one working day.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactForm
