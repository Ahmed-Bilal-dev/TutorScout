import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'

function Stats() {
    const [tutorCount, setTutorCount] = useState(0)
    const [studentCount, setStudentCount] = useState(0)
    const [averageRating, setAverageRating] = useState(null)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Get all users
                const usersSnapshot = await getDocs(
                    collection(db, 'users')
                )

                let tutors = 0
                let students = 0

                usersSnapshot.forEach((doc) => {
                    const user = doc.data()

                    if (user.role === 'tutor') {
                        tutors++
                    }

                    if (user.role === 'student') {
                        students++
                    }
                })

                setTutorCount(tutors)
                setStudentCount(students)

                // Get all reviews
                const reviewsSnapshot = await getDocs(
                    collection(db, 'reviews')
                )

                let totalRating = 0
                let ratingCount = 0

                reviewsSnapshot.forEach((doc) => {
                    const review = doc.data()
                    const rating = Number(review.rating)

                    if (rating > 0) {
                        totalRating += rating
                        ratingCount++
                    }
                })

                if (ratingCount > 0) {
                    const average = totalRating / ratingCount
                    setAverageRating(average.toFixed(1))
                }
            } catch (error) {
                console.error('Error loading stats:', error)
            }
        }

        fetchStats()
    }, [])

    return (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-3xl bg-green-50 px-6 py-10 sm:px-10">

                <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">

                    {/* Tutors */}
                    <div>
                        <h3 className="text-3xl font-bold text-green-600 sm:text-4xl">
                            {tutorCount}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-gray-600 sm:text-base">
                            Registered Tutors
                        </p>
                    </div>

                    {/* Students */}
                    <div>
                        <h3 className="text-3xl font-bold text-green-600 sm:text-4xl">
                            {studentCount}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-gray-600 sm:text-base">
                            Registered Students
                        </p>
                    </div>

                    {/* Rating */}
                    <div>
                        <h3 className="text-3xl font-bold text-green-600 sm:text-4xl">
                            {averageRating ? `${averageRating}/5` : '—'}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-gray-600 sm:text-base">
                            Average Rating
                        </p>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Stats