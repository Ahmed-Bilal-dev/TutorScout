function WhyChooseUs() {
    return (
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="text-center">
                    <p className="font-semibold text-green-600">
                        WHY TUTORSCOUT
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Why Choose TutorScout?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Everything you need to find a trusted tutor and enjoy a better learning experience.
                    </p>
                </div>

                {/* Benefits */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Benefit 1 */}
                    <div className="rounded-2xl border border-green-600 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl">
                            ✓
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-gray-900">
                            Verified Tutors
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Discover tutors with verified profiles and relevant teaching experience.
                        </p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="rounded-2xl border border-green-600 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl">
                            ⭐
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-gray-900">
                            Ratings & Reviews
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Compare ratings and student reviews before choosing your tutor.
                        </p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="rounded-2xl border border-green-600 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl">
                            Rs
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-gray-900">
                            Transparent Fees
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            See tutor fees clearly and choose an option that fits your budget.
                        </p>
                    </div>

                    {/* Benefit 4 */}
                    <div className="rounded-2xl border border-green-600 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl">
                            🌐
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-gray-900">
                            Online & Home
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Choose online learning or find a tutor for convenient home tutoring.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs