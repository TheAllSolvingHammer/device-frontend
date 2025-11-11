import {
    createContext,
    useState,
    useContext,
    type ReactNode,
    useEffect,
} from 'react'
import type {LoginResponse} from '~/models/auth.models'
import type {User} from '~/models/user.models'

type AuthContext = {
    user: User | null
    token: string | null
    login: (loginResponse: LoginResponse) => void
    logout: () => void
    isAuthenticated: boolean
}
const AuthContext = createContext<AuthContext | null>(null)
type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        token !== null
    )
    useEffect(() => {
        setIsAuthenticated(token !== null)
    }, [token])

    useEffect(() => {
        console.log('AuthProvider mounted')
        const storedToken = sessionStorage.getItem('authToken')
        const storedUser = sessionStorage.getItem('authUser')

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = ({user: newUser, token: newToken}: LoginResponse) => {
        setUser(newUser)
        setToken(newToken)
        sessionStorage.setItem('authUser', JSON.stringify(newUser))
        sessionStorage.setItem('authToken', newToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        sessionStorage.removeItem('authUser')
        sessionStorage.removeItem('authToken')
    }

    const value = {user, token, login, logout, isAuthenticated}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
