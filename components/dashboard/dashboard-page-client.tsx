'use client'

import * as React from 'react'
import { useAuth } from '@/providers/auth-provider'
import dynamic from 'next/dynamic'

// Dynamically import dashboard components to handle async Server Components
const AdminDashboard = dynamic(() => import('@/components/dashboard/admin-dashboard'), {
  ssr: true,
})
const LeadDashboard = dynamic(() => import('@/components/dashboard/lead-dashboard'), {
  ssr: true,
})
const SalesDashboard = dynamic(() => import('@/components/dashboard/sales-dashboard'), {
  ssr: true,
})

export function DashboardPageClient() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Render dashboard based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />
    case 'lead':
      return <LeadDashboard />
    case 'sales':
      return <SalesDashboard />
    default:
      return <LeadDashboard /> // Default to lead dashboard
  }
}
