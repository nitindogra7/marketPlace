import { useRef, useState } from "react";
import { verifyOtp , resendOtp} from "../apis/auth.apis";
import { useNavigate } from "react-router-dom";
export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);

  function handleChange(value, index) {
    if (!/^\d*$/.test(value)) return;
    value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  }
  const Navigate = useNavigate();
  async function onSubmit(e) {
    try{
      e.preventDefault();
    let stringOtp = [...otp].join("");
    const id = localStorage.getItem("accessAccId");
    const res = await verifyOtp({ stringOtp, id });
    console.log(res.userData);
    localStorage.setItem("accessToken", res.userData.accessToken);
    setOtp(["", "", "", "", "", ""]);
    localStorage.removeItem("accessAccId");
    Navigate("/workspace");
    }catch(err){
      console.error(err.message || err)
    }
    
  }

  function moveBack(e, index) {
    if (e.key === "Backspace" && !otp[index]) {
      inputRef.current[index - 1]?.focus();
    }
  }

  async function resend(){
    try{
    const id = localStorage.getItem("accessAccId")
    const res = await resendOtp(id)
    console.log(res)
    }catch(err){
      console.err(err.message || err)
    }

  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="z-10 w-full max-w-md px-8 py-10"
      >
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-1 font-serif">Verify</h1>
          <p className="text-sm text-neutral-500 text-center font-inter">
            Enter OTP for{" "} 
            <span className="text-neutral-400 font-medium font-inter"> Sales Nova</span>
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8 font-inter">
          {otp.map((digit, index) => (
            <input
              ref={(el) => (inputRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              key={index}
              type="text"
              onKeyDown={(e) => moveBack(e, index)}
              maxLength={1}
              value={digit}
              className="w-10 h-12 md:w-14 md:h-16 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xl text-center outline-none focus:border-neutral-500 transition-all"
            />
          ))}
        </div>

        <div className="font-inter">
          <button
            type="submit"
            className="w-full font-inter bg-white hover:bg-neutral-100 text-black font-semibold py-3 rounded-lg text-sm transition-all duration-200"
          >
            Verify OTP
          </button>
          <p className="text-center text-xs text-neutral-500 mt-3">
            Didn't receive code?{" "}
            <button
            onClick={resend}
            type="button" className="text-neutral-300 hover:text-white font-medium transition">
              Resend
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}