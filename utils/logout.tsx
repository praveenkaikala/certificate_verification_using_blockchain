"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const logOut = () => {
    localStorage.removeItem("role")
    localStorage.removeItem("token")

    router.push("/")
  }

  return (
   <button
   onClick={logOut}
          className="flex items-center gap-3 px-2 py-3 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
  )
}
