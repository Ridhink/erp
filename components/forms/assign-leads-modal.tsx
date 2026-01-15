'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils/formatters'

interface UnassignedLead {
  id: string
  name: string
  package: string
  source: string
  email: string
  dealValue: number
}

interface TeamMember {
  id: string
  name: string
}

interface AssignLeadsModalProps {
  isOpen: boolean
  onClose: () => void
  onAssign?: (leadId: string, teamMemberId: string) => void
}

// Mock data for unassigned leads - in production, this would come from props or API
const mockUnassignedLeads: UnassignedLead[] = [
  {
    id: '1',
    name: 'Michael Thompson',
    package: 'Bali Package',
    source: 'Website',
    email: 'michael.thompson@email.com',
    dealValue: 4200,
  },
  {
    id: '2',
    name: 'Emma Williams',
    package: 'Europe Tour',
    source: 'Google Ads',
    email: 'emma.williams@email.com',
    dealValue: 8500,
  },
  {
    id: '3',
    name: 'James Anderson',
    package: 'Japan Trip',
    source: 'Referral',
    email: 'james.anderson@email.com',
    dealValue: 6300,
  },
  {
    id: '4',
    name: 'Sophia Martinez',
    package: 'Maldives Resort',
    source: 'Social Media',
    email: 'sophia.martinez@email.com',
    dealValue: 12400,
  },
  {
    id: '5',
    name: 'David Brown',
    package: 'Safari Adventure',
    source: 'Website',
    email: 'david.brown@email.com',
    dealValue: 11500,
  },
]

// Mock team members - in production, this would come from props or API
const mockTeamMembers: TeamMember[] = [
  { id: '1', name: 'John Davis' },
  { id: '2', name: 'Maria Santos' },
  { id: '3', name: 'Robert Kumar' },
  { id: '4', name: 'Lisa Peterson' },
  { id: '5', name: 'Ahmed Ali' },
]

export function AssignLeadsModal({ isOpen, onClose, onAssign }: AssignLeadsModalProps) {
  const [selectedMembers, setSelectedMembers] = React.useState<Record<string, string>>({})

  const handleMemberSelect = (leadId: string, memberId: string) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [leadId]: memberId,
    }))
  }

  const handleAssign = (leadId: string) => {
    const memberId = selectedMembers[leadId]
    if (memberId && onAssign) {
      onAssign(leadId, memberId)
      // Clear selection after assignment
      setSelectedMembers((prev) => {
        const updated = { ...prev }
        delete updated[leadId]
        return updated
      })
    }
  }

  const formatSource = (source: string): string => {
    return source
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Assign Leads to Team Members (${mockUnassignedLeads.length})`}
      className="max-w-4xl"
    >
      <div className="overflow-y-auto px-6 py-4 max-h-[calc(90vh-120px)]">
        <div className="space-y-4">
          {mockUnassignedLeads.map((lead) => {
            const selectedMemberId = selectedMembers[lead.id]
            const selectedMember = selectedMemberId
              ? mockTeamMembers.find((m) => m.id === selectedMemberId)
              : null

            return (
              <div
                key={lead.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50"
              >
                {/* Lead Information Row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Lead Name and Details - Left Side */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                      {lead.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {lead.package}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                      Source: {formatSource(lead.source)} • {lead.email}
                    </p>
                  </div>

                  {/* Deal Value - Right Side */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-base font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      {formatCurrency(lead.dealValue)}
                    </div>
                  </div>
                </div>

                {/* Assignment Input and Button Row */}
                <div className="flex items-center gap-3">
                  {/* Team Member Select Dropdown */}
                  <div className="flex-1 min-w-0">
                    <select
                      value={selectedMemberId || ''}
                      onChange={(e) => handleMemberSelect(lead.id, e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    >
                      <option value="">Select team member...</option>
                      {mockTeamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Assign Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAssign(lead.id)}
                    disabled={!selectedMemberId}
                    className="flex-shrink-0 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed px-6"
                  >
                    Assign
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
