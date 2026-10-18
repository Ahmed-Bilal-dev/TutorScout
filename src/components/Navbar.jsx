import { useState } from 'react'
import logo from '../assets/TutorScoutLogo.webp'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    const { user, userData, loading, logout } = useAuth()

    const dashboardRoute =
        userData?.role === 'tutor'
            ? '/tutor-dashboard'
            : userData?.role === 'admin'
                ? '/admin-dashboard'
                : '/student-dashboard'

    return (
        <nav className="sticky top-0 z-50 border-b border-green-600 bg-white px-4 py-4 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Top Navbar */}
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                    >
                        <img
                            src={logo}
                            alt="Tutor-Scout"
                            className="h-10 w-auto sm:h-12"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-5 lg:flex">

                        <Link
                            to="/"
                            className="text-gray-700 transition hover:text-green-600"
                        >
                            Home
                        </Link>

                        <Link
                            to="/find-tutors"
                            className="text-gray-700 transition hover:text-green-600"
                        >
                            Find Tutors
                        </Link>

                        <Link
                            to="/become-tutor"
                            className="text-gray-700 transition hover:text-green-600"
                        >
                            Become a Tutor
                        </Link>

                        <Link
                            to="/how-it-works"
                            className="text-gray-700 transition hover:text-green-600"
                        >
                            How It Works
                        </Link>

                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden items-center gap-3 lg:flex">

                        {loading ? (
                            null
                        ) : user ? (
                            <>
                                <div className="relative">

                                    <button
                                        onClick={() =>
                                            setProfileOpen(!profileOpen)
                                        }
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        {userData?.fullName || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                                    </button>

                                    {profileOpen && (
                                        <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-lg border border-gray-200 bg-white py-2 shadow-md">

                                            <Link
                                                to={dashboardRoute}
                                                onClick={() =>
                                                    setProfileOpen(false)
                                                }
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                                            >
                                                Dashboard
                                            </Link>

                                        </div>
                                    )}

                                </div>

                                <button
                                    onClick={logout}
                                    className="rounded-lg border-2 border-green-600 bg-white px-5 py-1.5 text-green-600 transition hover:bg-green-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-lg border-2 border-green-600 bg-white px-5 py-1.5 text-green-600 transition hover:bg-green-50"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="rounded-lg border border-green-600 px-3 py-2 text-xl text-green-600 lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>

                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="mt-4 border-t border-green-100 pt-4 lg:hidden">

                        <div className="flex flex-col gap-2">

                            <Link
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                            >
                                Home
                            </Link>

                            <Link
                                to="/find-tutors"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                            >
                                Find Tutors
                            </Link>

                            <Link
                                to="/become-tutor"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                            >
                                Become a Tutor
                            </Link>

                            <Link
                                to="/how-it-works"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                            >
                                How It Works
                            </Link>

                            <div className="mt-2 flex flex-col gap-2 border-t border-green-100 pt-3">

                                {loading ? (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="rounded-lg border border-green-600 px-4 py-3 text-center text-green-600 transition hover:bg-green-50"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            to="/signup"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="rounded-lg bg-green-600 px-4 py-3 text-center font-medium text-white transition hover:bg-green-700"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                ) : user ? (
                                    <>
                                        <div className="relative">

                                            <button
                                                onClick={() =>
                                                    setProfileOpen(
                                                        !profileOpen
                                                    )
                                                }
                                                className="w-full rounded-lg px-4 py-3 text-center font-medium text-gray-700"
                                            >
                                                {userData?.fullName || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                                            </button>

                                            {profileOpen && (
                                                <div className="mt-1 rounded-lg border border-gray-200 bg-white py-2 shadow-md">

                                                    <Link
                                                        to={dashboardRoute}
                                                        onClick={() => {
                                                            setProfileOpen(false)
                                                            setMenuOpen(false)
                                                        }}
                                                        className="block px-4 py-2 text-center text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                                                    >
                                                        Dashboard
                                                    </Link>

                                                </div>
                                            )}

                                        </div>

                                        <button
                                            onClick={() => {
                                                logout()
                                                setMenuOpen(false)
                                            }}
                                            className="rounded-lg border border-green-600 px-4 py-3 text-center text-green-600 transition hover:bg-green-50"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="rounded-lg border border-green-600 px-4 py-3 text-center text-green-600 transition hover:bg-green-50"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            to="/signup"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                            className="rounded-lg bg-green-600 px-4 py-3 text-center font-medium text-white transition hover:bg-green-700"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </nav>
    )
}

export default Navbar
