"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface IssueModalProps {
  onClose: () => void
}

export function IssueModal({ onClose }: IssueModalProps) {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    program: "",
    issueDate: new Date().toISOString().split("T")[0],
    description: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle certificate issuance
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-card border-border max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Issue New Certificate</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Recipient Name</label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input
              type="email"
              name="recipientEmail"
              value={formData.recipientEmail}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Program/Course</label>
            <select
              name="program"
              value={formData.program}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select a program</option>
              <option value="Advanced Python Development">Advanced Python Development</option>
              <option value="Web Development Bootcamp">Web Development Bootcamp</option>
              <option value="Data Science Fundamentals">Data Science Fundamentals</option>
              <option value="Cloud Architecture">Cloud Architecture</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add any additional details about the certificate..."
              rows={3}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Issue Certificate
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
