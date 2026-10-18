import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '../firebase/auth'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import db from '../firebase/firestore'

function AdminDashboard() {
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalTutors, setTotalTutors] = useState(0)
    const [totalStudents, setTotalStudents] = useState(0)
    const [totalBookings, setTotalBookings] = useState(0)

    const [users, setUsers] = useState([])
    const [selectedSection, setSelectedSection] = useState(null)

    const [bookings, setBookings] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const navigate = useNavigate()


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login')
                return
            }

            if (user.email !== 'ahmedbilal@gmail.com') {
                navigate('/')
            }
        })

        return () => unsubscribe()
    }, [navigate])

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this user?'
        )

        if (!confirmDelete) {
            return
        }

        try {
            const userToDelete = users.find((user) => user.id === userId)

            await deleteDoc(doc(db, 'users', userId))

            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== userId)
            )

            if (userToDelete?.role === 'tutor') {
                setTotalTutors((prev) => prev - 1)
            }

            if (userToDelete?.role === 'student') {
                setTotalStudents((prev) => prev - 1)
            }

            setTotalUsers((prev) => prev - 1)

            alert('User deleted successfully.')
        } catch (error) {
            console.error('Error deleting user:', error)
            alert('Failed to delete user.')
        }
    }

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const usersSnapshot = await getDocs(
                    collection(db, 'users')
                )

                const bookingsSnapshot = await getDocs(
                    collection(db, 'bookings')
                )

                const usersList = usersSnapshot.docs.map((userDoc) => ({
                    id: userDoc.id,
                    ...userDoc.data()
                }))

                const bookingsList = bookingsSnapshot.docs.map((bookingDoc) => {
                    const bookingData = bookingDoc.data()

                    const student = usersList.find(
                        (user) => user.id === bookingData.studentId
                    )

                    const tutor = usersList.find(
                        (user) => user.id === bookingData.tutorId
                    )

                    return {
                        id: bookingDoc.id,
                        ...bookingData,
                        studentName: student?.fullName || 'Student',
                        tutorName: tutor?.fullName || 'Tutor'
                    }
                })

                setBookings(bookingsList)
                setUsers(usersList)

                let tutors = 0
                let students = 0

                usersSnapshot.forEach((userDoc) => {
                    const userData = userDoc.data()

                    if (userData.role === 'tutor') {
                        tutors++
                    }

                    if (userData.role === 'student') {
                        students++
                    }
                })

                setTotalUsers(tutors + students)
                setTotalTutors(tutors)
                setTotalStudents(students)
                setTotalBookings(bookingsSnapshot.size)
            } catch (error) {
                console.error('Error fetching admin data:', error)
            }
        }

        fetchAdminData()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-7xl">

                <h1 className="text-3xl font-bold text-gray-900">
                    Admin Dashboard
                </h1>

                <p className="mt-2 text-gray-600">
                    Manage users, tutors, students and bookings.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    <div
                        onClick={() => {
                            setSelectedSection('users')
                            setSearchTerm('')
                        }} className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <p className="text-sm font-medium text-gray-500">
                            Total Users
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            {totalUsers}
                        </h2>
                    </div>

                    <div
                        onClick={() => {
                            setSelectedSection('tutors')
                            setSearchTerm('')
                        }} className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <p className="text-sm font-medium text-gray-500">
                            Total Tutors
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            {totalTutors}
                        </h2>
                    </div>

                    <div
                        onClick={() => {
                            setSelectedSection('students')
                            setSearchTerm('')
                        }} className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <p className="text-sm font-medium text-gray-500">
                            Total Students
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            {totalStudents}
                        </h2>
                    </div>

                    <div
                        onClick={() => {
                            setSelectedSection('bookings')
                            setSearchTerm('')
                        }} className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <p className="text-sm font-medium text-gray-500">
                            Total Bookings
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            {totalBookings}
                        </h2>
                    </div>



                </div>

                {selectedSection && (
                    <div className="mt-10 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {selectedSection === 'users' && 'All Users'}
                            {selectedSection === 'tutors' && 'All Tutors'}
                            {selectedSection === 'students' && 'All Students'}
                            {selectedSection === 'bookings' && 'All Bookings'}
                        </h2>

                        {selectedSection && (
                            <div className="mt-5">
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                />
                            </div>
                        )}

                        {selectedSection === 'tutors' && (
                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full min-w-[700px] text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-sm text-gray-500">
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">WhatsApp</th>
                                            <th className="px-4 py-3">Subject</th>
                                            <th className="px-4 py-3">City</th>
                                            <th className="px-4 py-3">Fee</th>
                                            <th className="px-4 py-3">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users
                                            .filter((user) => user.role === 'tutor')
                                            .filter((user) =>
                                                user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                                            ).length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                                    No tutors found.
                                                </td>
                                            </tr>
                                        ) : (
                                            users
                                                .filter((user) => user.role === 'tutor')
                                                .filter((user) =>
                                                    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                                                )
                                                .map((tutor) => (
                                                    <tr
                                                        key={tutor.id}
                                                        className="border-b border-gray-100"
                                                    >
                                                        <td className="px-4 py-4 font-medium text-gray-900">
                                                            {tutor.fullName || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {tutor.email || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {tutor.whatsapp || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {tutor.subjects || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {tutor.city || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            Rs. {tutor.hourlyFee || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <button
                                                                onClick={() => handleDeleteUser(tutor.id)}
                                                                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {selectedSection === 'students' && (
                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full min-w-[600px] text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-sm text-gray-500">
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">WhatsApp</th>
                                            <th className="px-4 py-3">Role</th>
                                            <th className="px-4 py-3">Action</th>
                                           
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users
                                            .filter((user) => user.role === 'student')
                                            .filter((user) =>
                                                user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                                            ).length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                                    No students found.
                                                </td>
                                            </tr>
                                        ) : (
                                            users
                                                .filter((user) => user.role === 'student')
                                                .filter((user) =>
                                                    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                                                )
                                                .map((student) => (
                                                    <tr
                                                        key={student.id}
                                                        className="border-b border-gray-100"
                                                    >
                                                        <td className="px-4 py-4 font-medium text-gray-900">
                                                            {student.fullName || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {student.email || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {student.whatsapp || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                                Student
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <button
                                                                onClick={() => handleDeleteUser(student.id)}
                                                                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>

                                                    </tr>
                                                ))
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        )}

                        {selectedSection === 'users' && (
                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full min-w-[700px] text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-sm text-gray-500">
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">WhatsApp</th>
                                            <th className="px-4 py-3">Role</th>
                                            <th className="px-4 py-3">City</th>
                                            <th className="px-4 py-3">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users
                                            .filter((user) =>
                                                user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                                            ).length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                                    No users found.
                                                </td>
                                            </tr>
                                        ) : (
                                            users
                                                .filter((user) =>
                                                    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                                                )
                                                .map((user) => (
                                                    <tr
                                                        key={user.id}
                                                        className="border-b border-gray-100"
                                                    >
                                                        <td className="px-4 py-4 font-medium text-gray-900">
                                                            {user.fullName || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {user.email || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {user.whatsapp || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${user.role === 'tutor'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-blue-100 text-blue-700'
                                                                    }`}
                                                            >
                                                                {user.role || 'N/A'}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {user.city || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <button
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {selectedSection === 'bookings' && (
                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full min-w-[900px] text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-sm text-gray-500">
                                            <th className="px-4 py-3">Student</th>
                                            <th className="px-4 py-3">Tutor</th>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Time</th>
                                            <th className="px-4 py-3">Message</th>
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {bookings
                                            .filter((booking) =>
                                                booking.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                booking.tutorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                booking.status?.toLowerCase().includes(searchTerm.toLowerCase())
                                            ).length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                                    No bookings found.
                                                </td>
                                            </tr>
                                        ) : (
                                            bookings
                                                .filter((booking) =>
                                                    booking.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    booking.tutorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    booking.status?.toLowerCase().includes(searchTerm.toLowerCase())
                                                )
                                                .map((booking) => (
                                                    <tr
                                                        key={booking.id}
                                                        className="border-b border-gray-100"
                                                    >
                                                        <td className="px-4 py-4 font-medium text-gray-900">
                                                            {booking.studentName}
                                                        </td>

                                                        <td className="px-4 py-4 font-medium text-gray-900">
                                                            {booking.tutorName}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {booking.date || 'N/A'}
                                                        </td>

                                                        <td className="px-4 py-4 text-gray-600">
                                                            {booking.time || 'N/A'}
                                                        </td>

                                                        <td className="max-w-xs px-4 py-4 text-gray-600">
                                                            {booking.message || 'No message'}
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.status === 'accepted'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : booking.status === 'rejected'
                                                                        ? 'bg-red-100 text-red-700'
                                                                        : booking.status === 'completed'
                                                                            ? 'bg-blue-100 text-blue-700'
                                                                            : 'bg-yellow-100 text-yellow-700'
                                                                    }`}
                                                            >
                                                                {booking.status
                                                                    ? booking.status.charAt(0).toUpperCase() +
                                                                    booking.status.slice(1)
                                                                    : 'Pending'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    )
}

export default AdminDashboard