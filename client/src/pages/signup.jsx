import AuthContainer from "../components/authContainer";
import GlowBackground from "../components/glowBackground";
import InteractiveGridBackground from "../components/lightswind/interactive-grid-background.tsx";

export default function Signup() {
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
            name: "fullName",
            label: "Full Name",
            type: "text",
            placeholder: "Enter your full name",
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
      />
    </div>
  );
}