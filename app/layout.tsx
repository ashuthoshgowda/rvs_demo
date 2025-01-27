import "./globals.css"
import { Inter } from "next/font/google"
import TestApiConnection from "@/components/TestApiConnection"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "User Onboarding App",
  description: "A simple user onboarding application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TestApiConnection />
        {children}
      </body>
    </html>
  )
}

