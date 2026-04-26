import { useState } from "react";
import InputBar from "./inputBar";
import { CircleUser } from "lucide-react";

export default function AuthContainer({
  heading,
  defineText,
  highlightText,
  buttonName,
  anchorTagName,
  fields,
  onSubmitAction
}) {
  const [input, setInput] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmitAction(input)
    console.log(input);
    setInput({});
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="px-8 z-30 py-10 w-85 absolute bg-white/5 md:w-full backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl shadow-black/80 md:max-w-md">
      <div className="mb-6">
        <div className="flex w-full justify-center items-center gap-2 mb-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white">{heading}</h1>
          <CircleUser size={28} className="text-amber-300 mt-0.5" />
        </div>
        <p className="text-sm text-neutral-500 text-center tracking-wide">
          {defineText}
          <span className="text-amber-300 font-medium">{highlightText}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        {fields.map((field, index) => (
          <div key={index} className="w-full">
            <label className="block text-xs font-medium mb-1.5 mt-4 ml-1 text-neutral-400 tracking-wider uppercase">
              {field.label}
            </label>
            <InputBar
              type={field.type}
              placeholder={field.placeholder}
              onChange={handleChange}
              name={field.name}
              value={input[field.name] || ""}
            />
          </div>
        ))}

        <div className="flex flex-col items-center gap-3 mt-7">
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-400/20 text-sm font-semibold py-3 rounded-md w-full text-neutral-800 tracking-wide"
          >
            {buttonName}
          </button>

          <div className="text-xs text-neutral-500 flex gap-1.5 pt-1">
            <p>
              {heading === "Login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <a className="text-amber-400 cursor-pointer hover:text-amber-300 hover:underline transition-colors duration-200">
              {anchorTagName}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}