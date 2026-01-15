export interface TeamMember {
  id: string
  name: string
  avatar?: string
  role?: string
}

export interface TeamLead {
  id: string
  name: string
  avatar?: string
  title: string
  isStarred?: boolean
}

export interface TeamMetrics {
  conversion: number
  revenue: number
}

export interface Team {
  id: string
  name: string
  memberCount: number
  teamLead: TeamLead
  metrics: TeamMetrics
  members: TeamMember[]
  performance?: {
    change: number
    period: string
  }
}

export interface TeamListResponse {
  teams: Team[]
  total: number
}
