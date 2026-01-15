'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/helpers'
import { Lead } from '@/types/lead'
import { formatDate, formatCurrency } from '@/lib/utils/formatters'

interface ExtendedLead extends Lead {
  fullName?: string
  occupation?: string
  nationality?: string
  tier?: string
  tone?: string
  familyStructure?: {
    travelGroup?: string
    specialOccasion?: string
  }
  negotiationInsight?: {
    primaryTrigger?: string
    priceSensitivity?: string
    preferredContact?: string
  }
  travelPreferences?: string[]
  pastTours?: Array<{
    id: string
    title: string
    date: string
    pax: number
    price: number
    paymentMethod: string
  }>
  communicationHistory?: Array<{
    id: string
    type: 'note' | 'system'
    author?: string
    role?: string
    timestamp: string
    content: string
    tags?: string[]
  }>
}

interface CustomerIntelligenceViewProps {
  lead: ExtendedLead
}

const TRAVEL_PREFERENCES = [
  'Adventure',
  'Luxury',
  'Family',
  'Solo',
  'Fine Dining',
  'Beachfront',
  'Private Guide',
  'Business Class',
  'Veg',
  'Non-Veg',
]

export function CustomerIntelligenceView({ lead }: CustomerIntelligenceViewProps) {
  const router = useRouter()
  const [newNote, setNewNote] = React.useState('')

  const handleEdit = () => {
    router.push(`/leads/${lead.id}/edit`)
  }

  const handlePostNote = () => {
    // In production, call API to post note
    console.log('Posting note:', newNote)
    setNewNote('')
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'interested':
        return 'text-green-600 dark:text-green-400'
      case 'new':
        return 'text-blue-600 dark:text-blue-400'
      case 'assigned':
        return 'text-orange-600 dark:text-orange-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'silver':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="h-8 w-8 rounded-full p-0"
          >
            <svg
              className="h-5 w-5"
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Customer Intelligence
          </h1>
        </div>
        <Button variant="outline" onClick={handleEdit} className="gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Profile
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gray-200 text-3xl font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full border-4 border-white bg-green-500 dark:border-gray-900" />
              </div>

              {/* Name and Attributes */}
              <div className="flex-1 text-center sm:text-left">
                <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {lead.fullName || lead.name}
                  </h2>
                  {lead.tier && (
                    <Badge className={cn('font-semibold', getTierColor(lead.tier))}>
                      {lead.tier.toUpperCase()}
                    </Badge>
                  )}
                </div>

                {/* Attributes */}
                <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 sm:justify-start">
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    {lead.nationality || 'N/A'}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {lead.occupation || 'N/A'}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {lead.tone || 'Neutral'} Tone
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" className="gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    CALL
                  </Button>
                  <Button variant="primary" className="gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WHATSAPP
                  </Button>
                  <Button variant="primary" className="gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    EMAIL
                  </Button>
                </div>
              </div>
            </div>

            {/* Summary Data */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6 dark:border-gray-800 sm:grid-cols-4">
              <div>
                <div className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  SOURCE
                </div>
                <div className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {lead.source === 'website' ? 'Website' : lead.source}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  STATUS
                </div>
                <div className={cn('mt-1 text-sm font-semibold', getStatusColor(lead.status))}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  TIER
                </div>
                <div className="mt-1 text-sm font-semibold text-orange-600 dark:text-orange-400">
                  {lead.tier || 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  TONE
                </div>
                <div className="mt-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {lead.tone || 'Neutral'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Family Structure & Negotiation Insight */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Family Structure */}
        <Card variant="outlined">
          <CardHeader>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <CardTitle className="text-base">FAMILY STRUCTURE</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                <div className="text-xs text-gray-500 dark:text-gray-400">Travel Group</div>
                <div className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {lead.familyStructure?.travelGroup || 'N/A'}
                </div>
              </div>
              <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                <div className="text-xs text-gray-500 dark:text-gray-400">Special Occasion</div>
                <div className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {lead.familyStructure?.specialOccasion || 'None'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Negotiation Insight */}
        <Card variant="outlined">
          <CardHeader>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <CardTitle className="text-base">NEGOTIATION INSIGHT</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                <div className="text-xs text-gray-500 dark:text-gray-400">Primary Trigger</div>
                <div className="mt-1">
                  <Badge variant="info" className="font-semibold">
                    {lead.negotiationInsight?.primaryTrigger || 'N/A'}
                  </Badge>
                </div>
              </div>
              <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                <div className="text-xs text-gray-500 dark:text-gray-400">Price Sensitivity</div>
                <div className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {lead.negotiationInsight?.priceSensitivity || 'N/A'}
                </div>
              </div>
              <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                <div className="text-xs text-gray-500 dark:text-gray-400">Pref. Contact</div>
                <div className="mt-1 flex items-center gap-1 font-semibold text-gray-900 dark:text-white">
                  {lead.negotiationInsight?.preferredContact === 'WhatsApp' && (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  )}
                  {lead.negotiationInsight?.preferredContact || 'N/A'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Travel & Preferences */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          TRAVEL & PREFERENCES
        </h3>
        <div className="flex flex-wrap gap-2">
          {TRAVEL_PREFERENCES.map((preference) => (
            <span
              key={preference}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium',
                lead.travelPreferences?.includes(preference)
                  ? 'bg-[#1E3A8A] text-white dark:bg-[#1E3A8A]'
                  : 'border border-gray-300 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'
              )}
            >
              {preference}
            </span>
          ))}
        </div>
      </div>

      {/* Past Tours History */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            PAST TOURS HISTORY
          </h3>
          <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            VIP Client
          </div>
        </div>
        <div className="space-y-4">
          {lead.pastTours?.map((tour) => (
            <Card key={tour.id} variant="outlined">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {tour.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {tour.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {tour.pax} Pax
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(tour.price)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {tour.paymentMethod}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Communication Intelligence */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          COMMUNICATION INTELLIGENCE
        </h3>
        <div className="space-y-4">
          {lead.communicationHistory?.map((item) => (
            <Card key={item.id} variant="outlined">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    {item.type === 'note' ? (
                      <span className="text-sm font-semibold">
                        {item.author?.charAt(0).toUpperCase() || 'Q'}
                      </span>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <div>
                        {item.type === 'note' ? (
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {item.author}{' '}
                            <span className="text-gray-600 dark:text-gray-400">
                              ({item.role})
                            </span>
                          </span>
                        ) : (
                          <span className="font-semibold text-gray-900 dark:text-white">
                            System Notification
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {formatDate(item.timestamp, 'relative')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {item.content}
                    </p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={cn(
                              'rounded-full px-3 py-1 text-xs font-medium',
                              index === 0
                                ? 'bg-blue-600 text-white dark:bg-blue-600'
                                : 'border border-blue-600 bg-white text-blue-600 dark:border-blue-600 dark:bg-gray-900 dark:text-blue-400'
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* New Note Input */}
          <Card variant="outlined">
            <CardContent className="p-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log a call note or interaction detail..."
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-white"
                rows={4}
              />
              <div className="mt-3 flex justify-end">
                <Button
                  variant="primary"
                  onClick={handlePostNote}
                  className="bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
                >
                  Post Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
