'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

interface EditLeadFormProps {
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

export function EditLeadForm({ lead }: EditLeadFormProps) {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    fullName: lead.fullName || lead.name,
    status: lead.status,
    occupation: lead.occupation || '',
    nationality: lead.nationality || '',
    source: lead.source,
    tier: lead.tier || '',
    tone: lead.tone || '',
    familyStructure: {
      travelGroup: lead.familyStructure?.travelGroup || '',
      specialOccasion: lead.familyStructure?.specialOccasion || '',
    },
    negotiationInsight: {
      primaryTrigger: lead.negotiationInsight?.primaryTrigger || '',
      priceSensitivity: lead.negotiationInsight?.priceSensitivity || '',
      preferredContact: lead.negotiationInsight?.preferredContact || '',
    },
  })

  const [travelPreferences, setTravelPreferences] = React.useState<string[]>(
    lead.travelPreferences || []
  )

  const [newNote, setNewNote] = React.useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const togglePreference = (preference: string) => {
    setTravelPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference]
    )
  }

  const handleSave = () => {
    // In production, call API to save changes
    console.log('Saving lead:', { ...formData, travelPreferences })
    router.push('/leads')
  }

  const handleCancel = () => {
    router.push('/leads')
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
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
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Editing Profile
            </CardTitle>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCancel} className="gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              className="gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Changes
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-8">
          {/* Profile Summary */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gray-200 text-3xl font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full border-4 border-white bg-green-500 dark:border-gray-900" />
            </div>

            {/* Basic Information */}
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="FULL NAME"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                label="STATUS"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
              <Input
                label="OCCUPATION"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
              <Input
                label="NATIONALITY"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Communication Channels */}
          <div className="flex gap-3">
            <Button variant="primary" className="flex-1 gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              CALL
            </Button>
            <Button variant="primary" className="flex-1 gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WHATSAPP
            </Button>
            <Button variant="primary" className="flex-1 gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              EMAIL
            </Button>
          </div>

          {/* Additional Attributes */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <Input
              label="SOURCE"
              name="source"
              value={formData.source}
              onChange={handleChange}
            />
            <Input
              label="STATUS"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
            <Input
              label="TIER"
              name="tier"
              value={formData.tier}
              onChange={handleChange}
            />
            <Input
              label="TONE"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
            />
          </div>

          {/* Two-Column Cards */}
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
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Travel
                  </label>
                  <Input
                    name="familyStructure.travelGroup"
                    value={formData.familyStructure.travelGroup}
                    onChange={handleChange}
                    placeholder="Group"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Special Occasion
                  </label>
                  <Input
                    name="familyStructure.specialOccasion"
                    value={formData.familyStructure.specialOccasion}
                    onChange={handleChange}
                  />
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
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Primary Trigger
                  </label>
                  <Input
                    name="negotiationInsight.primaryTrigger"
                    value={formData.negotiationInsight.primaryTrigger}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price Sensitivity
                  </label>
                  <select
                    name="negotiationInsight.priceSensitivity"
                    value={formData.negotiationInsight.priceSensitivity}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-white"
                  >
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pref. Contact
                  </label>
                  <select
                    name="negotiationInsight.preferredContact"
                    value={formData.negotiationInsight.preferredContact}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-white"
                  >
                    <option value="">Select</option>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                  </select>
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
                <button
                  key={preference}
                  type="button"
                  onClick={() => togglePreference(preference)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    travelPreferences.includes(preference)
                      ? 'bg-[#1E3A8A] text-white dark:bg-[#1E3A8A]'
                      : 'border border-[#1E3A8A] bg-white text-[#1E3A8A] hover:bg-gray-50 dark:border-[#1E3A8A] dark:bg-gray-900 dark:hover:bg-gray-800'
                  )}
                >
                  {preference}
                </button>
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
                VIP Repeat Client
              </div>
            </div>
            <div className="space-y-4">
              {lead.pastTours?.map((tour) => (
                <div
                  key={tour.id}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
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
                <div
                  key={item.id}
                  className="flex gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    {item.type === 'note' ? (
                      <span className="text-sm font-semibold">Q</span>
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
                          <span className="font-medium text-gray-900 dark:text-white">
                            {item.author} <span className="text-gray-600 dark:text-gray-400">({item.role})</span>
                          </span>
                        ) : (
                          <span className="font-medium text-gray-900 dark:text-white">
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
              ))}

              {/* New Note Input */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
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
                    onClick={() => {
                      console.log('Posting note:', newNote)
                      setNewNote('')
                    }}
                    className="bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
                  >
                    Post Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
