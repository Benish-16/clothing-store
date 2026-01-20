import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import VerifyOtp from "./VerifyOtp";
import ResetPassword from "./ResetPassword";
import Alert from "./Alert";

export default function ForgotPasswordFlow() {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

const [otpf, setOtpf] = useState(""); 

 
   return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {step === 1 && <ForgotPassword setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <VerifyOtp email={email} setStep={setStep}  setOtpf={setOtpf} />}
     {step === 3 && <ResetPassword email={email} otpf={otpf}   />}
    </div> 
  );
}