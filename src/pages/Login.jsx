import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import auth from '../firebase/auth'
import db from '../firebase/firestore'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email.trim(),
                password
            )

            const user = userCredential.user

            const userDoc = await getDoc(
                doc(db, 'users', user.uid)
            )

            if (userDoc.exists()) {
                const userData = userDoc.data()

                console.log('Logged in user:', userData)
                console.log('User role:', userData.role)

                if (userData.role === 'admin') {
                    navigate('/admin-dashboard')
                } else if (userData.role === 'tutor') {
                    navigate('/tutor-dashboard')
                } else if (userData.role === 'student') {
                    navigate('/student-dashboard')
                }
            } else {
                alert('User data not found in Firestore')
            }

        } catch (error) {
            console.error('Login Error:', error)
            alert('Invalid email or password')
        }
    }

    return (
        <section className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-md items-center justify-center">

                <div className="w-full rounded-2xl border border-green-600 bg-white p-6 shadow-lg sm:p-8">

                    {/* Heading */}
                    <div className="text-center">

                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Login to your TutorScout account
                        </p>

                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-8">

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mt-5">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                required
                            />

                        </div>

                        {/* Forgot Password */}
                        <div className="mt-3 text-right">

                            <button
                                type="button"
                                className="text-sm font-medium text-green-600 hover:text-green-700"
                            >
                                Forgot Password?
                            </button>

                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="mt-6 w-full rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700"
                        >
                            Login
                        </button>

                    </form>

                    {/* Signup Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">

                        Don't have an account?{' '}

                        <Link
                            to="/signup"
                            className="font-semibold text-green-600 hover:text-green-700"
                        >
                            Sign Up
                        </Link>

                    </p>

                </div>

            </div>

        </section>
    )
}

export default Login