import { Suspense } from "react";
import OTPAuthClient from "./OtpClient";

export default function OTPPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OTPAuthClient />
    </Suspense>
  );
}
