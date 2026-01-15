export interface Lead {
  id: string
  leadId: string // e.g., "L001"
  name: string
  phone: string
  email: string
  source: LeadSource
  status: LeadStatus
  assignedTo?: string // Name of assigned person, or undefined if unassigned
  createdAt: string
}

export type LeadSource =
  | 'website'
  | 'social-media'
  | 'google-ads'
  | 'whatsapp'
  | 'upload'
  | 'manual'

export type LeadStatus =
  | 'new'
  | 'assigned'
  | 'interested'
  | 'follow-up'
  | 'not-interested'

export interface LeadSummary {
  totalLeads: number
  newLeads: number
  interested: number
  followUps: number
  notInterested: number
}

export interface LeadFilters {
  search?: string
  status?: LeadStatus
  source?: LeadSource
  assignedTo?: string
}

export interface LeadTableParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: LeadFilters
}

export interface LeadListResponse {
  leads: Lead[]
  total: number
  page: number
  limit: number
  totalPages: number
}
