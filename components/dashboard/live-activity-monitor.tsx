import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LiveActivityMember {
  name: string
  calls: number
  conversions: number
  dealValue: number
}

interface LiveActivityMonitorProps {
  members: LiveActivityMember[]
}

// Generate avatar initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Get avatar background color based on name (matching Figma design)
function getAvatarBg(name: string): string {
  const nameLower = name.toLowerCase()
  // Robert Kumar has a photo avatar (we'll show initials for now)
  if (nameLower.includes('robert')) {
    return 'bg-gray-400'
  }
  // Red avatars: John Davis, Lisa Peterson
  if (nameLower.includes('john') || nameLower.includes('lisa')) {
    return 'bg-red-600'
  }
  // White avatars: Maria Santos, Ahmed Ali
  if (nameLower.includes('maria') || nameLower.includes('ahmed')) {
    return 'bg-gray-200 dark:bg-gray-700'
  }
  // Default blue
  return 'bg-blue-600'
}

// Get avatar text color based on background
function getAvatarTextColor(name: string): string {
  const nameLower = name.toLowerCase()
  // White avatars need dark text
  if (nameLower.includes('maria') || nameLower.includes('ahmed')) {
    return 'text-gray-900 dark:text-gray-100'
  }
  // Others use white text
  return 'text-white'
}

export function LiveActivityMonitor({ members }: LiveActivityMonitorProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Live Activity Monitor</CardTitle>
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>Real-time</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Table Headers */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 pb-2 border-b border-gray-200 dark:border-gray-800">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Associate</div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Calls
            </div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Conv.
            </div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Deal Value</div>
          </div>

          {/* Table Rows */}
          {members.map((member, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center pb-4 border-b border-gray-200 last:border-0 dark:border-gray-800"
            >
              {/* Associate with Avatar */}
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full ${getAvatarBg(member.name)} flex items-center justify-center ${getAvatarTextColor(member.name)} font-semibold text-sm`}>
                  {getInitials(member.name)}
                </div>
                <div className="font-medium text-gray-900 dark:text-white">{member.name}</div>
              </div>

              {/* Calls Badge */}
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  {member.calls}
                </span>
              </div>

              {/* Conversions Badge */}
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {member.conversions}
                </span>
              </div>

              {/* Deal Value */}
              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {member.dealValue >= 1000 
                    ? `$${member.dealValue.toLocaleString()}`
                    : `$${member.dealValue}`
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
