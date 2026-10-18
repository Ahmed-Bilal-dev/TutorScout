import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import auth from '../firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import db from '../firebase/firestore'

function Signup() {
    const [role, setRole] = useState('student')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()

        setError('')

        if (!fullName.trim()) {
            setError('Please enter your full name.')
            return
        }

        if (!email.trim()) {
            setError('Please enter your email.')
            return
        }

        if (!whatsapp.trim()) {
            setError('Please enter your WhatsApp number.')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        try {
            setLoading(true)

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password
            )

            const user = userCredential.user


            await setDoc(doc(db, 'users', user.uid), {
                fullName: fullName.trim(),
                email: user.email,
                whatsapp: whatsapp.trim(),
                role: role,
                createdAt: serverTimestamp()
            })

            if (role === 'tutor') {
                await setDoc(doc(db, 'tutorProfiles', user.uid), {
                    fullName: fullName.trim(),
                    subjects: [],
                    hourlyFee: '',
                    city: '',
                    teachingMode: '',
                    experience: '',
                    qualification: '',
                    bio: '',
                    createdAt: serverTimestamp()
                })
            }


            navigate('/login')
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already registered.')
            } else if (error.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.')
            } else if (error.code === 'auth/weak-password') {
                setError('Password is too weak.')
            } else {
                setError('Something went wrong. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md">

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Your Account
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Join TutorScout and start your learning journey.
                    </p>
                </div>

                {/* Signup Card */}
                <div className="rounded-2xl border border-green-600 bg-white p-6 shadow-lg sm:p-8">

                    <form onSubmit={handleSignup} className="space-y-5">

                        {/* Full Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                            />
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                WhatsApp Number
                            </label>

                            <input
                                type="tel"
                                placeholder="e.g. 03001234567"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                I am a:
                            </label>

                            <div className="grid grid-cols-2 gap-3">

                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`rounded-lg border px-4 py-3 font-medium transition ${role === 'student'
                                        ? 'border-green-600 bg-green-50 text-green-600'
                                        : 'border-gray-300 text-gray-600 hover:border-green-600'
                                        }`}
                                >
                                    Student
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setRole('tutor')}
                                    className={`rounded-lg border px-4 py-3 font-medium transition ${role === 'tutor'
                                        ? 'border-green-600 bg-green-50 text-green-600'
                                        : 'border-gray-300 text-gray-600 hover:border-green-600'
                                        }`}
                                >
                                    Tutor
                                </button>

                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-sm font-medium text-red-600">
                                {error}
                            </p>
                        )}

                        {/* Sign Up */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>

                    </form>

                    {/* Login Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-semibold text-green-600 hover:text-green-700"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </section>
    )
}

export default Signup