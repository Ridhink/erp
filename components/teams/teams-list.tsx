'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { TeamCard } from './team-card'
import { CreateTeamModal } from '@/components/forms/create-team-modal'
import { EditTeamModal } from '@/components/forms/edit-team-modal'
import { Button } from '@/components/ui/button'
import { Team } from '@/types/team'

interface TeamsListProps {
  teams: Team[]
}

export function TeamsList({ teams }: TeamsListProps) {
  const router = useRouter()
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null)

  const handleEdit = (team: Team) => {
    setSelectedTeam(team)
    setIsEditModalOpen(true)
  }

  const handleDelete = (team: Team) => {
    // In production, show confirmation and delete via API
    if (confirm(`Are you sure you want to delete ${team.name}?`)) {
      console.log('Delete team:', team.id)
      // Call API to delete team
    }
  }

  const handleCreateTeam = (data: { name: string; teamLeadId: string }) => {
    // In production, call API to create team
    console.log('Creating team:', data)
    // After successful creation, refresh teams list
  }

  const handleUpdateTeam = (data: { name: string; teamLeadId: string }) => {
    // In production, call API to update team
    console.log('Updating team:', selectedTeam?.id, data)
    // After successful update, refresh teams list
    setIsEditModalOpen(false)
    setSelectedTeam(null)
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-end">
        <Button
          variant="primary"
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#1E3A8A] dark:hover:bg-[#1e40af]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Team
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Create Team Modal */}
      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTeam}
      />

      {/* Edit Team Modal */}
      <EditTeamModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedTeam(null)
        }}
        team={selectedTeam}
        onSubmit={handleUpdateTeam}
      />
    </>
  )
}
