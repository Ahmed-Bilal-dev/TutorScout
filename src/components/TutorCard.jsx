import { Link } from 'react-router-dom'
function TutorCard({ tutor }) {
    return (
        <div className="rounded-2xl border border-green-600 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            {/* Tutor Info */}
            <div className="flex items-center gap-4">

                {/* Avatar */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-50 text-xl font-bold text-green-600">
                    {tutor.name
                        .split(' ')
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join('')}
                </div>

                <div>
                    <h3 className="font-bold text-gray-900">
                        {tutor.name}
                    </h3>

                    <p className="mt-1 text-sm text-green-600">
                        {tutor.subject}
                    </p>
                </div>

            </div>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">
                <span className="text-yellow-500">★</span>

                <span className="font-semibold text-gray-800">
                    {tutor.rating}
                </span>

                <span className="text-sm text-gray-500">
                    ({tutor.reviews} reviews)
                </span>
            </div>

            {/* Details */}
            <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">

                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                        Location
                    </span>

                    <span className="font-medium text-gray-800">
                        {tutor.city}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                        Teaching
                    </span>

                    <span className="font-medium text-gray-800">
                        {tutor.mode}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                        Fee
                    </span>

                    <span className="font-bold text-green-600">
                        {tutor.fee}
                    </span>
                </div>

            </div>

            {/* View Profile */}
          <Link
    to={`/tutor/${tutor.slug}`}
    className="mt-6 block w-full rounded-lg border border-green-600 px-4 py-3 text-center font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
>
    View Profile
</Link>

        </div>
    )
}

export default TutorCard