"use client";
import { useState, useEffect, useTransition, FormEvent } from "react";
import { motion } from "framer-motion";
import { auth } from "../../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isPending, startTransition] = useTransition();

  
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = window.setTimeout(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
  
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  useEffect(()=>{
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size : "invisible",
      }
    );
    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    }
  },[auth]);

  useEffect(()=>{
    const hasEnteredAllDigits = otp.length ===6;
    if(hasEnteredAllDigits){
      verifyOTP();
    }
  }, [otp]);

  const verifyOTP = async () =>{
    startTransition(async () =>{
      setError("");
      if(!confirmationResult){
        setError("Please request OTP first.");
        return;
      }

      try {
        await confirmationResult?.confirm(otp);
        router.back();
       
      } catch (err) {
        console.log(err);
        setError("Failed to verify your OTP, check again then try.");
      }
    });
  };

  const requestOTP = async (e?: FormEvent<HTMLFormElement>)=>{
    e?.preventDefault();
    setResendCountdown(60);
    startTransition(async()=>{
      setError("");
      if(!recaptchaVerifier){
        return setError("Recaptcha verifier is not initialized.");
      }

      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier
        );
        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err : any) {
        console.log(err);
        setResendCountdown(0);
        if(err.code === "auth/invalid-phone-number"){
          setError("Invalid phone, check again.");
        }else if(err.code === "auth/too-many-requests"){
          setError("Too many requests, try again later.");
        }else{
          setError("OTP sending failed, try again.");
        }
      }
    });

  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
    {/* Left Branding Section */}
    <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-white">
      <motion.img
        src="/favicon.png" // Replace with your actual logo path
        alt="Golden Clove Logo"
        className="w-40 h-40"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.h1
        className="text-3xl font-bold text-gray-800 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Golden Clove
      </motion.h1>
      <p className="text-gray-600 mt-2 text-center px-6">
        Join our community for better experiences.
      </p>
    </div>

    {/* Right Login Section */}
    <div className="md:w-1/2 w-full flex justify-center items-center bg-white">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-300 mt-12"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Login</h2>

        {!confirmationResult && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="tel"
              placeholder="Enter phone number"
              className="w-full p-3 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Enter your phone number with country code.
            </p>
          </motion.div>
        )}

        {confirmationResult && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 mt-4 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </motion.div>
        )}

        <button
          disabled={!phoneNumber || isPending || resendCountdown > 0}
          onClick={()=>requestOTP()}
          className={`mt-5 w-full py-3 rounded-lg text-white font-bold transition-all duration-300 ${
            resendCountdown > 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {resendCountdown > 0
            ? `Resend OTP in ${resendCountdown}s`
            : isPending
            ? "Sending OTP..."
            : "Send OTP"}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}

        <div id="recaptcha-container" className="mt-4"></div>

        {isPending && <p className="text-yellow-500 text-center mt-2">Loading, please wait...</p>}
      </motion.div>
    </div>
  </div>
  );
}
