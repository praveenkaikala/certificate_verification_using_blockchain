"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, Building2, Loader2 } from "lucide-react";

export default function InstituteRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4 py-8">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <Link
          href="/login"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Institute Registration</CardTitle>
            <CardDescription>
              Apply to issue blockchain-based academic certificates
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Institute Name */}
              <div className="space-y-2">
                <Label>Institute Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="ABC Institute of Technology" className="pl-10" required />
                </div>
              </div>

              {/* Official Email */}
              <div className="space-y-2">
                <Label>Official Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="admin@institute.edu" className="pl-10" required />
                </div>
              </div>

              {/* Registration Number */}
              <div className="space-y-2">
                <Label>Institute Registration Number</Label>
                <Input placeholder="INST-REG-2026" required />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="••••••••" className="pl-10" required />
                </div>
              </div>

              {/* Wallet */}
              <div className="space-y-2">
                <Label>Institute Wallet Address</Label>
                <Input placeholder="0xDEF456..." required />
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting request...
                  </>
                ) : (
                  "Register Institute"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already approved?{" "}
              <Link href="/login/institute" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
