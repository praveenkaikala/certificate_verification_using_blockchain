"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Github, Linkedin } from "lucide-react"

const mentor = {
  name: "M.V.V.KRISHNA",
  role: "Project Mentor",
  designation: "Associate Professor - Computer Science",
  image: "/team/mentor.jpg",
  linkedin: "#",
}

const students = [
  {
    name: "Praveen Kumar Kaikala",
    role: "Full Stack & Smart Contract Developer",
    designation: "Student",
    image: "praveen.jpeg",
    github: "https://github.com/praveenkaikala",
    linkedin: "https://www.linkedin.com/in/praveenkaikala",
  },
  {
    name: "Ravi Kiran Valavala",
    role: "Backend Developer",
    designation: "Student",
    image: "vvk.jpeg",
    github: "https://www.linkedin.com/in/praveenkaikala",
    linkedin: "https://www.linkedin.com/in/praveenkaikala",
  },
  {
    name: "Hrishith Varma Vetukuri",
    role: "Frontend Developer",
    designation: "Student",
    image: "hrisith.jpeg",
    github: "#",
    linkedin: "https://www.linkedin.com/in/praveenkaikala",
  },
  {
    name: "Madhavan Mane",
    role: "UI & UX",
    designation: "Student",
    image: "mady.jpeg",
    github: "#",
    linkedin: "https://www.linkedin.com/in/praveenkaikala",
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10  py-3 px-4">

      <div className="max-w-6xl mx-auto py-3 space-y-3">

        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Our Team</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the people behind <span className="font-semibold">ForgeryShield</span>.
            Our team combines expertise in blockchain, full-stack development,
            and security to build a trusted certificate verification platform.
          </p>
        </div>

        {/* Mentor Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Project Mentor</h2>

          <div className="flex justify-center">
            <Card className="p-6 text-center max-w-sm hover:shadow-lg transition">

              <Image
                src={mentor.image}
                alt={mentor.name}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4 object-cover"
              />

              <h3 className="text-lg font-semibold">{mentor.name}</h3>
              <p className="text-primary font-medium">{mentor.role}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {mentor.designation}
              </p>

              <div className="flex justify-center gap-4 mt-4">
                <a href={mentor.linkedin} target="_blank">
                  <Linkedin className="h-5 w-5 hover:text-primary transition" />
                </a>
              </div>

            </Card>
          </div>
        </div>

        {/* Students Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Development Team</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {students.map((student, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition justify-between"
              >
     <div>

                <Image
                  src={student.image}
                  alt={student.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 object-cover"
                />

                <h3 className="font-semibold">{student.name}</h3>

                <p className="text-primary text-sm font-medium">
                  {student.role}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  {student.designation}
                </p>
     </div>

                <div className="flex justify-center gap-4 mt-4">

                  <a href={student.github} target="_blank">
                    <Github className="h-5 w-5 hover:text-primary transition" />
                  </a>

                  <a href={student.linkedin} target="_blank">
                    <Linkedin className="h-5 w-5 hover:text-primary transition" />
                  </a>

                </div>

              </Card>
            ))}

          </div>
        </div>

      </div>

    </div>
  )
}
