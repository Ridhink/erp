'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/helpers'
import { Member } from '@/types/member'
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils/formatters'

interface ExtendedMember extends Member {
  memberSince?: string
  performance?: {
    callsToday: number
    conversions: number
    totalRevenue: number
    productivityChange: number
    conversionRate: number
    conversionRateTarget: number
    dailyCallQuota: number
    dailyCallQuotaTarget: number
  }
}

interface MemberProfileViewProps {
  member: ExtendedMember
}

export function MemberProfileView({ member }: MemberProfileViewProps) {
  const router = useRouter()

  const performance = member.performance || {
    callsToday: 0,
    conversions: 0,
    totalRevenue: 0,
    productivityChange: 0,
    conversionRate: 0,
    conversionRateTarget: 15,
    dailyCallQuota: 0,
    dailyCallQuotaTarget: 25,
  }

  const conversionRatePercent = (performance.conversionRate / performance.conversionRateTarget) * 100
  const callQuotaPercent = (performance.dailyCallQuota / performance.dailyCallQuotaTarget) * 100

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start justify-between border-b border-gray-200 pb-6 dark:border-gray-800">
            <div className="flex items-start gap-4">
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-2xl font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    member.name.charAt(0).toUpperCase()
                  )}
                </div>
              </div>

              {/* Name, Role, Email */}
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h1>
                  {member.role === 'team-lead' && (
                    <Badge className="bg-orange-500 text-white font-semibold dark:bg-orange-500">
                      <svg
                        className="mr-1 h-3 w-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Team Lead
                    </Badge>
                  )}
                  {member.role === 'associate' && (
                    <Badge className="bg-[#FFADEA] text-gray-900 font-semibold dark:bg-[#FFADEA] dark:text-gray-900">
                      Associate
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {member.email}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="h-8 w-8 rounded-full bg-red-50 p-0 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
            >
              <svg
                className="h-5 w-5 text-red-600 dark:text-red-400"
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

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Calls Today */}
            <Card variant="outlined">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                      Calls Today
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(performance.callsToday)}
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversions */}
            <Card variant="outlined">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                      Conversions
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(performance.conversions)}
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card variant="outlined">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                      Total Revenue
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(performance.totalRevenue)}
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                PERFORMANCE SUMMARY
              </CardTitle>
              {performance.productivityChange > 0 && (
                <div className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  +{performance.productivityChange}% productivity this week
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Conversion Rate Target */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Conversion Rate Target
                  </label>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {performance.conversionRate}% / {performance.conversionRateTarget}%
                  </span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      conversionRatePercent >= 100
                        ? 'bg-green-600 dark:bg-green-500'
                        : 'bg-[#1E3A8A] dark:bg-[#1E3A8A]'
                    )}
                    style={{ width: `${Math.min(conversionRatePercent, 100)}%` }}
                  />
                </div>
              </div>

              {/* Daily Call Quota */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Daily Call Quota
                  </label>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {performance.dailyCallQuota} / {performance.dailyCallQuotaTarget}
                  </span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      callQuotaPercent >= 100
                        ? 'bg-green-600 dark:bg-green-500'
                        : 'bg-[#1E3A8A] dark:bg-[#1E3A8A]'
                    )}
                    style={{ width: `${Math.min(callQuotaPercent, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Assigned Team */}
            <Card className="bg-blue-50 dark:bg-blue-900/10">
              <CardContent className="p-4">
                <div className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Assigned Team
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  {member.teamName || 'No team assigned'}
                </div>
              </CardContent>
            </Card>

            {/* Member Since */}
            <Card className="bg-blue-50 dark:bg-blue-900/10">
              <CardContent className="p-4">
                <div className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Member Since
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {member.memberSince || 'N/A'}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
