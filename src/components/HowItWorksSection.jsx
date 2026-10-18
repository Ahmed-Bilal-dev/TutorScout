function HowItWorksSection() {
    return (
        <section id="how-it-works" className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="text-center">
                    <p className="font-semibold text-green-600">
                        SIMPLE & EASY
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                        How TutorScout Works
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Find the right tutor and start learning in just three simple steps.
                    </p>
                </div>

                {/* Steps */}
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">

                    {/* Step 1 */}
                    <div className="relative rounded-2xl border border-green-600 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-600">
                            01
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-gray-900">
                            Search for a Tutor
                        </h3>

                        <p className="mt-3 leading-7 text-gray-600">
                            Search tutors by subject, location, budget, and learning mode.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative rounded-2xl border border-green-600 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-600">
                            02
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-gray-900">
                            Compare Profiles
                        </h3>

                        <p className="mt-3 leading-7 text-gray-600">
                            Check tutor profiles, experience, ratings, reviews, and hourly fees.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative rounded-2xl border border-green-600 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-600">
                            03
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-gray-900">
                            Book a Session
                        </h3>

                        <p className="mt-3 leading-7 text-gray-600">
                            Choose your preferred tutor and request a session that works for you.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HowItWorksSection