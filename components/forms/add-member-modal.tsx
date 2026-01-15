'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils/helpers'
import { MemberRole } from '@/types/member'

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: {
    name: string
    email: string
    role: MemberRole
    teamId?: string
  }) => void
  teams?: Array<{ id: string; name: string }>
}

export function AddMemberModal({
  isOpen,
  onClose,
  onSubmit,
  teams = [],
}: AddMemberModalProps) {
  const [formData, setFormData] = React.useState({
    name: 'John Doe',
    email: 'john@holidaypanda.com',
    role: '' as MemberRole | '',
    teamId: '',
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.role) {
      newErrors.role = 'Role is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit?.({
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role as MemberRole,
      teamId: formData.teamId || undefined,
    })

    handleClose()
  }

  const handleClose = () => {
    setFormData({
      name: 'John Doe',
      email: 'john@holidaypanda.com',
      role: '',
      teamId: '',
    })
    setErrors({})
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Member"
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div>
          <Input
            label="Full Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.name}
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <Input
            label="Email *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@holidaypanda.com"
            error={errors.email}
            required
          />
        </div>

        {/* Role Field */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Role *
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={cn(
              'flex h-10 w-full rounded-lg border px-3 py-2 text-sm',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-white',
              errors.role
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 bg-white'
            )}
            required
          >
            <option value="">Select role</option>
            <option value="team-lead">Team Lead</option>
            <option value="associate">Sales Associate</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role}</p>
          )}
        </div>

        {/* Assign to Team Field (Optional) */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Assign to Team (Optional)
          </label>
          <select
            name="teamId"
            value={formData.teamId}
            onChange={handleChange}
            className={cn(
              'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-white'
            )}
          >
            <option value="">Select team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Member Roles Info Box */}
        <Card className="bg-gray-50 dark:bg-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="space-y-2 text-sm">
                <div className="font-semibold text-gray-900 dark:text-white">
                  Member Roles:
                </div>
                <ul className="space-y-1.5 text-gray-700 dark:text-gray-300">
                  <li>
                    <span className="font-semibold">Team Lead:</span> Can assign leads to team
                    members and view team analytics
                  </li>
                  <li>
                    <span className="font-semibold">Sales Associate:</span> Can follow up on
                    assigned leads and update lead status
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white dark:border-[#1E3A8A] dark:text-[#1E3A8A] dark:hover:bg-[#1E3A8A] dark:hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
          >
            Add Member
          </Button>
        </div>
      </form>
    </Modal>
  )
}
