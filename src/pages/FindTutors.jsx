import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TutorCard from '../components/TutorCard'
import Footer from '../components/Footer'
import {
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore'
import db from '../firebase/firestore'

function FindTutors() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [subject, setSubject] = useState('')
    const [city, setCity] = useState('')
    const [mode, setMode] = useState('')
    const [budget, setBudget] = useState('')
    const [tutors, setTutors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setSubject(searchParams.get('subject') || '')
        setCity(searchParams.get('city') || '')
        setMode(searchParams.get('mode') || '')
        setBudget(searchParams.get('budget') || '')
    }, [searchParams])

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                // Get all users
                const querySnapshot = await getDocs(
                    collection(db, 'users')
                )

                // Get only tutors
                const tutorDocs = querySnapshot.docs.filter(
                    (doc) => doc.data().role === 'tutor'
                )

                // Get real ratings and review counts
                const tutorList = await Promise.all(
                    tutorDocs.map(async (docSnap) => {
                        const data = docSnap.data()

                        let rating = 0
                        let reviews = 0

                        try {
                            const reviewsQuery = query(
                                collection(db, 'reviews'),
                                where('tutorId', '==', docSnap.id)
                            )

                            const reviewsSnapshot = await getDocs(
                                reviewsQuery
                            )

                            const reviewsList =
                                reviewsSnapshot.docs.map(
                                    (reviewDoc) => reviewDoc.data()
                                )

                            reviews = reviewsList.length

                            if (reviews > 0) {
                                const totalRating =
                                    reviewsList.reduce(
                                        (total, review) =>
                                            total +
                                            Number(review.rating || 0),
                                        0
                                    )

                                rating = (
                                    totalRating / reviews
                                ).toFixed(1)
                            } else {
                                rating = '0.0'
                            }
                        } catch (reviewError) {
                            console.error(
                                `Error fetching reviews for tutor ${docSnap.id}:`,
                                reviewError
                            )

                            rating = '0.0'
                            reviews = 0
                        }

                        return {
                            id: docSnap.id,
                            name: data.fullName || 'Tutor',
                            slug: docSnap.id,
                            subject: data.subjects || '',
                            rating: rating,
                            reviews: reviews,
                            fee: data.hourlyFee
                                ? `Rs. ${data.hourlyFee}/hr`
                                : 'Not set',
                            city: data.city || '',
                            mode: data.teachingMode || '',
                        }
                    })
                )

                setTutors(tutorList)
                setLoading(false)

            } catch (error) {
                console.error('Error fetching tutors:', error)
                setLoading(false)
            }
        }

        fetchTutors()
    }, [])

    const handleSearch = () => {
        const params = new URLSearchParams()

        if (subject) {
            params.set('subject', subject)
        }

        if (city) {
            params.set('city', city)
        }

        if (budget) {
            params.set('budget', budget)
        }

        if (mode) {
            params.set('mode', mode)
        }

        setSearchParams(params)
    }

    const filteredTutors = tutors.filter((tutor) => {
        const subjectMatch =
            !subject ||
            tutor.subject
                .toLowerCase()
                .split(',')
                .map((item) => item.trim())
                .some((item) =>
                    item.includes(subject.toLowerCase().trim())
                )

        const cityMatch =
            !city ||
            tutor.city.toLowerCase() === city.toLowerCase()

        const modeMatch =
            !mode ||
            (mode === 'online' &&
                (tutor.mode.toLowerCase().includes('online') ||
                    tutor.mode.toLowerCase() === 'both')) ||
            (mode === 'home' &&
                (tutor.mode.toLowerCase().includes('home') ||
                    tutor.mode.toLowerCase() === 'both'))

        const budgetMatch =
            !budget ||
            (tutor.fee !== 'Not set' &&
                Number(tutor.fee.replace(/[^0-9]/g, '')) <=
                Number(budget.replace(/[^0-9]/g, '')))

        return subjectMatch && cityMatch && modeMatch && budgetMatch
    })

    // All common subjects
    const subjects = [
        'Computer Science',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'English',
        'Urdu',
        'Islamiyat',
        'Pakistan Studies',
        'Accounting',
        'Economics',
        'Business Studies',
        'Statistics',
        'General Science',
        'Social Studies',
        'History',
        'Geography',
        'Programming',
        'Web Development'
    ]

    // If a custom subject comes from search/URL
    // and is not already in the list, show it as an option
    const normalizedSubjects = subjects.map(
        (item) => item.toLowerCase()
    )

    const customSubject =
        subject &&
        !normalizedSubjects.includes(subject.toLowerCase())
            ? subject
            : ''

    return (
        <>
            <main className="bg-gray-50">

                {/* Page Header */}
                <section className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">

                        <div className="text-center">
                            <p className="font-semibold tracking-widest text-green-600">
                                FIND YOUR TUTOR
                            </p>

                            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                                Find the Right Tutor for You
                            </h1>

                            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                                Search and compare tutors based on subject,
                                location, teaching mode and budget.
                            </p>
                        </div>

                        {/* Filters */}
                        <div className="mt-8 rounded-2xl border border-green-600 bg-white p-5 shadow-sm sm:p-6">

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                                {/* Subject */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Subject
                                    </label>

                                    <select
                                        value={subject}
                                        onChange={(e) =>
                                            setSubject(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                    >
                                        <option value="">
                                            All Subjects
                                        </option>

                                        {customSubject && (
                                            <option value={customSubject}>
                                                {customSubject}
                                            </option>
                                        )}

                                        {subjects.map((item) => (
                                            <option
                                                key={item}
                                                value={item.toLowerCase()}
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* City */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Location
                                    </label>

                                    <select
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                    >
                                        <option value="">
                                            All Cities
                                        </option>

                                        <option value="karachi">
                                            Karachi
                                        </option>

                                        <option value="lahore">
                                            Lahore
                                        </option>

                                        <option value="islamabad">
                                            Islamabad
                                        </option>
                                    </select>
                                </div>

                                {/* Teaching Mode */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Teaching Mode
                                    </label>

                                    <select
                                        value={mode}
                                        onChange={(e) =>
                                            setMode(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                    >
                                        <option value="">
                                            Any Mode
                                        </option>

                                        <option value="online">
                                            Online
                                        </option>

                                        <option value="home">
                                            Home Tutoring
                                        </option>
                                    </select>
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Max Budget
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="e.g. 2000"
                                        value={budget}
                                        onChange={(e) =>
                                            setBudget(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                    />
                                </div>

                                {/* Search */}
                                <div className="flex items-end">
                                    <button
                                        type="button"
                                        onClick={handleSearch}
                                        className="w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                                    >
                                        Search Tutors
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* Tutor Results */}
                <section className="px-4 pb-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">

                        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Available Tutors
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Browse tutors and find the right match for your needs.
                                </p>
                            </div>

                            <p className="text-sm font-medium text-green-600">
                                {filteredTutors.length} Tutors Available
                            </p>

                        </div>

                        {/* Tutor Cards */}
                        {loading ? (
                            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
                                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>

                                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                    Loading Tutors...
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Please wait while we find the best tutors for you.
                                </p>
                            </div>
                        ) : filteredTutors.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                                {filteredTutors.map((tutor) => (
                                    <TutorCard
                                        key={tutor.id}
                                        tutor={tutor}
                                    />
                                ))}

                            </div>
                        ) : (
                            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">

                                <h3 className="text-xl font-bold text-gray-900">
                                    No Tutors Found
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                    We couldn't find any tutors matching your search.
                                    Try changing your subject, location, teaching mode, or budget.
                                </p>

                            </div>
                        )}

                    </div>
                </section>

            </main>

            <Footer />
        </>
    )
}

export default FindTutors

