import { User, UserRole } from './auth'

export interface UserFormData {
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface UserFilters {
  search?: string
  role?: UserRole
  status?: 'active' | 'inactive'
}

export interface UserTableParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: UserFilters
}

export interface UserListResponse {
  users: User[]
  total: number
  page: number
  limit: number
  totalPages: number
}
