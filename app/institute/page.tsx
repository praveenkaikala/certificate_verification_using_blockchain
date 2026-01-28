"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Award, TrendingUp, Users, CheckCircle } from "lucide-react"
import { InstituteDashboard } from "@/components/dashboard/institute-dashboard"
import { IssueModal } from "@/components/dashboard/issue-modal"

export default function IssuePage() {
  const [showIssueModal, setShowIssueModal] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Institute Dashboard</h1>
            <p className="text-muted-foreground">Manage and issue blockchain certificates</p>
          </div>
          <Button onClick={() => setShowIssueModal(true)} className="gap-2 bg-primary hover:bg-primary/90" size="lg">
            <Plus className="h-5 w-5" />
            Issue Certificate
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Issued</p>
                <p className="text-2xl font-bold">2,458</p>
              </div>
              <Award className="h-8 w-8 text-primary opacity-20" />
            </div>
          </Card>
          <Card className="bg-card border-border p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">This Month</p>
                <p className="text-2xl font-bold">342</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent opacity-20" />
            </div>
          </Card>
          <Card className="bg-card border-border p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Verified</p>
                <p className="text-2xl font-bold">2,401</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-20" />
            </div>
          </Card>
          <Card className="bg-card border-border p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Students</p>
                <p className="text-2xl font-bold">1,847</p>
              </div>
              <Users className="h-8 w-8 text-accent opacity-20" />
            </div>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <InstituteDashboard />
      </div>

      {/* Issue Modal */}
      {showIssueModal && <IssueModal onClose={() => setShowIssueModal(false)} />}
    </main>
  )
}
