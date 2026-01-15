/**
 * Application-wide constants
 */

export const ROLES = ['admin', 'manager', 'user', 'viewer'] as const

export const PRODUCT_STATUSES = [
  'active',
  'inactive',
  'out_of_stock',
] as const

export const USER_STATUSES = ['active', 'inactive'] as const

export const PAGINATION_OPTIONS = [10, 25, 50, 100] as const

export const DEFAULT_PAGE_SIZE = 25

export const DEBOUNCE_DELAY = 300

export const TOAST_DURATION = 3000

export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  ISO: 'YYYY-MM-DD',
} as const
