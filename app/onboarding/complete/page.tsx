import Link from "next/link"
import ProgressIndicator from "@/components/ProgressIndicator"

export default function CompletePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ProgressIndicator currentStep={4} />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🎉 Onboarding Complete!</h1>
        <p className="text-gray-600 mb-8">Thank you for completing the onboarding process.</p>
        <Link
          href="/"
          className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Return to Home
        </Link>
      </div>
    </main>
  )
}
