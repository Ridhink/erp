'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/helpers'

interface ActivityItem {
  id: string
  userName: string
  action: string
  leadName: string
  timestamp: string // e.g., "5 min ago"
  type: 'interested' | 'contacted' | 'scheduled'
}

interface RecentActivitiesPanelProps {
  activities: ActivityItem[]
  isOpen: boolean
  onClose: () => void
}

export function RecentActivitiesPanel({
  activities,
  isOpen,
  onClose,
}: RecentActivitiesPanelProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-gray-900 lg:w-96">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Activities
                </CardTitle>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Real-time updates from your team
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 rounded-full bg-red-50 p-0 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
              >
                <svg
                  className="h-4 w-4 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="overflow-y-auto p-4">
            <div className="space-y-3">
              {activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function ActivityItem({ activity }: { activity: ActivityItem }) {
  const config = {
    interested: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textColor: 'text-blue-900 dark:text-blue-100',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    contacted: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      iconBg: 'bg-green-100 dark:bg-green-900/40',
      iconColor: 'text-green-600 dark:text-green-400',
      textColor: 'text-green-900 dark:text-green-100',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    scheduled: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textColor: 'text-blue-900 dark:text-blue-100',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  }

  const activityConfig = config[activity.type]

  return (
    <div
      className={cn(
        'rounded-xl p-4 transition-colors',
        activityConfig.bg
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
            activityConfig.iconBg
          )}
        >
          <span className={activityConfig.iconColor}>
            {activityConfig.icon}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn('text-sm font-medium', activityConfig.textColor)}>
            <span className="font-semibold">{activity.userName}</span>{' '}
            {activity.action}
          </p>
          <p className={cn('mt-1 text-sm', activityConfig.textColor)}>
            Lead: {activity.leadName}
          </p>
          <p className={cn('mt-1 text-xs', activityConfig.textColor)}>
            {activity.timestamp}
          </p>
        </div>
      </div>
    </div>
  )
}
