import AuthContainer from "../components/authContainer";
import GlowBackground from "../components/glowBackground";
import InteractiveGridBackground from "../components/lightswind/interactive-grid-background.tsx";
import { signup } from "../apis/auth.apis.js";

export default function Signup() {
 async function onSubmitAction(input) {
  try {
    const res = await signup(input);
    console.log(res);
  } catch (err) {
    console.log(err.message || err);
  }
}
  return (
    <div className="h-dvh w-full overflow-hidden bg-black text-white flex items-center justify-center">
      <InteractiveGridBackground
        className="z-10"
        trailLength={0}
        idleRandomCount={0}
        gridSize={40}
      />
      <GlowBackground />
      <AuthContainer
        heading={"Signup"}
        defineText={"welcome to "}
        highlightText={"Market Place"}
        buttonName={"Signup"}
        anchorTagName={"Login"}
        fields={[
          {
            name: "username",
            label: "username",
            type: "text",
            placeholder: "Choose your username",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Create your password",
          },
        
        ]}
          onSubmitAction = {onSubmitAction}
      />
    </div>
  );
}