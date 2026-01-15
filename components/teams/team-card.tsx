import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters'
import { Team } from '@/types/team'
import { cn } from '@/lib/utils/helpers'

interface TeamCardProps {
  team: Team
  onEdit?: (team: Team) => void
  onDelete?: (team: Team) => void
}

export function TeamCard({ team, onEdit, onDelete }: TeamCardProps) {
  return (
    <Card variant="outlined" className="flex-1">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {team.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {team.memberCount} {team.memberCount === 1 ? 'member' : 'members'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(team)}
              className="h-8 w-8 rounded-full p-0"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete?.(team)}
              className="h-8 w-8 rounded-full p-0 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Team Lead */}
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
          <div className="relative flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-300 text-sm font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {team.teamLead.avatar ? (
                <img src={team.teamLead.avatar} alt={team.teamLead.name} className="h-full w-full object-cover" />
              ) : (
                team.teamLead.name.charAt(0).toUpperCase()
              )}
            </div>
            {team.teamLead.isStarred && (
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400">
                <svg className="h-3 w-3 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900 dark:text-white">
                {team.teamLead.name}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {team.teamLead.title}
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Conversion
            </div>
            <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
              {formatPercentage(team.metrics.conversion / 100)}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Revenue
            </div>
            <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(team.metrics.revenue)}
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            Team Members
          </h4>
          {team.members.length > 0 ? (
            <div className="space-y-2">
              {team.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-300 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      member.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
              No members assigned
            </div>
          )}
        </div>

        {/* Performance */}
        {team.performance && (
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Performance
            </span>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className={cn(
                'text-sm font-semibold',
                team.performance.change >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              )}>
                {team.performance.change >= 0 ? '+' : ''}{team.performance.change}% {team.performance.period}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
