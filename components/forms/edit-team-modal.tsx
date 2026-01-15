'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils/helpers'
import { Team } from '@/types/team'

interface EditTeamModalProps {
  isOpen: boolean
  onClose: () => void
  team: Team | null
  onSubmit?: (data: { name: string; teamLeadId: string }) => void
}

interface TeamLead {
  id: string
  name: string
  email: string
}

export function EditTeamModal({
  isOpen,
  onClose,
  team,
  onSubmit,
}: EditTeamModalProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    teamLeadId: '',
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Mock team leads - in production, fetch from API
  const teamLeads: TeamLead[] = [
    { id: 'lead-1', name: 'Sarah Chen', email: 'sarah@example.com' },
    { id: 'lead-2', name: 'Marco Rossi', email: 'marco@example.com' },
    { id: 'lead-3', name: 'John Smith', email: 'john@example.com' },
  ]

  // Initialize form data when team changes
  React.useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        teamLeadId: team.teamLead.id,
      })
      setErrors({})
    }
  }, [team])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Team name is required'
    }

    if (!formData.teamLeadId) {
      newErrors.teamLeadId = 'Team lead is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    onSubmit?.(formData)
    handleClose()
  }

  const handleClose = () => {
    if (team) {
      setFormData({
        name: team.name,
        teamLeadId: team.teamLead.id,
      })
    }
    setErrors({})
    onClose()
  }

  if (!team) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Team"
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Team Name Field */}
        <div>
          <Input
            label="Team Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., North America Team"
            error={errors.name}
            required
          />
        </div>

        {/* Team Lead Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Team Lead *
          </label>
          <select
            name="teamLeadId"
            value={formData.teamLeadId}
            onChange={handleChange}
            className={cn(
              'flex h-10 w-full rounded-lg border px-3 py-2 text-sm',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-white',
              'bg-gray-50',
              errors.teamLeadId
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700'
            )}
            required
          >
            <option value="">Select team lead</option>
            {teamLeads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.name} ({lead.email})
              </option>
            ))}
          </select>
          {errors.teamLeadId && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.teamLeadId}
            </p>
          )}
        </div>

        {/* Quick Actions Section */}
        <Card
          variant="outlined"
          className="bg-blue-50/50 dark:bg-blue-900/10"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
              Quick Actions:
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-600 dark:bg-gray-400" />
                <span>
                  Reassigning a lead will update their team context immediately
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-600 dark:bg-gray-400" />
                <span>
                  Team member history is preserved during renames
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}
