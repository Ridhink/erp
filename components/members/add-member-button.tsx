'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AddMemberModal } from '@/components/forms/add-member-modal'

interface AddMemberButtonProps {
  teams?: Array<{ id: string; name: string }>
}

export function AddMemberButton({ teams = [] }: AddMemberButtonProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleAddMember = (data: {
    name: string
    email: string
    role: 'team-lead' | 'associate'
    teamId?: string
  }) => {
    // In production, call API to create member
    console.log('Creating member:', data)
    // After successful creation, refresh members list
    router.refresh()
  }

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className="gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Member
      </Button>

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMember}
        teams={teams}
      />
    </>
  )
}
