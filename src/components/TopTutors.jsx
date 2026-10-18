import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import db from '../firebase/firestore'

function TopTutors() {

  const [topTutors, setTopTutors] = useState([])

  useEffect(() => {
    const fetchTopTutors = async () => {
      try {
        const tutorsQuery = query(
          collection(db, 'users'),
          where('role', '==', 'tutor')
        )

        const querySnapshot = await getDocs(tutorsQuery)

        const tutorDocs = querySnapshot.docs

        const tutors = await Promise.all(
          tutorDocs.map(async (docSnap) => {
            const data = docSnap.data()

            const reviewsQuery = query(
              collection(db, 'reviews'),
              where('tutorId', '==', docSnap.id)
            )

            const reviewsSnapshot = await getDocs(reviewsQuery)

            const reviewsList = reviewsSnapshot.docs.map(
              (reviewDoc) => reviewDoc.data()
            )

            const reviewCount = reviewsList.length

            const averageRating = reviewCount
              ? (
                reviewsList.reduce(
                  (total, review) =>
                    total + Number(review.rating || 0),
                  0
                ) / reviewCount
              ).toFixed(1)
              : '0.0'

            return {
              name: data.fullName || 'Tutor',
              slug: docSnap.id,
              subject: data.subjects || '',
              rating: Number(averageRating),
              reviews: reviewCount,
              fee: data.hourlyFee
                ? `Rs. ${data.hourlyFee}/hr`
                : 'Not set',
              city: data.city || 'Not set',
            }
          })
        )

        // Popular subjects
        const popularSubjects = [
          'mathematics',
          'computer science',
          'physics',
          'chemistry',
          'english',
          'biology'
        ]

        const highlyRatedTutors = tutors.filter(
          (tutor) => tutor.rating >= 4.5
        )

        const selectedTutors = []

        // Har subject ka sirf 1 best tutor
        popularSubjects.forEach((subject) => {

          const matchingTutors = highlyRatedTutors.filter((tutor) => {

            const tutorSubjects = tutor.subject
              .toLowerCase()
              .split(',')
              .map((item) => item.trim())

            return tutorSubjects.includes(subject)
          })

          if (matchingTutors.length > 0) {

            matchingTutors.sort((a, b) => {

              // Pehle rating zyada
              if (b.rating !== a.rating) {
                return b.rating - a.rating
              }

              // Rating same ho to reviews zyada
              return b.reviews - a.reviews
            })

            // Is subject ka sirf best tutor
            selectedTutors.push(matchingTutors[0])
          }
        })

        // Maximum 6 tutors
        setTopTutors(selectedTutors.slice(0, 6))

      } catch (error) {
        console.error('Error fetching top tutors:', error)
      }
    }

    fetchTopTutors()
  }, [])

  return (
    <section id="top-tutors" className="px-8 py-16">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="text-center">
          <p className="font-semibold text-green-600">
            MEET OUR EXPERTS
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Top Tutors
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Learn from experienced tutors and find the right match for you.
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {topTutors.map((tutor) => (
            <div
              key={tutor.slug}
              className="rounded-2xl border border-green-600 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-center gap-4">

                {/* Tutor Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-4xl">
                  👨‍🏫
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {tutor.name}
                  </h3>

                  <p className="text-sm text-green-600">
                    {tutor.subject} Tutor
                  </p>
                </div>

              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  ⭐ {tutor.rating.toFixed(1)} ({tutor.reviews} reviews)
                </p>

                <p className="font-semibold text-gray-900">
                  {tutor.fee}
                </p>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                📍 {tutor.city}
              </p>

              {/* Dynamic View Profile */}
              <Link
                to={`/tutor/${tutor.slug}`}
                className="mt-5 block w-full rounded-xl border-2 border-green-600 py-3 text-center font-semibold text-green-600 transition hover:bg-green-50"
              >
                View Profile
              </Link>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default TopTutors

