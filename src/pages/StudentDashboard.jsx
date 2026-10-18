import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
    addDoc,
    serverTimestamp
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'
import db from '../firebase/firestore'

function StudentDashboard() {
    const { userData } = useAuth()

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    // Review states
    const [reviewedTutors, setReviewedTutors] = useState([])
    const [reviewBooking, setReviewBooking] = useState(null)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [reviewLoading, setReviewLoading] = useState(false)

    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success'
    })

    useEffect(() => {
        const fetchBookings = async () => {
            const auth = getAuth()
            const currentUser = auth.currentUser

            if (!currentUser) {
                setLoading(false)
                return
            }

            try {
                const bookingsQuery = query(
                    collection(db, 'bookings'),
                    where('studentId', '==', currentUser.uid)
                )

                const bookingsSnapshot = await getDocs(bookingsQuery)

                const bookingsList = await Promise.all(
                    bookingsSnapshot.docs.map(async (bookingDoc) => {
                        const bookingData = bookingDoc.data()

                        let tutorName = 'Tutor'
                        let tutorWhatsapp = ''
                        let tutorEmail = ''

                        if (bookingData.tutorId) {
                            const tutorDoc = await getDoc(
                                doc(db, 'users', bookingData.tutorId)
                            )

                            if (tutorDoc.exists()) {
                                const tutorData = tutorDoc.data()

                                tutorName = tutorData.fullName || 'Tutor'
                                tutorWhatsapp = tutorData.whatsapp || ''
                                tutorEmail = tutorData.email || ''
                            }
                        }

                        return {
                            id: bookingDoc.id,
                            ...bookingData,
                            tutorName,
                            tutorWhatsapp,
                            tutorEmail
                        }
                    })
                )

                setBookings(bookingsList)

                // Check which tutors have already been reviewed
                const reviewsQuery = query(
                    collection(db, 'reviews'),
                    where('studentId', '==', currentUser.uid)
                )

                const reviewsSnapshot = await getDocs(reviewsQuery)

                const reviewedTutorIds = reviewsSnapshot.docs.map(
                    (reviewDoc) => reviewDoc.data().tutorId
                )

                setReviewedTutors(reviewedTutorIds)
            } catch (error) {
                console.error('Error fetching bookings:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [userData])

    const showToast = (message, type = 'success') => {
        setToast({
            show: true,
            message,
            type
        })

        setTimeout(() => {
            setToast({
                show: false,
                message: '',
                type: 'success'
            })
        }, 3000)
    }

    const handleOpenReview = (booking) => {
        setReviewBooking(booking)
        setRating(0)
        setComment('')
    }

    const handleCloseReview = () => {
        setReviewBooking(null)
        setRating(0)
        setComment('')
    }

    const handleSubmitReview = async () => {
        if (!rating) {
            showToast('Please select a rating.', 'error')
            return
        }

        if (!comment.trim()) {
            showToast('Please write a comment.', 'error')
            return
        }

        const auth = getAuth()
        const currentUser = auth.currentUser

        if (!currentUser) {
            showToast('Please login first.', 'error')
            return
        }

        try {
            setReviewLoading(true)

            // Check again before submitting to prevent duplicate reviews
            const existingReviewQuery = query(
                collection(db, 'reviews'),
                where('studentId', '==', currentUser.uid),
                where('tutorId', '==', reviewBooking.tutorId)
            )

            const existingReviewSnapshot = await getDocs(
                existingReviewQuery
            )

            if (!existingReviewSnapshot.empty) {
                showToast('You have already reviewed this tutor.', 'error')
                setReviewedTutors((prev) => [
                    ...new Set([...prev, reviewBooking.tutorId])
                ])
                handleCloseReview()
                return
            }

            await addDoc(collection(db, 'reviews'), {
                rating: rating,
                comment: comment.trim(),
                studentId: currentUser.uid,
                tutorId: reviewBooking.tutorId,
                createdAt: serverTimestamp()
            })

            setReviewedTutors((prev) => [
                ...new Set([...prev, reviewBooking.tutorId])
            ])

            showToast('Review submitted successfully!', 'success')

            handleCloseReview()
        } catch (error) {
            console.error('Error submitting review:', error)
            alert('Something went wrong. Please try again.')
        } finally {
            setReviewLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

            {toast.show && (
                <div
                    className={`fixed right-5 top-5 z-[100] rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg ${toast.type === 'error'
                            ? 'bg-red-600'
                            : 'bg-green-600'
                        }`}
                >
                    {toast.message}
                </div>
            )}
            
            <div className="mx-auto max-w-7xl">

                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                        Student Dashboard
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Welcome back,{' '}
                        <span className="font-semibold text-green-600">
                            {userData?.fullName || 'Student'}
                        </span>
                        ! Find tutors and manage your learning activities from here.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

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
                            Active Tutors
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-600">
                            {new Set(
                                bookings
                                    .filter(
                                        (booking) =>
                                            booking.status === 'pending' ||
                                            booking.status === 'accepted'
                                    )
                                    .map((booking) => booking.tutorId)
                            ).size}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Completed Sessions
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-600">
                            {bookings.filter(
                                (booking) => booking.status === 'completed'
                            ).length}
                        </h2>
                    </div>

                </div>

                {/* Quick Actions */}
                <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Quick Actions
                    </h2>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                        <Link
                            to="/find-tutors"
                            className="rounded-lg bg-green-600 px-5 py-3 text-center font-medium text-white transition hover:bg-green-700"
                        >
                            Find a Tutor
                        </Link>

                        <a
                            href="#my-bookings"
                            className="rounded-lg border border-green-600 px-5 py-3 text-center font-medium text-green-600 transition hover:bg-green-50"
                        >
                            My Bookings
                        </a>

                    </div>

                </div>

            </div>

            <div
                id="my-bookings"
                className="mt-8 rounded-xl bg-white p-6 shadow-sm"
            >

                <h2 className="text-xl font-semibold text-gray-800">
                    My Bookings
                </h2>

                {loading ? (
                    <p className="mt-5 text-sm text-gray-500">
                        Loading bookings...
                    </p>
                ) : bookings.length === 0 ? (
                    <p className="mt-5 text-sm text-gray-500">
                        You have no bookings yet.
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
                                            {booking.tutorName}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Date: {booking.date}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Time: {booking.time}
                                        </p>
                                    </div>

                                    <span
                                        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${booking.status === 'accepted'
                                            ? 'bg-green-100 text-green-700'
                                            : booking.status === 'rejected'
                                                ? 'bg-red-100 text-red-700'
                                                : booking.status === 'completed'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {booking.status
                                            ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
                                            : 'Pending'}
                                    </span>

                                </div>

                                {booking.message && (
                                    <p className="mt-4 border-t border-gray-200 pt-4 text-sm text-gray-600">
                                        {booking.message}
                                    </p>
                                )}

                                {(booking.status === 'accepted' || booking.status === 'completed') && (
                                    <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row">

                                        <a
                                            href={`https://wa.me/${booking.tutorWhatsapp.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-lg bg-green-600 px-5 py-2.5 text-center font-medium text-white transition hover:bg-green-700"
                                        >
                                            💬 WhatsApp Tutor
                                        </a>

                                        <a
                                            href={`mailto:${booking.tutorEmail}`}
                                            className="rounded-lg border border-green-600 px-5 py-2.5 text-center font-medium text-green-600 transition hover:bg-green-50"
                                        >
                                            ✉️ Email Tutor
                                        </a>

                                    </div>
                                )}

                                {/* Review Button */}
                                {booking.status === 'completed' && (
                                    <div className="mt-4 border-t border-gray-200 pt-4">

                                        {reviewedTutors.includes(booking.tutorId) ? (
                                            <div className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                                ✓ Review Submitted
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleOpenReview(booking)}
                                                className="rounded-lg border border-green-600 px-5 py-2.5 font-medium text-green-600 transition hover:bg-green-50"
                                            >
                                                ⭐ Give Review
                                            </button>
                                        )}

                                    </div>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </div>

            {/* Review Modal */}
            {reviewBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                        <div className="flex items-center justify-between">

                            <h2 className="text-xl font-bold text-gray-900">
                                Review {reviewBooking.tutorName}
                            </h2>

                            <button
                                type="button"
                                onClick={handleCloseReview}
                                className="text-2xl text-gray-400 transition hover:text-gray-700"
                            >
                                ×
                            </button>

                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                            How was your learning experience?
                        </p>

                        {/* Stars */}
                        <div className="mt-6">

                            <p className="mb-2 text-sm font-semibold text-gray-700">
                                Your Rating
                            </p>

                            <div className="flex gap-2">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`text-3xl transition ${star <= rating
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                            }`}
                                    >
                                        ★
                                    </button>
                                ))}

                            </div>

                        </div>

                        {/* Comment */}
                        <div className="mt-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Your Review
                            </label>

                            <textarea
                                rows="4"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your experience with this tutor..."
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                            ></textarea>

                        </div>

                        {/* Buttons */}
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                            <button
                                type="button"
                                onClick={handleCloseReview}
                                className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 sm:flex-1"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSubmitReview}
                                disabled={reviewLoading}
                                className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
                            >
                                {reviewLoading
                                    ? 'Submitting...'
                                    : 'Submit Review'}
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}

export default StudentDashboard