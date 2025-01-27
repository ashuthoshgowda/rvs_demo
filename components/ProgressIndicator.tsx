export default function ProgressIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Profile" },
    { number: 3, label: "Details" },
    { number: 4, label: "Complete" }
  ]

  return (
    <div className="mb-8">
      <div className="flex justify-center items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex flex-col items-center`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.number <= currentStep
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.number}
              </div>
              <span
                className={`text-sm mt-1 ${
                  step.number <= currentStep ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-12 mx-2 ${
                  step.number < currentStep ? "bg-indigo-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
