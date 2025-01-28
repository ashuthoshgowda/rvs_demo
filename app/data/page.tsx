'use client'

import { getUsers, deleteUser } from "@/lib/api"
import { UserDisplayResponse } from "@/types/api"
import { useState, useEffect } from "react"
import { TrashIcon } from '@heroicons/react/24/outline'

export default function DataPage() {
  const [users, setUsers] = useState<UserDisplayResponse[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error)
  }, [])

  function formatDate(date: Date | null | undefined) {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString()
  }

  async function handleDelete(userId: string) {
    try {
      await deleteUser(userId)
      setUsers(users.filter(user => user.id !== userId))
    } catch (error) {
      setError("Failed to delete user")
      console.error(error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">User Data</h1>
        
        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">About Me</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">Address</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">Birthdate</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.aboutMe || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.address
                          ? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.birthdate)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900 transition-colors p-2 rounded-full hover:bg-red-50"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 border-b">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}