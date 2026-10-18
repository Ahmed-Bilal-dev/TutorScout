import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
    const navigate = useNavigate()

    const [subject, setSubject] = useState('')
    const [city, setCity] = useState('')
    const [budget, setBudget] = useState('')
    const [mode, setMode] = useState('')

    const handleSearch = () => {
        const params = new URLSearchParams()

        if (subject.trim()) {
            params.set('subject', subject.trim())
        }

        if (city.trim()) {
            params.set('city', city.trim())
        }

        if (budget.trim()) {
            params.set('budget', budget.trim())
        }

        if (mode) {
            params.set('mode', mode)
        }

        const query = params.toString()

        navigate(query ? `/find-tutors?${query}` : '/find-tutors')
    }

    return (
        <section className="px-4 pb-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-2xl border border-green-600 bg-white p-5 shadow-lg sm:p-6">

                {/* Heading */}
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Find Your Perfect Tutor
                </h2>

                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    Search tutors by subject, location, and budget.
                </p>

                {/* Search Fields */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                    {/* Subject */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Subject
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Mathematics"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Location
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Karachi"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Budget
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Rs. 1500"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    {/* Learning Mode */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Learning Mode
                        </label>

                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        >
                            <option value="">Select mode</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline / Home</option>
                        </select>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Search Tutors
                        </button>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default SearchBar