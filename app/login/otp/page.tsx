"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock } from "lucide-react"

export default function OTPAuthPage() {
  const [step, setStep] = useState<"enter" | "verify">("verify")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Send OTP simulation
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return alert("Please enter your email.")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep("verify")
      inputRefs.current[0]?.focus()
    }, 1500)
  }

  // Handle OTP input (numbers only + auto-focus)
  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return // only digits
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto move to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle backspace navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Simulate OTP verify
  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault()
    const enteredOtp = otp.join("")
    if (enteredOtp.length !== 6) {
      alert("Please enter all 6 digits.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
     window.location.href='/student'
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 shadow-md border border-border rounded-xl">
        <h2 className="text-2xl font-semibold text-center mb-2">
          {step === "enter" ? "OTP Authentication" : "Verify OTP"}
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          {step === "enter"
            ? "Enter your registered email to receive an OTP."
            : "Enter the 6-digit code sent to your email."}
        </p>

        {step === "enter" ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" /> Sending...
                </span>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
        ) : (
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

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
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
        )}
      </Card>
    </div>
  )
}
