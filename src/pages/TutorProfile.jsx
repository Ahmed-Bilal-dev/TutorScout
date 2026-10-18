import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore'
import db from '../firebase/firestore'
import { Link } from 'react-router-dom'

function TutorProfile() {
    const { slug } = useParams()

    const [tutor, setTutor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchTutor = async () => {
            try {
                const tutorDoc = await getDoc(
                    doc(db, 'users', slug)
                )
                console.log('Tutor slug:', slug)
                console.log('Tutor document exists:', tutorDoc.exists())

                const reviewsQuery = query(
                    collection(db, 'reviews'),
                    where('tutorId', '==', slug)
                )

                const reviewsSnapshot = await getDocs(
                    reviewsQuery
                )

                const reviewsList = reviewsSnapshot.docs.map(
                    (reviewDoc) => ({
                        id: reviewDoc.id,
                        ...reviewDoc.data()
                    })
                )

                //             const reviewsWithNames = await Promise.all(
                //                 reviewsList.map(async (review) => {
                //                    if (!review.studentId) {
                //                          return {
                //                             ...review,
                //                              studentName: 'Student'
                //                        }
                //                    }

                //                   const studentDoc = await getDoc(
                //                      doc(db, 'users', review.studentId)
                //                  )

                //                  return {
                //                     ...review,
                //                    studentName: studentDoc.exists()
                //                         ? studentDoc.data().fullName || 'Student'
                //                        : 'Student'
                //               }
                //           })
                //       )

                setReviews(
                    reviewsList.map((review) => ({
                        ...review,
                        studentName: 'Student'
                    }))
                )

                setReviews(
                    reviewsList.map((review) => ({
                        ...review,
                        studentName: 'Student'
                    }))
                )

                const reviewCount = reviewsList.length

                const totalRating = reviewsList.reduce(
                    (total, review) =>
                        total + Number(review.rating || 0),
                    0
                )

                const averageRating = reviewCount
                    ? (totalRating / reviewCount).toFixed(1)
                    : '0.0'

                if (tutorDoc.exists()) {
                    const data = tutorDoc.data()

                    setTutor({
                        name: data.fullName || 'Tutor',
                        subject: data.subjects || 'Not set',
                        rating: averageRating,
                        reviews: reviewCount,
                        fee: data.hourlyFee
                            ? `Rs. ${data.hourlyFee}/hr`
                            : 'Not set',
                        city: data.city || 'Not set',
                        mode: data.teachingMode || 'Not set',
                        experience: data.experience || 'Not set',
                        qualification: data.qualification || 'Not set',
                        about: data.bio || 'No bio available.'
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
                <p className="text-gray-600">
                    Loading tutor profile...
                </p>
            </div>
        )
    }

    // Invalid tutor URL
    if (!tutor) {
        return (
            <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Tutor Not Found
                    </h1>

                    <p className="mt-3 text-gray-600">
                        The tutor profile you are looking for does not exist.
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="bg-gray-50">

            {/* Profile Header */}
            <section className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">

                    <div className="rounded-2xl border border-green-600 bg-white p-6 shadow-sm sm:p-8">

                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            {/* Tutor Info */}
                            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">

                                {/* Avatar */}
                                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-green-50 text-3xl font-bold text-green-600">
                                    {tutor.name
                                        .split(' ')
                                        .map((word) => word[0])
                                        .slice(0, 2)
                                        .join('')}
                                </div>

                                <div className="text-center sm:text-left">

                                    <p className="font-semibold tracking-widest text-green-600">
                                        {tutor.subject.toUpperCase()} TUTOR
                                    </p>

                                    <h1 className="mt-2 text-3xl font-bold text-gray-900">
                                        {tutor.name}
                                    </h1>

                                    <p className="mt-2 text-gray-600">
                                        {tutor.subject} Tutor
                                    </p>

                                    {/* Rating */}
                                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">

                                        <span className="text-yellow-500">
                                            ★
                                        </span>

                                        <span className="font-semibold text-gray-800">
                                            {tutor.rating}
                                        </span>

                                        <span className="text-sm text-gray-500">
                                            ({tutor.reviews} reviews)
                                        </span>

                                    </div>

                                    {/* Location */}
                                    <p className="mt-3 text-sm text-gray-500">
                                        📍 {tutor.city}
                                    </p>

                                </div>
                            </div>

                            {/* Booking Info */}
                            <div className="text-center md:text-right">

                                <p className="text-sm text-gray-500">
                                    Starting from
                                </p>

                                <p className="mt-1 text-2xl font-bold text-green-600">
                                    {tutor.fee}
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    {tutor.mode} Tutoring
                                </p>

                                <Link
                                    to={`/book-tutor/${slug}`}
                                    className="mt-5 block w-full rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-700 md:w-auto"
                                >
                                    Book Now
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* About & Details */}
            <section className="px-4 pb-10 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* About */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">

                        <h2 className="text-2xl font-bold text-gray-900">
                            About the Tutor
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            {tutor.about}
                        </p>

                        <p className="mt-4 leading-7 text-gray-600">
                            My teaching approach focuses on clear concepts,
                            practical examples and step-by-step learning to
                            help students learn with confidence.
                        </p>

                    </div>

                    {/* Quick Details */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="text-xl font-bold text-gray-900">
                            Tutor Details
                        </h2>

                        <div className="mt-5 space-y-4">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Experience
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {tutor.experience}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Qualification
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {tutor.qualification}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Subject
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {tutor.subject}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Teaching Mode
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {tutor.mode}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Location
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {tutor.city}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* Reviews Section */}
            <section className="px-4 pb-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                        {/* Reviews Header */}
                        <div className="flex flex-col gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Student Reviews
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    See what students say about this tutor.
                                </p>
                            </div>

                            {/* Rating Summary */}
                            <div className="rounded-xl bg-green-50 px-6 py-4 text-center">

                                <div className="flex items-center justify-center gap-2">

                                    <span className="text-2xl text-yellow-500">
                                        ★
                                    </span>

                                    <span className="text-2xl font-bold text-gray-900">
                                        {tutor.rating}
                                    </span>

                                    <span className="text-sm text-gray-500">
                                        / 5
                                    </span>

                                </div>

                                <p className="mt-1 text-sm text-gray-600">
                                    {tutor.reviews} reviews
                                </p>

                            </div>

                        </div>

                        {/* Reviews List */}
                        {reviews.length > 0 ? (

                            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                                {reviews.map((review) => (

                                    <div
                                        key={review.id}
                                        className="rounded-xl border border-gray-100 bg-gray-50 p-5"
                                    >

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-semibold text-green-600">
                                                    {(review.studentName || 'Student')
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        {review.studentName || 'Student'}
                                                    </h3>

                                                    <p className="text-xs text-gray-500">
                                                        Student
                                                    </p>
                                                </div>

                                            </div>

                                            <span className="whitespace-nowrap text-yellow-500">
                                                {'★'.repeat(
                                                    Number(review.rating || 0)
                                                )}
                                            </span>

                                        </div>

                                        <p className="mt-4 text-sm leading-6 text-gray-600">
                                            {review.comment || 'No comment provided.'}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <div className="mt-6 rounded-xl bg-gray-50 px-5 py-8 text-center">

                                <div className="text-3xl">
                                    ⭐
                                </div>

                                <h3 className="mt-3 font-semibold text-gray-900">
                                    No reviews yet
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Be the first student to review this tutor.
                                </p>

                            </div>

                        )}

                    </div>

                </div>
            </section>

        </main>
    )
}

export default TutorProfile

