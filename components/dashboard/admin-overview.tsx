"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, CheckCircle } from "lucide-react"
interface instituteBody
{
  _id:string;
  name:string;
  certificate_issue_count:number;
}
interface Certificates{
  topInstitutions:instituteBody[] | []
}
export function AdminOverview({topInstitutions}:Certificates) {
  const recentActivity = [
    { type: "certificate", label: "New certificate issued", institution: "Tech Academy", time: "2 hours ago" },
    { type: "institution", label: "New institution registered", institution: "Data Institute", time: "1 day ago" },
    { type: "alert", label: "High verification rate reached", institution: "98.7%", time: "3 days ago" },
    { type: "certificate", label: "Batch issuance completed", institution: "DevSchool", time: "5 days ago" },
  ]
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Activity */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
        {recentActivity.map((item, idx) => (
          <Card key={idx} className="bg-card border-border p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {item.type === "certificate" && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                {item.type === "institution" && <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />}
                {item.type === "alert" && <TrendingUp className="h-5 w-5 text-accent mt-0.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.institution}</p>
              </div>
              <p className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">{item.time}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Top Institutions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mb-4">Top Institutions</h2>
        <div className="space-y-3">
          {topInstitutions?.map((inst, idx) => (
            <Card
              key={inst._id}
              className="bg-card border-border p-4 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-foreground text-sm">{inst.name}</p>
                {/* <p className="text-xs text-green-500">{inst.growth}</p> */}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-full"
                    style={{ width: `${(inst.certificate_issue_count / 20) * 100}%` }}
                  />
                </div>
                <p className="text-xs font-mono text-muted-foreground">{inst.certificate_issue_count}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
