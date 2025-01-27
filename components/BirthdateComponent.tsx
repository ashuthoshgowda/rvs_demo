export default function BirthdateComponent() {
  return (
    <div>
      <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
        Birthdate
      </label>
      <input
        type="date"
        id="birthdate"
        name="birthdate"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
  )
}

