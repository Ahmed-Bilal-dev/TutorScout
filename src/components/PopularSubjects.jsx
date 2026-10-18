import { useNavigate } from 'react-router-dom'

function PopularSubjects() {
    const navigate = useNavigate()

    const handleSubjectClick = (subject) => {
        window.scrollTo(0, 0)
        navigate(`/find-tutors?subject=${encodeURIComponent(subject)}`)
    }

    return (
       <section id="popular-subjects" className="px-8 py-16">
            <div className="mx-auto max-w-7xl">

                <div className="text-center">
                    <p className="font-semibold text-green-600">
                        EXPLORE SUBJECTS
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                        Popular Subjects
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                        Find experienced tutors for the subjects you want to learn.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {/* Mathematics */}
                        <div
                            onClick={() => handleSubjectClick('mathematics')}
                            className="cursor-pointer rounded-2xl border border-green-600 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="text-4xl">📐</div>

                            <h3 className="mt-4 text-xl font-bold text-gray-900">
                                Mathematics
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                                Find expert mathematics tutors.
                            </p>
                        </div>

                        {/* Computer Science */}
                        <div
                            onClick={() => handleSubjectClick('computer science')}
                            className="cursor-pointer rounded-2xl border border-green-600 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="text-4xl">💻</div>

                            <h3 className="mt-4 text-xl font-bold text-gray-900">
                                Computer Science
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                                Learn coding and computer skills.
                            </p>
                        </div>

                        {/* Physics */}
                        <div
                            onClick={() => handleSubjectClick('physics')}
                            className="cursor-pointer rounded-2xl border border-green-600 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="text-4xl">⚛️</div>

                            <h3 className="mt-4 text-xl font-bold text-gray-900">
                                Physics
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                                Understand physics with expert tutors.
                            </p>
                        </div>

                        {/* Chemistry */}
                        <div
                            onClick={() => handleSubjectClick('chemistry')}
                            className="cursor-pointer rounded-2xl border border-green-600 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="text-4xl">🧪</div>

                            <h3 className="mt-4 text-xl font-bold text-gray-900">
                                Chemistry
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                                Find tutors for chemistry.
                            </p>
                        </div>

                        {/* English */}
                        <div
                            onClick={() => handleSubjectClick('english')}
                            className="cursor-pointer rounded-2xl border border-green-600 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="text-4xl">📚</div>

                            <h3 className="mt-4 text-xl font-bold text-gray-900">
                                English
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                                Improve your English skills.
                            </p>
                        </div>

                        {/* Biology */}
                        <div
                            onClick={() => handleSubjectClick('biology')}
                            className="cursor-pointer rounded-2xl border border-green-600 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="text-4xl">🧬</div>

                            <h3 className="mt-4 text-xl font-bold text-gray-900">
                                Biology
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                                Learn biology from qualified tutors.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default PopularSubjects