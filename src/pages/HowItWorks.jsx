import Footer from "../components/Footer"

function HowItWorks() {
    return (
        <>
        <main className="bg-gray-50">

            {/* Page Header */}
            <section className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8">

                    <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                        HOW IT WORKS
                    </p>

                    <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
                        Find. Connect. Learn.
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                        TutorScout makes it simple to find the right tutor,
                        connect with them, and start learning with confidence.
                    </p>

                </div>
            </section>

            {/* Steps */}
            <section className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

                        {/* Step 1 */}
                        <div className="rounded-2xl border border-green-600 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl font-bold text-green-600">
                                1
                            </div>

                            <h2 className="mt-6 text-xl font-bold text-gray-900">
                                Search for a Tutor
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Search tutors by subject, location, budget,
                                and teaching mode to find tutors that match
                                your learning needs.
                            </p>

                        </div>

                        {/* Step 2 */}
                        <div className="rounded-2xl border border-green-600 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl font-bold text-green-600">
                                2
                            </div>

                            <h2 className="mt-6 text-xl font-bold text-gray-900">
                                View Tutor Profile
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Check the tutor's subject, experience,
                                qualification, fee, location, teaching mode,
                                ratings, and reviews.
                            </p>

                        </div>

                        {/* Step 3 */}
                        <div className="rounded-2xl border border-green-600 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl font-bold text-green-600">
                                3
                            </div>

                            <h2 className="mt-6 text-xl font-bold text-gray-900">
                                Connect & Start Learning
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Connect with your selected tutor, discuss
                                your learning requirements, and start your
                                learning journey.
                            </p>

                        </div>

                    </div>

                </div>
            </section>

            {/* For Students / Tutors */}
            <section className="px-4 pb-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">

                    {/* Students */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl">
                            🎓
                        </div>

                        <h2 className="mt-5 text-2xl font-bold text-gray-900">
                            For Students
                        </h2>

                        <ul className="mt-5 space-y-4 text-sm text-gray-600">

                            <li className="flex gap-3">
                                <span className="font-bold text-green-600">
                                    ✓
                                </span>
                                Search for tutors according to your needs.
                            </li>

                            <li className="flex gap-3">
                                <span className="font-bold text-green-600">
                                    ✓
                                </span>
                                Compare tutor profiles, fees and experience.
                            </li>

                            <li className="flex gap-3">
                                <span className="font-bold text-green-600">
                                    ✓
                                </span>
                                Choose online or home learning.
                            </li>

                            <li className="flex gap-3">
                                <span className="font-bold text-green-600">
                                    ✓
                                </span>
                                Connect with the tutor and start learning.
                            </li>

                        </ul>

                    </div>

                    {/* Tutors */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl">
                            👨‍🏫
                        </div>

                        <h2 className="mt-5 text-2xl font-bold text-gray-900">
                            For Tutors
                        </h2>

                        <ul className="mt-5 space-y-4 text-sm text-gray-600">

                            <li className="flex gap-3">
                                <span className="font-bold text-green-600">
                                    ✓
                                </span>
                                Create your professional tutor profile.
                            </li>

                            <li className="flex gap-3">
                                <span className="font-bold text-green-600">
                                    ✓
                                </span>
                                Add your subjects, qualification and experience.
                            </li>

                            <li className="flex gap-3">
                                <span className="font-bold text-green-600">
                                    ✓
                                </span>
                                Set your teaching mode and hourly fee.
                            </li>

                            <li className="flex gap-3">
                                <span className="font-bold text-green-600">
                                    ✓
                                </span>
                                Connect with students looking for tutors.
                            </li>

                        </ul>

                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="px-4 pb-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-green-600 px-6 py-12 text-center sm:px-10">

                    <h2 className="text-3xl font-bold text-white">
                        Ready to Start Learning?
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-green-50 sm:text-base">
                        Find a tutor that matches your needs and take the next
                        step in your learning journey.
                    </p>

                    <a
                        href="/find-tutors"
                        className="mt-6 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-green-600 transition hover:bg-gray-100"
                    >
                        Find a Tutor
                    </a>

                </div>
            </section>

        </main>

        <Footer />
        </>
    )
}

export default HowItWorks