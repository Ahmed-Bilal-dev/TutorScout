import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FindTutors from './pages/FindTutors'
import BecomeTutor from './pages/BecomeTutor'
import HowItWorks from './pages/HowItWorks'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TutorProfile from './pages/TutorProfile'
import { AuthProvider } from './context/AuthContext'
import TutorDashboard from './pages/TutorDashboard'
import StudentDashboard from './pages/StudentDashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import BookTutor from './pages/BookTutor'
import AdminDashboard from './pages/AdminDashboard'

function App() {
    return (
        <BrowserRouter>

            <AuthProvider>

                <Navbar />

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/find-tutors" element={<FindTutors />} />

                    <Route path="/become-tutor" element={<BecomeTutor />} />

                    <Route path="/how-it-works" element={<HowItWorks />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/signup" element={<Signup />} />

                    <Route path="/tutor/:slug" element={<TutorProfile />} />

                    <Route
                        path="/tutor-dashboard"
                        element={
                            <ProtectedRoute allowedRole="tutor">
                                <TutorDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/student-dashboard"
                        element={
                            <ProtectedRoute allowedRole="student">
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/book-tutor/:slug" element={<BookTutor />} />

                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                
                </Routes>

            </AuthProvider>

        </BrowserRouter>
    )
}

export default App