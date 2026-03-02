"use client"
import { Card } from "@/components/ui/card"
import { Award } from "lucide-react"
import { StudentCertificates } from "@/components/dashboard/student-certificates"
import axiosApi from "@/utils/axios"
import { endPoints } from "@/utils/publicUrls"
import { useEffect, useState } from "react"
import LogoutButton from "@/utils/logout"

export default function StudentPage() {
  const [certificates,setCertificates]=useState([]);
  const [totalCertificate,setTotalCertificate]=useState(0);
  const [studentDetails,setStudentDetails]=useState({
        name: "",
        email:"",
        institute:"",
        enrolled:"",
        verified:true,
  })
  useEffect(()=>{
    fetchDetails()
  },[])
 const fetchDetails=async()=>{
  try {
    const resp=await axiosApi({
      ...endPoints.student.stats
    })
    setCertificates(resp?.data?.data || []);
    setTotalCertificate(resp?.data?.totalCertificates || 0);
    setStudentDetails(resp?.data?.student)

  } catch (error) {
    console.log(error)
  }
 }
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="mb-8">

          <h1 className="text-3xl font-bold text-foreground mb-2">My Certificates</h1>
          <p className="text-muted-foreground">View and manage your blockchain-verified credentials</p>
          </div>
          <LogoutButton/>
        </div>

        {/* Student Info Card */}
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-border p-6 mb-8">
  <div className="flex items-start justify-between">
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">
        {studentDetails.name}
      </h2>

      <p className="text-muted-foreground mb-1">
        {studentDetails.email}
      </p>

      {/* 🏫 Institute Name */}
      <p className="text-sm text-muted-foreground mb-1">
        Institute:{" "}
        <span className="font-bold text-foreground">
          {studentDetails.institute.toUpperCase()}
        </span>
      </p>

      <p className="text-sm text-muted-foreground">
        Member since{" "}
        {new Date(studentDetails.enrolled).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>

    <Card className="border-border p-4 w-50">
      <p className="text-muted-foreground text-sm mb-1">
        Total Certificates
      </p>
      <p className="text-3xl font-bold">
        {totalCertificate}
      </p>
    </Card>
  </div>
</Card>


        {/* Certificates Display */}
        <StudentCertificates certificates={certificates}/>
      </div>
    </main>
  )
}
