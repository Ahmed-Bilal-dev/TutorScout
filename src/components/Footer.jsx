import { Link } from 'react-router-dom'

function Footer() {

    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-green-100 bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-green-600">
                            TutorScout
                        </h2>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
                            Find the right tutor for your learning journey.
                            Connect with tutors for online and face-to-face
                            learning.
                        </p>
                    </div>


                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-gray-900">
                            Quick Links
                        </h3>

                        <div className="mt-4 space-y-2.5">

                            <Link
                                to="/"
                                className="block text-sm text-gray-600 transition hover:text-green-600"
                            >
                                Home
                            </Link>

                            <Link
                                to="/find-tutors"
                                className="block text-sm text-gray-600 transition hover:text-green-600"
                            >
                                Find Tutors
                            </Link>

                            <Link
                                to="/become-tutor"
                                className="block text-sm text-gray-600 transition hover:text-green-600"
                            >
                                Become a Tutor
                            </Link>

                            <Link
                                to="/how-it-works"
                                className="block text-sm text-gray-600 transition hover:text-green-600"
                            >
                                How It Works
                            </Link>

                        </div>
                    </div>


                    {/* Explore */}
                    <div>
                        <h3 className="font-bold text-gray-900">
                            Explore
                        </h3>

                        <div className="mt-4 space-y-2.5">

                            <Link
                                to="/#popular-subjects"
                                className="block text-sm text-gray-600 transition hover:text-green-600"
                            >
                                Popular Subjects
                            </Link>

                            <Link
                                to="/#top-tutors"
                                className="block text-sm text-gray-600 transition hover:text-green-600"
                            >
                                Top Tutors
                            </Link>

                            <Link
                                to="/#how-it-works"
                                className="block text-sm text-gray-600 transition hover:text-green-600"
                            >
                                How It Works
                            </Link>

                            <Link
                                to="/#teaching-modes"
                                className="block text-sm text-gray-600 transition hover:text-green-600"
                            >
                                Teaching Modes
                            </Link>

                            <Link
                                to="/#testimonials"
                                className="block text-sm text-gray-600 transition hover:text-green-600"
                            >
                                What Our Students Say
                            </Link>

                        </div>
                    </div>


                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-gray-900">
                            Contact & Support
                        </h3>

                        <div className="mt-4 space-y-2.5 text-sm text-gray-600">

                            <p>
                                📍 Karachi, Pakistan
                            </p>

                            <a
                                href="mailto:support@tutorscout.com"
                                className="block transition hover:text-green-600"
                            >
                                ✉️ support@tutorscout.com
                            </a>

                            <p>
                                📞 +92 312 2446083
                            </p>

                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/923122446083?text=Hello%20TutorScout%20Support%2C%20I%20need%20help."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-green-600 px-3.5 py-2 font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path d="M20.52 3.48A11.79 11.79 0 0 0 12.05.02C5.54.02.25 5.3.25 11.82c0 2.08.54 4.12 1.57 5.91L.15 23.98l6.4-1.68a11.78 11.78 0 0 0 5.5 1.36h.01c6.51 0 11.79-5.29 11.79-11.8 0-3.15-1.23-6.12-3.33-8.38ZM12.06 21.7h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.8 1 1.01-3.7-.23-.38a9.82 9.82 0 0 1-1.51-5.22c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.03 6.96 2.89a9.79 9.79 0 0 1 2.88 6.97c0 5.42-4.41 9.83-9.82 9.83Zm5.39-7.36c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.19.29-.75.95-.92 1.14-.17.2-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.47-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.3-.49.1-.19.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.19 0-.49.07-.75.36-.26.29-.98.96-.98 2.35s1 2.73 1.14 2.92c.15.2 1.97 3.01 4.77 4.22.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.72-.7 1.96-1.38.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34Z" />
                                </svg>



                                WhatsApp Support
                            </a>

                        </div>
                    </div>

                </div>


                {/* Team / Copyright */}
                <div className="mt-8 border-t border-gray-200 pt-5 text-center">

                    <p className="text-sm font-semibold text-green-600">
                        TutorScout Team
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        Hafiz Ahmed Bilal • Muhammad Uzaif • Shahzaib Baloch
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        FYP Project • Batch 19 • FUUAST Glushan
                    </p>

                    <p className="mt-3 text-xs text-gray-400">
                        © {currentYear} TutorScout. All rights reserved.
                    </p>

                </div>

            </div>

        </footer>
    )
}

export default Footer

