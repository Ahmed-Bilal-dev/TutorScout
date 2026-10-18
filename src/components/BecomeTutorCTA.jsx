import { Link } from 'react-router-dom'

function BecomeTutorCTA() {
    return (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                
                <div className="overflow-hidden rounded-3xl border border-green-600 bg-green-100 px-6 py-12 sm:px-10 lg:px-16">
                    
                    <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">

                        {/* Text */}
                        <div className="max-w-2xl">
                            <p className="font-semibold tracking-wide text-gray-600">
                                ARE YOU A TUTOR?
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                                Share Your Knowledge With Students
                            </h2>

                            <p className="mt-4 leading-7 text-gray-700">
                                Create your tutor profile, showcase your expertise,
                                and connect with students looking for the right tutor.
                            </p>
                        </div>

                        {/* Button */}
                        <div className="shrink-0">
                            <Link
                                to="/become-tutor"
                                className="mt-8 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                            >
                                Become a Tutor
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default BecomeTutorCTA