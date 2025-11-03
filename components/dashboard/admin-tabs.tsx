"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, Edit, Trash2, CheckCircle, BarChart3 } from "lucide-react"

interface AdminTabsProps {
  activeTab: string
}

export function AdminTabs({ activeTab }: AdminTabsProps) {
  const institutions = [
    { id: 1, name: "Tech Academy", email: "admin@techacademy.com", status: "active", certificates: 2847 },
    { id: 2, name: "DevSchool Institute", email: "hello@devschool.io", status: "active", certificates: 1923 },
    { id: 3, name: "Data Institute", email: "contact@datainst.com", status: "active", certificates: 1456 },
    { id: 4, name: "Cloud Academy", email: "info@cloudacademy.edu", status: "inactive", certificates: 987 },
  ]

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Student",
      institution: "Tech Academy",
      joined: "2024-06-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@techacademy.com",
      role: "Admin",
      institution: "Tech Academy",
      joined: "2024-05-20",
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex@devschool.io",
      role: "Admin",
      institution: "DevSchool",
      joined: "2024-04-10",
    },
  ]

  if (activeTab === "institutions") {
    return (
      <div className="space-y-4">
        <Card className="bg-card border-border p-4">
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search institutions..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </Card>

        <Card className="bg-card border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Institution</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Certificates</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {institutions.map((inst) => (
                <tr key={inst.id} className="hover:bg-background/50">
                  <td className="px-6 py-4 font-medium text-foreground">{inst.name}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{inst.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        inst.status === "active" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-500"
                      }`}
                    >
                      <CheckCircle className="h-3 w-3" />
                      {inst.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground">{inst.certificates}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    )
  }

  if (activeTab === "users") {
    return (
      <div className="space-y-4">
        <Card className="bg-card border-border p-4">
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </Card>

        <Card className="bg-card border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Institution</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Joined</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-background/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </td>
                  <td className="px-6 py-4 text-foreground">{user.role}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{user.institution}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{user.joined}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    )
  }

  if (activeTab === "reports") {
    return (
      <Card className="bg-card border-border p-8 text-center">
        <BarChart3 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground">Analytics and reports coming soon</p>
      </Card>
    )
  }

  if (activeTab === "settings") {
    return (
      <Card className="bg-card border-border p-8">
        <h3 className="text-xl font-bold text-foreground mb-4">Admin Settings</h3>
        <div className="space-y-4">
          <div className="pb-4 border-b border-border">
            <label className="flex items-center justify-between">
              <span className="text-foreground font-medium">Enable email notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
          </div>
          <div className="pb-4 border-b border-border">
            <label className="flex items-center justify-between">
              <span className="text-foreground font-medium">Enable blockchain logging</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
          </div>
          <div className="pt-4">
            <Button className="bg-primary hover:bg-primary/90">Save Settings</Button>
          </div>
        </div>
      </Card>
    )
  }

  return null
}
