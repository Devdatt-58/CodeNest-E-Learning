import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Create your CodeNest account"
      description1="Learn. Build. Grow."
      description2="Start your first project free."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
