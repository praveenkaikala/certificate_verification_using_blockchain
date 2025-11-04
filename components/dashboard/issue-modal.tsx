"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface IssueModalProps {
  onClose: () => void
}

export function IssueModal({ onClose }: IssueModalProps) {
  const [formData, setFormData] = useState({
    recipientName: "",
    studentId: "",
    recipientEmail: "",
    walletAddress: "",
    program: "",
    startDate: "",
    endDate: "",
    issueDate: new Date().toISOString().split("T")[0],
    issuerName: "",
    department: "",
    grade: "",
    certificateId: "",
    description: "",
    certificateFile: null as File | null,
  })

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, certificateFile: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
<Card className="bg-card border-border w-full max-w-2xl h-full sm:h-[90%] overflow-y-auto rounded-xl shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-xl font-bold">🎓 Issue New Certificate</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Recipient Info */}
          <section>
            <h3 className="text-lg font-semibold mb-3">👤 Recipient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Student ID / Roll No *</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                  placeholder="CSE2025-101"
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  name="recipientEmail"
                  value={formData.recipientEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Wallet Address *</label>
                <input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="0xAbCd1234..."
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* Course Info */}
          <section>
            <h3 className="text-lg font-semibold mb-3">📘 Course Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Program / Course *</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                >
                  <option value="">Select Program</option>
                  <option value="Web Development Bootcamp">Web Development Bootcamp</option>
                  <option value="Advanced Python Development">Advanced Python Development</option>
                  <option value="Data Science Fundamentals">Data Science Fundamentals</option>
                  <option value="Cloud Architecture">Cloud Architecture</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Certificate ID *</label>
                <input
                  type="text"
                  name="certificateId"
                  value={formData.certificateId}
                  onChange={handleInputChange}
                  required
                  placeholder="CERT-2025-XYZ01"
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Issue Date *</label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Grade / Score *</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                  placeholder="A+ / 92%"
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* Issuer Info */}
          <section>
            <h3 className="text-lg font-semibold mb-3">🏫 Issuer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Issuer Name *</label>
                <input
                  type="text"
                  name="issuerName"
                  value={formData.issuerName}
                  onChange={handleInputChange}
                  required
                  placeholder="Prof. R. Sharma"
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department *</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  placeholder="Computer Science"
                  className="w-full border border-border bg-background rounded-md px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* File Upload */}
          <section>
            <h3 className="text-lg font-semibold mb-3">📎 Certificate Upload</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Upload Certificate File (PDF / Image) *</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
                className="w-full border border-border bg-background rounded-md p-2"
              />
            </div>
          </section>

          {/* Description */}
          <section>
            <label className="block text-sm font-medium mb-1">Additional Remarks (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add any remarks or details about the certificate..."
              rows={3}
              className="w-full border border-border bg-background rounded-md px-3 py-2"
            />
          </section>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 sticky bottom-0 bg-card pb-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
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
