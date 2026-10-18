import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import auth from '../firebase/auth'
import db from '../firebase/firestore'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser)

                const userDoc = await getDoc(
                    doc(db, 'users', currentUser.uid)
                )

                if (userDoc.exists()) {
                    setUserData(userDoc.data())
                }
            } else {
                setUser(null)
                setUserData(null)
            }

            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const logout = () => {
        return signOut(auth)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                userData,
                setUserData,
                loading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}