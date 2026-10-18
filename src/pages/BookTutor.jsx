import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    doc,
    getDoc,
    addDoc,
    collection,
    serverTimestamp,
    query,
    where,
    getDocs
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import db from '../firebase/firestore'

function BookTutor() {
    const { slug } = useParams()

    const [tutor, setTutor] = useState(null)
    const [loading, setLoading] = useState(true)

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [message, setMessage] = useState('')

    const [bookingLoading, setBookingLoading] = useState(false)

    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success'
    })

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

    const handleBooking = async () => {
        if (!date || !time) {
            showToast('Please select date and time.', 'error')
            return
        }

        // Prevent multiple clicks while request is processing
        if (bookingLoading) {
            return
        }

        setBookingLoading(true)

        try {
            const auth = getAuth()
            const currentUser = auth.currentUser

            if (!currentUser) {
                showToast('Please login first.', 'error')
                return
            }

            // Check if this student already sent a booking
            // to this tutor
            const existingBookingQuery = query(
                collection(db, 'bookings'),
                where('studentId', '==', currentUser.uid),
                where('tutorId', '==', slug)
            )

            const existingBookingSnapshot = await getDocs(
                existingBookingQuery
            )

            if (!existingBookingSnapshot.empty) {
                showToast(
                    'Booking already sent to this tutor.',
                    'error'
                )
                return
            }

            await addDoc(collection(db, 'bookings'), {
                studentId: currentUser.uid,
                tutorId: slug,
                date: date,
                time: time,
                message: message.trim(),
                status: 'pending',
                createdAt: serverTimestamp()
            })

            showToast(
                'Booking request sent successfully!',
                'success'
            )

            setDate('')
            setTime('')
            setMessage('')
        } catch (error) {
            console.error('Error creating booking:', error)

            showToast(
                'Something went wrong. Please try again.',
                'error'
            )
        } finally {
            setBookingLoading(false)
        }
    }

    useEffect(() => {
        const fetchTutor = async () => {
            try {
                const tutorDoc = await getDoc(doc(db, 'users', slug))

                if (tutorDoc.exists()) {
                    const data = tutorDoc.data()

                    setTutor({
                        name: data.fullName || 'Tutor',
                        subject: data.subjects || 'Not set',
                        fee: data.hourlyFee
                            ? `Rs. ${data.hourlyFee}/hr`
                            : 'Not set',
                        city: data.city || 'Not set',
                        mode: data.teachingMode || 'Not set',
                    })
                }
            } catch (error) {
                console.error('Error fetching tutor:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTutor()
    }, [slug])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading tutor...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">

            {/* Toast */}
            {toast.show && (
                <div
                    className={`fixed right-5 top-5 z-[100] rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg ${
                        toast.type === 'error'
                            ? 'bg-red-600'
                            : 'bg-green-600'
                    }`}
                >
                    {toast.message}
                </div>
            )}

            <div className="mx-auto max-w-3xl">

                <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Book {tutor?.name || 'Tutor'}
                    </h1>

                    <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-5">

                        <h2 className="text-xl font-bold text-gray-900">
                            {tutor?.name}
                        </h2>

                        <p className="mt-2 text-green-600">
                            {tutor?.subject}
                        </p>

                        <div className="mt-4 space-y-2 text-sm text-gray-600">

                            <p>
                                <span className="font-semibold">
                                    Location:
                                </span>{' '}
                                {tutor?.city}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Teaching Mode:
                                </span>{' '}
                                {tutor?.mode}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Fee:
                                </span>{' '}

                                <span className="font-bold text-green-600">
                                    {tutor?.fee}
                                </span>
                            </p>

                        </div>

                    </div>

                    {/* Booking Form */}

                    <div className="mt-8 border-t border-gray-100 pt-8">

                        <h2 className="text-xl font-bold text-gray-900">
                            Booking Details
                        </h2>

                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Time
                                </label>

                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                                />
                            </div>

                        </div>

                        <div className="mt-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Message
                            </label>

                            <textarea
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write a message to the tutor..."
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                            ></textarea>

                        </div>

                        <button
                            type="button"
                            onClick={handleBooking}
                            disabled={bookingLoading}
                            className={`mt-6 w-full rounded-lg px-6 py-3 font-semibold text-white transition ${
                                bookingLoading
                                    ? 'cursor-not-allowed bg-gray-400'
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            {bookingLoading
                                ? 'Sending...'
                                : 'Send Booking Request'}
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default BookTutor