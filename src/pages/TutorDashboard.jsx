import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
    updateDoc
} from 'firebase/firestore'
import db from '../firebase/firestore'

function TutorDashboard() {
    const { userData, setUserData, user } = useAuth()

    const [bookings, setBookings] = useState([])
    const [bookingsLoading, setBookingsLoading] = useState(true)
    const [rating, setRating] = useState(0)

    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)

    const [profileData, setProfileData] = useState({
        fullName: '',
        subjects: '',
        hourlyFee: '',
        city: '',
        teachingMode: '',
        experience: '',
        qualification: '',
        bio: ''
    })

    useEffect(() => {
        if (userData) {
            setProfileData({
                fullName: userData.fullName || '',
                subjects: userData.subjects || '',
                hourlyFee: userData.hourlyFee || '',
                city: userData.city || '',
                teachingMode: userData.teachingMode || '',
                experience: userData.experience || '',
                qualification: userData.qualification || '',
                bio: userData.bio || ''
            })
        }
    }, [userData])

    const handleSave = async () => {
        if (!user) {
            alert('User not found')
            return
        }

        try {
            setSaving(true)

            await updateDoc(doc(db, 'users', user.uid), {
                fullName: profileData.fullName.trim(),
                subjects: profileData.subjects.trim(),
                hourlyFee: profileData.hourlyFee,
                city: profileData.city.trim(),
                teachingMode: profileData.teachingMode,
                experience: profileData.experience.trim(),
                qualification: profileData.qualification.trim(),
                bio: profileData.bio.trim()
            })

            setUserData({
                ...userData,
                ...profileData
            })

            alert('Profile updated successfully!')
            setEditing(false)

        } catch (error) {
            console.error('Profile update error:', error)
            alert('Failed to update profile')
        } finally {
            setSaving(false)
        }
    }

    const handleBookingStatus = async (bookingId, status) => {
        try {
            await updateDoc(doc(db, 'bookings', bookingId), {
                status: status
            })

            setBookings((previousBookings) =>
                previousBookings.map((booking) =>
                    booking.id === bookingId
                        ? { ...booking, status: status }
                        : booking
                )
            )
        } catch (error) {
            console.error('Error updating booking status:', error)
            alert('Failed to update booking status')
        }
    }

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user) {
                setBookingsLoading(false)
                return
            }

            try {
                const bookingsQuery = query(
                    collection(db, 'bookings'),
                    where('tutorId', '==', user.uid)
                )

                const bookingsSnapshot = await getDocs(bookingsQuery)

                const bookingsList = await Promise.all(
                    bookingsSnapshot.docs
                        // Prevent old or accidental self-bookings from appearing
                        .filter((bookingDoc) => {
                            const bookingData = bookingDoc.data()

                            return bookingData.studentId !== user.uid
                        })
                        .map(async (bookingDoc) => {
                            const bookingData = bookingDoc.data()

                            let studentName = 'Student'
                            let studentWhatsapp = ''
                            let studentEmail = ''

                            if (bookingData.studentId) {
                                const studentDoc = await getDoc(
                                    doc(db, 'users', bookingData.studentId)
                                )

                                if (studentDoc.exists()) {
                                    const studentData = studentDoc.data()

                                    studentName = studentData.fullName || 'Student'
                                    studentWhatsapp = studentData.whatsapp || ''
                                    studentEmail = studentData.email || ''
                                }
                            }

                            return {
                                id: bookingDoc.id,
                                ...bookingData,
                                studentName,
                                studentWhatsapp,
                                studentEmail
                            }
                        })
                )

                setBookings(bookingsList)
            } catch (error) {
                console.error('Error fetching tutor bookings:', error)
            } finally {
                setBookingsLoading(false)
            }
        }

        fetchBookings()
    }, [user])

    useEffect(() => {
        const fetchRating = async () => {
            if (!user) {
                return
            }

            try {
                const reviewsQuery = query(
                    collection(db, 'reviews'),
                    where('tutorId', '==', user.uid)
                )

                const reviewsSnapshot = await getDocs(reviewsQuery)

                if (reviewsSnapshot.empty) {
                    setRating(0)
                    return
                }

                const reviews = reviewsSnapshot.docs.map(
                    (reviewDoc) => reviewDoc.data()
                )

                const totalRating = reviews.reduce(
                    (sum, review) => sum + Number(review.rating || 0),
                    0
                )

                const averageRating = totalRating / reviews.length

                setRating(averageRating)
            } catch (error) {
                console.error('Error fetching tutor rating:', error)
            }
        }

        fetchRating()
    }, [user])

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                        Tutor Dashboard
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Welcome back,{' '}
                        <span className="font-semibold text-green-600">
                            {userData?.fullName || 'Tutor'}
                        </span>
                        ! Manage your tutoring activities from here.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Total Students
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-600">
                            {new Set(
                                bookings
                                    .filter((booking) => booking.status === 'accepted')
                                    .map((booking) => booking.studentId)
                            ).size}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Total Bookings
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-600">
                            {bookings.length}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Rating
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-600">
                            {rating.toFixed(1)} ⭐
                        </h2>
                    </div>

                </div>

            </div>

            {/* Booking Requests */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-semibold text-gray-800">
                    Booking Requests
                </h2>

                {bookingsLoading ? (
                    <p className="mt-5 text-sm text-gray-500">
                        Loading booking requests...
                    </p>
                ) : bookings.length === 0 ? (
                    <p className="mt-5 text-sm text-gray-500">
                        No booking requests yet.
                    </p>
                ) : (
                    <div className="mt-5 space-y-4">

                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="rounded-xl border border-gray-100 bg-gray-50 p-5"
                            >

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {booking.studentName}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Date: {booking.date}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Time: {booking.time}
                                        </p>
                                    </div>

                                    <span
                                        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                            booking.status === 'accepted'
                                                ? 'bg-green-100 text-green-700'
                                                : booking.status === 'rejected'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {booking.status
                                            ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
                                            : 'Pending'}
                                    </span>

                                    {booking.status === 'pending' && (
                                        <div className="mt-5 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row">

                                            <button
                                                onClick={() => handleBookingStatus(booking.id, 'accepted')}
                                                className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
                                            >
                                                Accept
                                            </button>

                                            <button
                                                onClick={() => handleBookingStatus(booking.id, 'rejected')}
                                                className="rounded-lg border border-red-500 px-5 py-2.5 font-medium text-red-500 transition hover:bg-red-50"
                                            >
                                                Reject
                                            </button>

                                        </div>
                                    )}

                                    {booking.status === 'accepted' && (
                                        <div className="mt-5 border-t border-gray-200 pt-4">
                                            <button
                                                onClick={() => handleBookingStatus(booking.id, 'completed')}
                                                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                                            >
                                                Mark as Completed
                                            </button>
                                        </div>
                                    )}

                                </div>

                                {booking.message && (
                                    <p className="mt-4 border-t border-gray-200 pt-4 text-sm text-gray-600">
                                        <span className="font-semibold text-gray-700">
                                            Message:
                                        </span>{' '}
                                        {booking.message}
                                    </p>
                                )}

                                {(booking.status === 'accepted' || booking.status === 'completed') && (
                                    <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row">

                                        <a
                                            href={`https://wa.me/${booking.studentWhatsapp.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-lg bg-green-600 px-5 py-2.5 text-center font-medium text-white transition hover:bg-green-700"
                                        >
                                            💬 WhatsApp Student
                                        </a>

                                        <a
                                            href={`mailto:${booking.studentEmail}`}
                                            className="rounded-lg border border-green-600 px-5 py-2.5 text-center font-medium text-green-600 transition hover:bg-green-50"
                                        >
                                            ✉️ Email Student
                                        </a>

                                    </div>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </div>

            {/* My Profile */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        My Profile
                    </h2>

                    <button
                        onClick={() => setEditing(!editing)}
                        className="rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50"
                    >
                        {editing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {editing ? (
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">

                        {/* Full Name */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={profileData.fullName}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        fullName: e.target.value
                                    })
                                }
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={userData?.email || ''}
                                readOnly
                                className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 outline-none"
                            />
                        </div>

                        {/* Subjects */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Subjects
                            </label>

                            <input
                                type="text"
                                value={profileData.subjects}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        subjects: e.target.value
                                    })
                                }
                                placeholder="e.g. Computer Science, Mathematics"
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        {/* Hourly Fee */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Hourly Fee
                            </label>

                            <input
                                type="number"
                                value={profileData.hourlyFee}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        hourlyFee: e.target.value
                                    })
                                }
                                placeholder="e.g. 2500"
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                City
                            </label>

                            <input
                                type="text"
                                value={profileData.city}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        city: e.target.value
                                    })
                                }
                                placeholder="e.g. Karachi"
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        {/* Teaching Mode */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Teaching Mode
                            </label>

                            <select
                                value={profileData.teachingMode}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        teachingMode: e.target.value
                                    })
                                }
                                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                            >
                                <option value="">Select Mode</option>
                                <option value="Online">Online</option>
                                <option value="Home">Home</option>
                                <option value="Both">Online & Home</option>
                            </select>
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Experience
                            </label>

                            <input
                                type="text"
                                value={profileData.experience}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        experience: e.target.value
                                    })
                                }
                                placeholder="e.g. 3 years"
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        {/* Qualification */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Qualification
                            </label>

                            <input
                                type="text"
                                value={profileData.qualification}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        qualification: e.target.value
                                    })
                                }
                                placeholder="e.g. BS Computer Science"
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        {/* Bio */}
                        <div className="sm:col-span-2">
                            <label className="text-sm font-medium text-gray-700">
                                Short Bio
                            </label>

                            <textarea
                                rows="4"
                                value={profileData.bio}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        bio: e.target.value
                                    })
                                }
                                placeholder="Write a short introduction about yourself..."
                                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                            ></textarea>
                        </div>

                        {/* Save Button */}
                        <div className="sm:col-span-2">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>

                    </div>
                ) : (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">

                        <div>
                            <p className="text-sm text-gray-500">
                                Name
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {userData?.fullName || 'Not available'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {userData?.email || 'Not available'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Role
                            </p>

                            <p className="mt-1 font-medium capitalize text-green-600">
                                {userData?.role || 'Tutor'}
                            </p>
                        </div>

                    </div>
                )}

            </div>

        </div>
    )
}

export default TutorDashboard