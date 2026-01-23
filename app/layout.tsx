import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/ScrollToTop"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ForgeryShield - Decentralized Solution for Authentic Academic Certificates",
  description: "Verify skills instantly with blockchain technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="skillchain-theme">
          <Navigation />
          <ScrollToTop>

          {children}
          </ScrollToTop>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
