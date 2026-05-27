import signupImage from "../assets/signupImg.png";
import AuthContainer from "../components/authContainer";
import { useNavigate } from "react-router-dom";
import { signup } from "../apis/auth.apis.js";

export default function Signup() {
  const navigate = useNavigate();
  async function onSubmitAction(input) {
    try {
      const res = await signup(input);
      localStorage.setItem("accessAccId", res.otpId);
      navigate("/verify-otp");
    } catch (err) {
      console.log(err.message || err);
    }
  }
  return (
    <div className="h-dvh w-full overflow-hidden bg-black text-white flex items-center justify-center">
      <div className="h-full w-[80%] hidden md:flex items-center justify-center relative p-5">
         <img
         className="h-full w-full object-cover"
         src={signupImage} alt="Signup Illustration" />
      </div>
      <div className="h-full w-[45%] md:pr-30 flex items-center justify-center ">
      <AuthContainer
        heading={"Signup"}
        defineText={"Welcome to "}  
        highlightText={" Sales Nova"}
        buttonName={"Sign Up with Email"}
        anchorTagName={"Login"}
        fields={[
          { name: "username", label: "Username", type: "text", placeholder: "Choose your username" },
          { name: "companyName", label: "Company Name", type: "text", placeholder: "Enter your company name" },
          { name: "email", label: "Email", type: "email", placeholder: "name@example.com" },
          { name: "password", label: "Password", type: "password", placeholder: "Create your password" },
        ]}
        onSubmitAction={onSubmitAction}
      />
      </div>
    </div>
  );
}