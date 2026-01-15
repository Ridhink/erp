'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/auth-provider'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const hasRedirectedRef = React.useRef(false)

  useEffect(() => {
    if (isLoading || hasRedirectedRef.current) return

    if (isAuthenticated) {
      hasRedirectedRef.current = true
      router.replace('/dashboard')
    } else {
      hasRedirectedRef.current = true
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            ERP System
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Enterprise Resource Planning system built with Next.js 16, leveraging Server Components for optimal performance.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link href="/login">
            <Button variant="primary" size="lg">
              Go to Login
            </Button>
          </Link>
          <Link href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              Documentation
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
