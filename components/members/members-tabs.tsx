'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils/helpers'

interface MembersTabsProps {
  activeTab: string
}

export function MembersTabs({ activeTab }: MembersTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tab === 'all') {
      params.delete('tab')
    } else {
      params.set('tab', tab)
    }
    params.set('page', '1') // Reset to first page when changing tabs
    router.push(`/members?${params.toString()}`)
  }

  const tabs = [
    { value: 'all', label: 'All Members' },
    { value: 'team-leads', label: 'Team Leads' },
    { value: 'associates', label: 'Associates' },
  ]

  return (
    <div className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => handleTabChange(tab.value)}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            activeTab === tab.value
              ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white'
              : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
