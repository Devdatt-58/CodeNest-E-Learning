import React from "react"

import ReviewSlider from "../components/common/ReviewSlider"
import Footer from "../components/common/Footer"
import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactForm"

const Contact = () => {
  return (
    <div>
      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="cn-grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="relative mx-auto w-11/12 max-w-maxContent py-16">
          <h1 className="cn-display max-w-[18ch]">Talk to us</h1>
          <p className="mt-4 max-w-[58ch] text-[0.975rem] leading-7 text-richblack-100">
            Questions about a course, your account or teaching on CodeNest?
            Send us a note and a real person will answer.
          </p>
        </div>
      </header>

      <div className="mx-auto grid w-11/12 max-w-maxContent gap-8 py-14 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <ContactDetails />
        <ContactForm />
      </div>

      <section className="mx-auto w-11/12 max-w-maxContent border-t border-line py-14">
        <h2 className="section_heading text-center">
          What learners say after shipping
        </h2>
        <ReviewSlider />
      </section>

      <Footer />
    </div>
  )
}

export default Contact
