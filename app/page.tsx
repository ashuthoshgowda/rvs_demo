'use client'

import { createUser, getAdminSettings } from "@/lib/api"
import { useRouter } from "next/navigation"
import ProgressIndicator from "@/components/ProgressIndicator"
import { useState } from "react"
// import { createUser } from "@/lib/api"

// const prisma = new PrismaClient()

export default function Home() {
  const router = useRouter()
  const [error, setError] = useState<string>("")

  async function handleSubmit(formData: FormData) {
    try {
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      
      const user = await createUser(email, password)
      const adminSettings = await getAdminSettings()
      
      // Check which components are on each page
      const secondPageComponents = adminSettings.secondPageComponents.split(',')
      const thirdPageComponents = adminSettings.thirdPageComponents.split(',')
      
      // Determine which page to redirect to based on missing info and admin settings
      if (user.missing_info.about_me && secondPageComponents.includes('aboutMe')) {
        router.push(`/onboarding/2?userId=${user.id}`)
      } else if (user.missing_info.birthdate && secondPageComponents.includes('birthdate')) {
        router.push(`/onboarding/2?userId=${user.id}`)
      } else if (user.missing_info.address && secondPageComponents.includes('address')) {
        router.push(`/onboarding/2?userId=${user.id}`)
      } else if (user.missing_info.about_me && thirdPageComponents.includes('aboutMe')) {
        router.push(`/onboarding/3?userId=${user.id}`)
      } else if (user.missing_info.birthdate && thirdPageComponents.includes('birthdate')) {
        router.push(`/onboarding/3?userId=${user.id}`)
      } else if (user.missing_info.address && thirdPageComponents.includes('address')) {
        router.push(`/onboarding/3?userId=${user.id}`)
      } else {
        router.push('/onboarding/complete')
      }
    } catch (error: any) {
      if (error?.message?.includes("400")) {
        setError("Invalid credentials. Please check your email and password.")
      } else {
        setError("An unexpected error occurred. Please try again later.")
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ProgressIndicator currentStep={1} />
      <h1 className="text-4xl font-bold mb-8">Welcome to User Onboarding</h1>
      
      {error && (
        <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </button>
      </form>
    </main>
  )
}

