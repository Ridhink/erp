'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { User, UserRole } from '@/types/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

// Mock users database
const MOCK_USERS: Record<string, { email: string; password: string; name: string; role: UserRole }> =
  {
    'admin@email.com': {
      email: 'admin@email.com',
      password: 'admin123', // In production, never store passwords in plain text
      name: 'Admin User',
      role: 'admin',
    },
    'lead@email.com': {
      email: 'lead@email.com',
      password: 'lead123',
      name: 'Team Lead',
      role: 'lead',
    },
    'sales@email.com': {
      email: 'sales@email.com',
      password: 'sales123',
      name: 'Sales Associate',
      role: 'sales',
    },
  }

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter()

  // Load user from localStorage on mount (client-side only)
  React.useEffect(() => {
    const loadUser = () => {
      try {
        // Check if we're in the browser
        if (typeof window === 'undefined') {
          setIsLoading(false)
          return
        }
        
        const storedUser = localStorage.getItem('erp_user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Failed to load user from localStorage:', error)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('erp_user')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = React.useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const userData = MOCK_USERS[email.toLowerCase()]

      if (!userData) {
        return { success: false, error: 'Invalid email or password' }
      }

      if (userData.password !== password) {
        return { success: false, error: 'Invalid email or password' }
      }

      const user: User = {
        id: email.toLowerCase(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Store user in localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('erp_user', JSON.stringify(user))
      }
      
      // Update user state - this will trigger isAuthenticated to become true
      setUser(user)
      // Keep loading false after login succeeds - don't reset it
      
      return { success: true }
    },
    []
  )

  const logout = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('erp_user')
    }
    setUser(null)
    setIsLoading(false)
    router.replace('/login')
  }, [router])

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
