import { useEffect, useState } from 'react'
import {
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore'
import db from '../firebase/firestore'

function Testimonials() {

    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                // Get reviews with rating 4.5 or higher
                const reviewsQuery = query(
                    collection(db, 'reviews'),
                    where('rating', '>=', 4.5)
                )

                const reviewsSnapshot = await getDocs(reviewsQuery)

                // Get all users
                const usersSnapshot = await getDocs(
                    collection(db, 'users')
                )

                const users = {}

                usersSnapshot.docs.forEach((docSnap) => {
                    users[docSnap.id] = docSnap.data()
                })

                const reviewList = reviewsSnapshot.docs.map(
                    (docSnap) => {
                        const review = docSnap.data()

                        const student = users[review.studentId]
                        const tutor = users[review.tutorId]

                        return {
                            id: docSnap.id,
                            rating: Number(review.rating || 0),
                            comment: review.comment || 'Great learning experience.',
                            studentName:
                                student?.fullName || 'Student',
                            tutorName:
                                tutor?.fullName || 'Tutor'
                        }
                    }
                )

                // Highest rating first
                reviewList.sort((a, b) => {
                    return b.rating - a.rating
                })

                // Show maximum 3 reviews
                setTestimonials(reviewList.slice(0, 3))
                setLoading(false)

            } catch (error) {
                console.error(
                    'Error fetching testimonials:',
                    error
                )

                setLoading(false)
            }
        }

        fetchTestimonials()
    }, [])

    return (
        <section id="testimonials" className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="text-center">
                    <p className="font-semibold text-green-600">
                        STUDENT EXPERIENCES
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                        What Our Students Say
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        See what students say about their learning
                        experience with our tutors.
                    </p>
                </div>

                {/* Testimonials */}
                {loading ? (
                    <div className="mt-12 text-center text-gray-500">
                        Loading student reviews...
                    </div>
                ) : testimonials.length > 0 ? (
                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">

                        {testimonials.map((testimonial) => (

                            <div
                                key={testimonial.id}
                                className="rounded-2xl border border-green-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >

                                {/* Rating */}
                                <div className="text-lg text-green-600">
                                    {'★'.repeat(
                                        Math.round(testimonial.rating)
                                    )}
                                </div>

                                {/* Review */}
                                <p className="mt-5 leading-7 text-gray-600">
                                    "{testimonial.comment}"
                                </p>

                                {/* Student */}
                                <div className="mt-6 flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">
                                        {testimonial.studentName
                                            .split(' ')
                                            .map((name) => name[0])
                                            .join('')
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-900">
                                            {testimonial.studentName}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Student • {testimonial.tutorName}
                                        </p>
                                    </div>

                                </div>
                            </div>

                        ))}

                    </div>
                ) : (
                    <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 text-center">
                        <p className="text-gray-500">
                            No student reviews available yet.
                        </p>
                    </div>
                )}

            </div>
        </section>
    )
}

export default Testimonials