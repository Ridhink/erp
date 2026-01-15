export type MemberRole = 'team-lead' | 'associate'

export interface Member {
  id: string
  name: string
  email: string
  avatar?: string
  role: MemberRole
  teamId?: string
  teamName?: string
}

export interface MemberFilters {
  search?: string
  role?: MemberRole
  teamId?: string
}

export interface MemberTableParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: MemberFilters
}

export interface MemberListResponse {
  members: Member[]
  total: number
  page: number
  limit: number
  totalPages: number
}
