import AuthContainer from "../components/authContainer";
import GlowBackground from "../components/glowBackground";
import InteractiveGridBackground from "../components/lightswind/interactive-grid-background.tsx";

export default function Login() {
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
        heading={"Login"}
        defineText={"welcome to "}
        highlightText={"marketPlace"}
        buttonName={"Login"}
        anchorTagName={"Signup"}
        fields={[
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
            placeholder: "Enter your password",
          },
        ]}
      />
    </div>
  );
}