import { redirect } from "next/navigation"
import { getAdminSettings, updateUser } from "@/lib/api"
import AboutMeComponent from "@/components/AboutMeComponent"
import AddressComponent from "@/components/AddressComponent"
import BirthdateComponent from "@/components/BirthdateComponent"
import ProgressIndicator from "@/components/ProgressIndicator"

//const prisma = new PrismaClient()

//async function getAdminSettings() {
//  const settings = await prisma.adminSettings.findFirst()
//  return settings || { secondPageComponents: "aboutMe", thirdPageComponents: "address" }
//}

async function updateUserLocal(formData: FormData) {
  "use server"

  const step = formData.get("step") as string
  const userId = formData.get("userId") as string

  try {
    // Get admin settings to determine which components are on each page
    const adminSettings = await getAdminSettings()
    console.log('Admin Settings:', adminSettings)
    const secondPageComponents = adminSettings.secondPageComponents.split(',').filter(Boolean)
    const thirdPageComponents = adminSettings.thirdPageComponents.split(',').filter(Boolean)

    if (step === "2") {
      const updates: any = {}
      
      // Only update fields that are configured for this page
      if (secondPageComponents.includes('aboutMe')) {
        updates.aboutMe = formData.get("aboutMe") as string
      }
      if (secondPageComponents.includes('birthdate')) {
        const birthdate = formData.get("birthdate") as string
        updates.birthdate = birthdate ? new Date(birthdate).toISOString() : null
      }
      if (secondPageComponents.includes('address')) {
        updates.address = {
          street: formData.get("street") as string,
          city: formData.get("city") as string,
          state: formData.get("state") as string,
          zip: formData.get("zip") as string,
        }
      }

      await updateUser(userId, updates)
      redirect(`/onboarding/3?userId=${userId}`)
    } else if (step === "3") {
      const updates: any = {}
      
      // Only update fields that are configured for this page
      if (thirdPageComponents.includes('aboutMe')) {
        updates.aboutMe = formData.get("aboutMe") as string
      }
      if (thirdPageComponents.includes('birthdate')) {
        const birthdate = formData.get("birthdate") as string
        updates.birthdate = birthdate ? new Date(birthdate).toISOString() : null
      }
      if (thirdPageComponents.includes('address')) {
        updates.address = {
          street: formData.get("street") as string,
          city: formData.get("city") as string,
          state: formData.get("state") as string,
          zip: formData.get("zip") as string,
        }
      }

      await updateUser(userId, updates)
      redirect("/onboarding/complete")
    }
  } catch (error) {
    if ((error as any)?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    console.error("Error updating user:", error)
  }
}

export default async function OnboardingPage({
  params,
  searchParams,
}: {
  params: { step: string }
  searchParams: { userId: string }
}) {
  const { step } = params
  const { userId } = searchParams
  const adminSettings = await getAdminSettings()
  console.log('Admin Settings:', adminSettings)
  
  const currentPageComponents = step === "2" 
    ? adminSettings.secondPageComponents.split(',').filter(Boolean)
    : adminSettings.thirdPageComponents.split(',').filter(Boolean)

  console.log('Current Page Components:', currentPageComponents)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ProgressIndicator currentStep={parseInt(step)} />
      <h1 className="text-4xl font-bold mb-8">
        {step === "2" ? "Tell Us About Yourself" : "Almost Done!"}
      </h1>

      <form action={updateUserLocal} className="w-full max-w-md space-y-6">
        <input type="hidden" name="step" value={step} />
        <input type="hidden" name="userId" value={userId} />

        {currentPageComponents.map((component) => {
          switch(component.trim()) {
            case 'aboutMe':
              return <AboutMeComponent key="aboutMe" />
            case 'birthdate':
              return <BirthdateComponent key="birthdate" />
            case 'address':
              return <AddressComponent key="address" />
            default:
              return null
          }
        })}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {step === "2" ? "Next" : "Complete"}
        </button>
      </form>
    </main>
  )
}

