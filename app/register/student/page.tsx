"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
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
import { ArrowLeft, Mail, Lock, User, GraduationCap, Loader2 } from "lucide-react";
import axiosApi from "@/utils/axios";
import { endPoints } from "@/utils/publicUrls";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function StudentRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  // ✅ form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone:"",
    reg_no: "",
    instituteId:"",
    password: "",
  });
const router=useRouter()
  // ✅ handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ submit logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axiosApi(
      {
        ...endPoints.auth.studentRegister,
        data:{
          name: formData.fullName,
          email: formData.email,
          phone:formData.phone,
          instituteId:formData.instituteId,
          reg_no: formData.reg_no,
          password: formData.password,
        },
      }
      );
      toast.success("Registation Success")
     router.push("/")
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4 py-8">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <Link
          href="/register"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Registration
        </Link>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Student Registration</CardTitle>
            <CardDescription>
              Register to receive and manage blockchain-verified certificates
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@college.edu"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
               <div className="space-y-2">
                <Label>Phone</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Roll Number */}
              <div className="space-y-2">
                <Label>Roll / Registration Number</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="reg_no"
                    value={formData.reg_no}
                    onChange={handleChange}
                    placeholder="23B95A"
                    className="pl-10"
                    required
                  />
                </div>
                </div>
                 <div className="space-y-2">
                <Label>Institute Registration Number</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="instituteId"
                    value={formData.instituteId}
                    onChange={handleChange}
                    placeholder="SRKREC"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Wallet */}
              {/* <div className="space-y-2">
                <Label>Wallet Address (optional)</Label>
                <Input
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  placeholder="0xABC123..."
                />
              </div> */}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already registered?{" "}
              <Link
                href="/login/student"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
