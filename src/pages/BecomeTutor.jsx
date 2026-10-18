import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import { useAuth } from "../context/AuthContext"

function BecomeTutor() {
    const { user, userData, loading } = useAuth()

    return (
        <>
            <main className="bg-gray-50">

                {/* Page Header */}
                <section className="border-b border-gray-100 bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8">

                        <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                            BECOME A TUTOR
                        </p>

                        <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
                            Share Your Knowledge.
                            <span className="block text-green-600">
                                Teach With TutorScout.
                            </span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                            Create your tutor profile, connect with students, and
                            start teaching online or from the comfort of your home.
                        </p>

                    </div>
                </section>


                {/* Main Content */}
                <section className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl">

                        <div className="rounded-2xl border border-green-600 bg-white p-6 shadow-sm sm:p-8 lg:p-10">

                            {/* Heading */}
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                    Start Your Teaching Journey
                                </h2>

                                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                                    TutorScout helps you create your professional
                                    tutor profile, receive student booking requests,
                                    and connect with students looking for your
                                    expertise.
                                </p>
                            </div>


                            {/* Benefits */}
                            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                                <div className="rounded-xl border border-green-600 p-5">
                                    <h3 className="font-semibold text-gray-900">
                                        Create Your Profile
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Add your subjects, qualification,
                                        experience, fee and teaching details.
                                    </p>
                                </div>


                                <div className="rounded-xl border border-green-600 p-5">
                                    <h3 className="font-semibold text-gray-900">
                                        Reach Students
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Let students discover your profile and
                                        learn more about your teaching skills.
                                    </p>
                                </div>


                                <div className="rounded-xl border border-green-600 p-5">
                                    <h3 className="font-semibold text-gray-900">
                                        Receive Bookings
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Manage student booking requests directly
                                        from your tutor dashboard.
                                    </p>
                                </div>


                                <div className="rounded-xl border border-green-600 p-5">
                                    <h3 className="font-semibold text-gray-900">
                                        Teach Your Way
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Offer online or home teaching according
                                        to your preferred teaching mode.
                                    </p>
                                </div>

                            </div>


                            {/* Action Area */}
                            <div className="mt-10 border-t border-gray-100 pt-8 text-center">

                                {loading ? (
                                    <div className="h-11"></div>
                                ) : user ? (

                                    userData?.role === "tutor" ? (

                                        <>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Ready to manage your tutor profile?
                                            </h3>

                                            <p className="mt-2 text-sm text-gray-600">
                                                Update your profile and manage your
                                                student bookings from your dashboard.
                                            </p>

                                            <Link
                                                to="/tutor-dashboard"
                                                className="mt-5 inline-block rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Go to Tutor Dashboard
                                            </Link>
                                        </>

                                    ) : (

                                        <>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Want to become a tutor?
                                            </h3>

                                            <p className="mt-2 text-sm text-gray-600">
                                                Create a tutor account to start
                                                building your teaching profile.
                                            </p>

                                            <Link
                                                to="/signup"
                                                className="mt-5 inline-block rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Create Tutor Account
                                            </Link>
                                        </>

                                    )

                                ) : (

                                    <>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Ready to Start Teaching?
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-600">
                                            Create your TutorScout account and
                                            select <span className="font-semibold text-green-600">Tutor </span>
                                            during signup.
                                        </p>

                                        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">

                                            <Link
                                                to="/signup"
                                                className="rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Create Tutor Account
                                            </Link>

                                            <Link
                                                to="/login"
                                                className="rounded-xl border border-green-600 bg-white px-6 py-3.5 text-sm font-semibold text-green-600 transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Login
                                            </Link>

                                        </div>
                                    </>

                                )}

                            </div>

                        </div>

                    </div>
                </section>

            </main>

            <Footer />
        </>
    )
}

export default BecomeTutor
