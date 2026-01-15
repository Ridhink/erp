'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils/helpers'

export default function LoginPage() {
  const router = useRouter()
  const { login: loginUser, isAuthenticated, isLoading: authLoading } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const hasRedirectedRef = React.useRef(false)

  // Redirect if already authenticated - only once per mount
  React.useEffect(() => {
    if (authLoading) {
      hasRedirectedRef.current = false
      return
    }
    
    // Only redirect if authenticated and haven't redirected yet
    if (isAuthenticated && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true
      router.replace('/dashboard')
    }
  }, [isAuthenticated, authLoading, router])

  // Show loading during auth check or while redirecting
  if (authLoading || (isAuthenticated && hasRedirectedRef.current)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Redirecting...</p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    // Reset redirect flag on new login attempt
    hasRedirectedRef.current = false

    try {
      const result = await loginUser(email, password)
      if (result.success) {
        // Don't redirect here - let the useEffect handle it when isAuthenticated changes
        // This ensures state is fully updated
        setIsLoading(false)
      } else {
        setError(result.error || 'Login failed')
        setIsLoading(false)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to your Better Holiday Lead Hub account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-xs text-gray-600 dark:bg-blue-900/20 dark:text-gray-400">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <ul className="space-y-1">
                <li>
                  <strong>Admin:</strong> admin@email.com / admin123
                </li>
                <li>
                  <strong>Lead:</strong> lead@email.com / lead123
                </li>
                <li>
                  <strong>Sales:</strong> sales@email.com / sales123
                </li>
              </ul>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
