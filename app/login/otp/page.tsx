"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import axiosApi from "@/utils/axios";
import { endPoints } from "@/utils/publicUrls";

export default function OTPAuthPage() {
  const router = useRouter();

  const [step, setStep] = useState<"enter" | "verify">("verify");
  const searchParams = useSearchParams()
  const email = searchParams.get("email");
const role = searchParams.get("role");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* --------------------------------------------------
     🔐 ROUTE GUARD (only allow from login)
  -------------------------------------------------- */
  useEffect(() => {
    const allowed = localStorage.getItem("otp_allowed");
    const storedEmail = localStorage.getItem("otp_email");

    if (!allowed || !storedEmail) {
      router.replace("/login");
      return;
    }
    setStep("verify");
  }, [router]);

  /* --------------------------------------------------
     📤 RESEND OTP
  -------------------------------------------------- */
  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://certificate-verification-backend.vercel.app/api/v1/auth/verify/otp",
        { email }
      );
      alert("OTP sent successfully");
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------------------------
     🔢 OTP INPUT HANDLING
  -------------------------------------------------- */
  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* --------------------------------------------------
     ✅ VERIFY OTP
  -------------------------------------------------- */
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      alert("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosApi(
       {
        ...endPoints.auth.verifyOtp,
        data:{
          email,
          role,
          otp: enteredOtp,
        }
       }
      );

      // example: token returned
      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("otp_allowed");
      localStorage.removeItem("otp_email");

      router.push(`/${role}`);
    } catch (err: any) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 shadow-md border border-border rounded-xl">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Verify OTP
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el:any) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/60"
              />
            ))}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> Verifying...
              </span>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" /> Verify OTP
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={handleSendOTP}
              className="text-primary hover:underline font-medium"
            >
              Resend OTP
            </button>
          </p>
        </form>
      </Card>
    </div>
  );
}
