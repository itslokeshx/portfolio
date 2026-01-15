import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Fira_Code, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Web developer building real-world web products with strong foundations in HTML, CSS and JavaScript and growing experience in backend systems.",
  keywords: ["MERN Stack", "Web Developer", "HTML", "CSS", "JavaScript", "React Developer", "Node.js", "MongoDB", "REST APIs", "GitHub", "Zoho Internship"],
  authors: [{ name: "Lokesh" }],
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${firaCode.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-void text-mist overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
