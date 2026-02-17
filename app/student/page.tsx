"use client"
import { Card } from "@/components/ui/card"
import { Award } from "lucide-react"
import { StudentCertificates } from "@/components/dashboard/student-certificates"

export default function StudentPage() {
  const studentInfo = {
    name: "John Doe",
    email: "john@example.com",
    enrolledDate: "2024-06-15",
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Certificates</h1>
          <p className="text-muted-foreground">View and manage your blockchain-verified credentials</p>
        </div>

        {/* Student Info Card */}
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-border p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{studentInfo.name}</h2>
              <p className="text-muted-foreground mb-3">{studentInfo.email}</p>
              <p className="text-sm text-muted-foreground">Member since {studentInfo.enrolledDate}</p>
            </div>
             <Card className=" border-border p-4 w-50 ">
          <p className="text-muted-foreground text-sm mb-1">Total Certificates</p>
          <p className="text-3xl font-bold">{"3"}</p>
        </Card>
            {/* <Award className="h-12 w-12 text-primary opacity-20" /> */}
          </div>
        </Card>

        {/* Certificates Display */}
        <StudentCertificates />
      </div>
    </main>
  )
}
