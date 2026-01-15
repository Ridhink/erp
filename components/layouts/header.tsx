'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils/helpers'
import { RecentActivitiesPanel } from '@/components/common/recent-activities-panel'

interface HeaderProps {
  onMenuClick?: () => void
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export function Header({ onMenuClick, user }: HeaderProps) {
  const [searchValue, setSearchValue] = React.useState('')
  const [isActivitiesOpen, setIsActivitiesOpen] = React.useState(false)

  // Mock activities data - in production, fetch from API
  const activities = [
    {
      id: '1',
      userName: 'Sarah Johnson',
      action: 'marked as interested',
      leadName: 'Robert Chen',
      timestamp: '5 min ago',
      type: 'interested' as const,
    },
    {
      id: '2',
      userName: 'Mike Peterson',
      action: 'contacted',
      leadName: 'Emily Davis',
      timestamp: '12 min ago',
      type: 'contacted' as const,
    },
    {
      id: '3',
      userName: 'Sarah Johnson',
      action: 'marked as interested',
      leadName: 'John Smith',
      timestamp: '18 min ago',
      type: 'interested' as const,
    },
    {
      id: '4',
      userName: 'Lisa Wong',
      action: 'scheduled follow-up',
      leadName: 'Alex Kumar',
      timestamp: '25 min ago',
      type: 'scheduled' as const,
    },
  ]

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900 lg:px-6">
        {/* Left: Menu button (mobile) and Breadcrumbs */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>

          {/* Breadcrumbs */}
          <nav className="hidden items-center gap-2 text-sm text-gray-500 dark:text-gray-400 md:flex">
            <span>Main</span>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Dashboard</span>
          </nav>
        </div>

        {/* Right: Search, Notifications, User */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input
              type="search"
              placeholder="Search leads, quotes, customers..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-80 pl-10 pr-4"
            />
          </div>

          {/* Notifications - Opens Recent Activities */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={() => setIsActivitiesOpen(true)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* User Profile */}
          {user && (
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-300 ring-2 ring-gray-200 dark:bg-gray-700 dark:ring-gray-800">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Recent Activities Panel */}
      <RecentActivitiesPanel
        activities={activities}
        isOpen={isActivitiesOpen}
        onClose={() => setIsActivitiesOpen(false)}
      />
    </>
  )
}
