'use client'

import * as React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: string | string[]
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading, isAuthenticated } = useAuth()
  const redirectDoneRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    // Wait for auth to load
    if (isLoading) {
      redirectDoneRef.current = null
      return
    }

    // CRITICAL: If user is authenticated, NEVER redirect to login
    if (isAuthenticated) {
      // Reset redirect tracking when authenticated
      redirectDoneRef.current = null

      // Check role-based access if needed
      if (requiredRole && user) {
        const userRole = user.role
        const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

        if (!allowedRoles.includes(userRole)) {
          // User doesn't have required role - redirect to dashboard
          // Only redirect once if not already on dashboard
          if (pathname !== '/dashboard' && redirectDoneRef.current !== '/dashboard') {
            redirectDoneRef.current = '/dashboard'
            router.replace('/dashboard')
          }
          return
        }
      }

      // User is authenticated and authorized - allow access
      return
    }

    // User is NOT authenticated - redirect to login
    // Only redirect once if not already on login/home page
    if (pathname !== '/login' && pathname !== '/' && redirectDoneRef.current !== '/login') {
      redirectDoneRef.current = '/login'
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router, pathname])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && user) {
    const userRole = user.role
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

    if (!allowedRoles.includes(userRole)) {
      return null
    }
  }

  return <>{children}</>
}
