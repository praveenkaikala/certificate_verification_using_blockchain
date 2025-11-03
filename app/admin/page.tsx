"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { AdminOverview } from "@/components/dashboard/admin-overview"
import { AdminTabs } from "@/components/dashboard/admin-tabs"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform activity and manage institutions</p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-card border-border p-4 hover:border-primary/50 transition-colors">
            <p className="text-muted-foreground text-xs mb-1">Total Certificates</p>
            <p className="text-3xl font-bold">12,847</p>
            <p className="text-xs text-green-500 mt-1">+12% this month</p>
          </Card>
          <Card className="bg-card border-border p-4 hover:border-primary/50 transition-colors">
            <p className="text-muted-foreground text-xs mb-1">Active Institutions</p>
            <p className="text-3xl font-bold">47</p>
            <p className="text-xs text-green-500 mt-1">+3 new this month</p>
          </Card>
          <Card className="bg-card border-border p-4 hover:border-primary/50 transition-colors">
            <p className="text-muted-foreground text-xs mb-1">Registered Students</p>
            <p className="text-3xl font-bold">28,392</p>
            <p className="text-xs text-green-500 mt-1">+5.2% growth</p>
          </Card>
          <Card className="bg-card border-border p-4 hover:border-primary/50 transition-colors">
            <p className="text-muted-foreground text-xs mb-1">Verification Rate</p>
            <p className="text-3xl font-bold">98.7%</p>
            <p className="text-xs text-green-500 mt-1">Excellent</p>
          </Card>
          <Card className="bg-card border-border p-4 hover:border-primary/50 transition-colors">
            <p className="text-muted-foreground text-xs mb-1">System Health</p>
            <p className="text-3xl font-bold text-green-500">Healthy</p>
            <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {[
            { id: "overview", label: "Overview" },
            { id: "institutions", label: "Institutions" },
            { id: "users", label: "Users" },
            { id: "reports", label: "Reports" },
            { id: "settings", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <AdminOverview />}
        {activeTab !== "overview" && <AdminTabs activeTab={activeTab} />}
      </div>
    </main>
  )
}
