import { Link } from 'react-router-dom'
import heroImage from '../assets/Hero.svg'

function Hero() {
    return (
        <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">

            <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">

                {/* Left Column */}
                <div className="w-full max-w-3xl pt-4 text-center lg:pt-16 lg:text-left">

                    <p className="mb-4 font-semibold tracking-wide text-green-600">
                        LEARN FROM THE BEST
                    </p>

                    <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                        Find the Right Tutor.
                        <br />
                        <span className="text-green-600">
                            Learn With Confidence.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 lg:mx-0">
                        Connect with verified tutors, compare profiles, and find the
                        right tutor for your learning needs.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">

                        <Link
                            to="/find-tutors"
                            className="rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-200 transition hover:bg-green-700"
                        >
                            Find a Tutor →
                        </Link>

                        <Link
                            to="/become-tutor"
                            className="rounded-xl border-2 border-green-600 px-7 py-3.5 font-semibold text-green-600 transition hover:bg-green-50"
                        >
                            Become a Tutor
                        </Link>

                    </div>

                </div>

                {/* Right Column */}
                <div className="flex w-full justify-center lg:max-w-lg lg:justify-end">

                    <img
                        src={heroImage}
                        alt="Tutor teaching student online"
                        className="w-full max-w-sm object-contain sm:max-w-md lg:max-w-lg"
                    />

                </div>

            </div>

        </section>
    )
}

export default Hero