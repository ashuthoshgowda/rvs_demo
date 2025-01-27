export default function AboutMeComponent() {
  return (
    <div>
      <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">
        About Me
      </label>
      <textarea
        id="aboutMe"
        name="aboutMe"
        rows={4}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
  )
}

