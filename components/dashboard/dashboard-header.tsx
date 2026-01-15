'use client'

import { Button } from '@/components/ui/button'
import { AddLeadModal } from '@/components/forms/add-lead-modal'
import { AssignLeadsModal } from '@/components/forms/assign-leads-modal'
import { useState } from 'react'

interface DashboardHeaderProps {
  userName: string
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false)
  const [isAssignLeadsModalOpen, setIsAssignLeadsModalOpen] = useState(false)

  const handleAddLead = (data: unknown) => {
    // Handle lead addition - in production, call API
    console.log('Adding lead:', data)
    // You can add API call here
  }

  const handleAssignLead = (leadId: string, teamMemberId: string) => {
    // Handle lead assignment - in production, call API
    console.log('Assigning lead:', leadId, 'to team member:', teamMemberId)
    // You can add API call here
    // Optionally close modal after successful assignment
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {userName}!
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Here&apos;s your team&apos;s performance overview for today
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            Today
          </Button>
          <Button variant="ghost" size="sm">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Button>
          <Button variant="ghost" size="sm">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Report
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
            onClick={() => setIsAssignLeadsModalOpen(true)}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Assign Leads
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
            onClick={() => setIsAddLeadModalOpen(true)}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Lead
          </Button>
        </div>
      </div>

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onSubmit={handleAddLead}
      />

      {/* Assign Leads Modal */}
      <AssignLeadsModal
        isOpen={isAssignLeadsModalOpen}
        onClose={() => setIsAssignLeadsModalOpen(false)}
        onAssign={handleAssignLead}
      />
    </>
  )
}
