import { Link } from 'react-router-dom'

function TeachingModes() {
    return (
        <section id="teaching-modes" className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="text-center">
                    <p className="font-semibold text-green-600">
                        LEARN YOUR WAY
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Choose How You Want to Learn
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Whether you prefer learning from home or face-to-face,
                        TutorScout helps you find the right tutor.
                    </p>
                </div>

                {/* Teaching Modes */}
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">

                    {/* Online */}
                    <div className="rounded-3xl border border-green-600 bg-green-50 p-8 sm:p-10">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                            💻
                        </div>

                        <h3 className="mt-6 text-2xl font-bold text-gray-900">
                            Online Tutoring
                        </h3>

                        <p className="mt-4 leading-7 text-gray-600">
                            Learn from qualified tutors from the comfort of
                            your home through convenient online sessions.
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            <li>✓ Learn from anywhere</li>
                            <li>✓ Flexible learning schedule</li>
                            <li>✓ Connect with tutors online</li>
                        </ul>

                        <Link
                            to="/find-tutors?mode=online"
                            className="mt-8 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                        >
                            Find Online Tutors
                        </Link>
                    </div>

                    {/* Home */}
                    <div className="rounded-3xl border border-green-600 bg-white p-8 shadow-sm transition hover:shadow-lg sm:p-10">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
                            🏠
                        </div>

                        <h3 className="mt-6 text-2xl font-bold text-gray-900">
                            Home Tutoring
                        </h3>

                        <p className="mt-4 leading-7 text-gray-600">
                            Find tutors available in your area and arrange
                            convenient face-to-face learning sessions.
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            <li>✓ Face-to-face learning</li>
                            <li>✓ Find tutors near you</li>
                            <li>✓ Comfortable home sessions</li>
                        </ul>

                        <Link
                            to="/find-tutors?mode=home"
                            className="mt-8 inline-block rounded-xl border-2 border-green-600 px-6 py-3 font-semibold text-green-600 transition hover:bg-green-50"
                        >
                            Find Home Tutors
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default TeachingModes