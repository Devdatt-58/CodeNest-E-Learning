import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome back"
      description1="Pick up where you left off."
      description2="Your projects are waiting."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login
