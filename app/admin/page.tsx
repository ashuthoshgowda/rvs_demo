'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminSettings, updateAdminSettings as apiUpdateAdminSettings } from "@/lib/api"
import { AdminSettingsResponse } from '@/types/api'

// const prisma = new PrismaClient()

// async function getAdminSettings() {
//   const settings = await prisma.adminSettings.findFirst()
//   return settings || { secondPageComponents: "aboutMe", thirdPageComponents: "address" }
// }

export default function AdminPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [settings, setSettings] = useState<AdminSettingsResponse>({
    secondPageComponents: "aboutMe",
    thirdPageComponents: "address"
  })

  useEffect(() => {
    getAdminSettings().then(setSettings).catch(setError)
  }, [])

  const components = {
    second: settings?.secondPageComponents?.split(',').filter(Boolean) || [],
    third: settings?.thirdPageComponents?.split(',').filter(Boolean) || []
  }

  async function handleSubmit(formData: FormData) {
    try {
      const secondPage = formData.getAll("secondPage")
      const thirdPage = formData.getAll("thirdPage")

      if (secondPage.length === 0 || thirdPage.length === 0) {
        setError("Each page must have at least one component")
        return
      }

      await apiUpdateAdminSettings({
        secondPageComponents: secondPage.join(","),
        thirdPageComponents: thirdPage.join(",")
      })

      router.push('/')
    } catch (error: any) {
      setError(error.message || "Failed to update settings")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Admin Settings</h1>
      
      {error && (
        <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      
      <form action={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Second Page Components</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="secondPage"
                value="aboutMe"
                defaultChecked={components.second.includes("aboutMe")}
                className="mr-2"
              />
              About Me
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="secondPage"
                value="address"
                defaultChecked={components.second.includes("address")}
                className="mr-2"
              />
              Address
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="secondPage"
                value="birthdate"
                defaultChecked={components.second.includes("birthdate")}
                className="mr-2"
              />
              Birthdate
            </label>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Third Page Components</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="thirdPage"
                value="aboutMe"
                defaultChecked={components.third.includes("aboutMe")}
                className="mr-2"
              />
              About Me
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="thirdPage"
                value="address"
                defaultChecked={components.third.includes("address")}
                className="mr-2"
              />
              Address
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="thirdPage"
                value="birthdate"
                defaultChecked={components.third.includes("birthdate")}
                className="mr-2"
              />
              Birthdate
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Settings
        </button>
      </form>
    </main>
  )
}

