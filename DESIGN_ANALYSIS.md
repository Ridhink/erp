# ERP Design Analysis & Architecture Proposal

Based on the Figma design analysis, this document outlines the production-ready architecture, business logic, and state management strategy for the ERP application.

## 📁 Folder Architecture (Next.js 16 App Router)

Following Next.js 16 best practices with the App Router pattern:

```
app/
├── (auth)/                    # Route group for authentication
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/               # Route group for authenticated routes
│   ├── layout.tsx            # Main layout with Sidebar + Header
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard overview
│   ├── users/
│   │   ├── page.tsx          # Users list
│   │   ├── [id]/
│   │   │   └── page.tsx      # User detail/edit
│   │   └── new/
│   │       └── page.tsx      # Create new user
│   ├── products/
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── new/
│   │       └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── api/                   # API routes (if needed)
│       ├── users/
│       │   └── route.ts
│       └── dashboard/
│           └── route.ts
├── layout.tsx                 # Root layout (providers, fonts)
├── globals.css
└── page.tsx                   # Landing/home page

components/
├── ui/                        # Atomic, reusable UI primitives
│   ├── button.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── checkbox.tsx
│   ├── toggle.tsx
│   ├── table/
│   │   ├── table.tsx
│   │   ├── table-header.tsx
│   │   ├── table-body.tsx
│   │   ├── table-row.tsx
│   │   └── table-cell.tsx
│   ├── card.tsx
│   ├── modal.tsx
│   ├── dialog.tsx
│   ├── tabs.tsx
│   ├── badge.tsx
│   ├── avatar.tsx
│   ├── dropdown-menu.tsx
│   ├── date-picker.tsx
│   ├── pagination.tsx
│   └── skeleton.tsx          # Loading states
├── layouts/                   # Layout components
│   ├── main-layout.tsx        # Wrapper with Sidebar + Header
│   ├── header.tsx             # Top navigation bar
│   ├── sidebar.tsx            # Left navigation menu
│   └── sidebar-nav-item.tsx
├── dashboard/                 # Dashboard-specific components
│   ├── dashboard-overview.tsx
│   ├── metric-card.tsx
│   ├── sales-summary-chart.tsx
│   ├── recent-activity-list.tsx
│   └── revenue-chart.tsx
├── forms/                     # Form components
│   ├── user-form.tsx
│   ├── product-form.tsx
│   ├── form-field.tsx         # Label + Input + Error wrapper
│   ├── form-container.tsx
│   └── form-actions.tsx       # Submit/Cancel buttons
├── tables/                    # Table components
│   ├── data-table.tsx         # Generic table with sorting/filtering
│   ├── user-table.tsx
│   ├── product-table.tsx
│   ├── table-filters.tsx
│   └── table-pagination.tsx
├── charts/                    # Chart components
│   ├── line-chart.tsx
│   ├── bar-chart.tsx
│   ├── pie-chart.tsx
│   └── chart-container.tsx
└── common/                    # Shared components
    ├── empty-state.tsx        # "No data" states
    ├── loading-spinner.tsx
    ├── error-boundary.tsx
    ├── toast.tsx              # Toast notifications
    └── search-filter.tsx

hooks/                         # Custom React hooks
├── use-auth.ts
├── use-form-validation.ts
├── use-table-data.ts          # Table data fetching, sorting, filtering
├── use-debounce.ts
├── use-theme.ts               # Theme switching
├── use-pagination.ts
└── use-media-query.ts

lib/                           # Utilities and configurations
├── api/
│   ├── client.ts              # Axios/fetch client setup
│   ├── endpoints.ts            # API endpoint constants
│   └── interceptors.ts        # Request/response interceptors
├── utils/
│   ├── formatters.ts          # Date, currency, number formatters
│   ├── validators.ts          # Validation functions
│   └── helpers.ts             # General utility functions
├── constants/
│   └── index.ts               # App-wide constants
└── validation/
    └── schemas.ts             # Zod/Yup validation schemas

types/                         # TypeScript types
├── auth.ts
├── user.ts
├── product.ts
├── dashboard.ts
├── api.ts                     # API response types
└── index.ts                   # Re-exports

providers/                     # React Context providers
├── auth-provider.tsx
├── theme-provider.tsx
└── toast-provider.tsx

styles/                        # Additional styles (if needed)
├── variables.css              # CSS custom properties
└── themes/
    ├── light.css
    └── dark.css

public/                        # Static assets
├── images/
└── icons/
```

## 🔧 Business Logic Requirements

### 1. Form Validation Rules

#### User Management Forms
- **Required Fields**: Name, Email, Role
- **Email Validation**: Valid email format, uniqueness check
- **Password** (if applicable): Minimum 8 characters, complexity requirements
- **Role Selection**: Must be from predefined roles list
- **Date Fields**: Valid date format, logical date ranges

#### Product/Entity Forms
- **Required Fields**: Name, SKU/Code, Price
- **Numeric Validation**: 
  - Price: Must be > 0, max 2 decimal places
  - Quantity: Must be >= 0 (integers only)
- **SKU Uniqueness**: Server-side validation for unique identifiers
- **URL Validation**: For product images or external links
- **Text Length**: Description max length (e.g., 500 characters)

#### General Form Rules
- **Real-time Validation**: Show errors on blur/change
- **Submit Prevention**: Disable submit button if form is invalid
- **Error Messages**: Clear, actionable error messages per field
- **Success Feedback**: Toast notification on successful submission

### 2. Conditional Rendering - Empty States

#### Data Tables/Lists
```typescript
// Pseudo-logic
if (data.length === 0 && !isLoading) {
  if (hasActiveFilters) {
    return <EmptyState 
      message="No results match your filters" 
      action="Clear Filters" 
    />
  }
  return <EmptyState 
    message="No users found" 
    action="Add New User" 
  />
}
```

#### Dashboard Charts
- Show placeholder message when no data available
- Display "No data for selected period" instead of empty chart
- Provide action to adjust date range or filters

#### Detail Views
- 404-style message if resource not found
- Redirect to list view after deletion
- Loading skeleton while fetching

### 3. Data Transformation

#### Display Formatting
- **Dates**: `YYYY-MM-DD` → `MM/DD/YYYY` or relative time ("2 days ago")
- **Currency**: `12345.67` → `$12,345.67` (locale-aware)
- **Numbers**: `1000` → `1,000` (thousands separator)
- **Percentages**: `0.15` → `15%`
- **Status Badges**: Raw status code → Colored badge with label
  - `active` → Green badge "Active"
  - `inactive` → Gray badge "Inactive"
  - `pending` → Yellow badge "Pending"

#### API Payload Transformation
```typescript
// Example: User form to API payload
const formData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  role: "admin"
}

// Transform to API format
const apiPayload = {
  fullName: `${formData.firstName} ${formData.lastName}`,
  email: formData.email.toLowerCase().trim(),
  roleId: roleMap[formData.role], // Convert role name to ID
  createdAt: new Date().toISOString()
}
```

#### Chart Data Aggregation
- Group raw data by time periods (daily, weekly, monthly)
- Calculate totals, averages, percentages
- Filter by date ranges
- Handle missing data points gracefully

### 4. User Interactions & Permissions

#### Search & Filtering
- **Debounced Search**: Wait 300-500ms after user stops typing
- **Multi-filter Support**: Combine multiple filter criteria (AND logic)
- **Filter Persistence**: Save filter state in URL query params
- **Reset Filters**: Clear all filters button

#### Pagination & Sorting
- **Server-side Pagination**: Fetch data per page
- **Sort State**: Track column and direction (asc/desc)
- **Items Per Page**: User-selectable (10, 25, 50, 100)
- **URL State**: Persist page, sort, filters in URL

#### CRUD Operations
- **Optimistic Updates**: Update UI immediately, rollback on error
- **Loading States**: Show loading indicators during operations
- **Success Feedback**: Toast notifications
- **Error Handling**: Display error messages, retry options
- **Confirmation Dialogs**: For destructive actions (delete)

#### Role-Based Access Control (RBAC)
- Hide/disable UI elements based on user permissions
- Conditional rendering of action buttons
- API-level permission checks

### 5. Theming System
- **Theme Toggle**: Switch between light/dark modes
- **Persist Preference**: Save theme choice in localStorage
- **System Preference**: Detect and respect OS theme preference
- **Smooth Transitions**: Animate theme changes

## 🗂️ State Management Strategy

### Local State (Component-level with `useState`/`useReducer`)

#### Form State
```typescript
// Example: User form
const [formData, setFormData] = useState({
  name: '',
  email: '',
  role: ''
})
const [errors, setErrors] = useState<Record<string, string>>({})
const [isSubmitting, setIsSubmitting] = useState(false)
```

#### Table/List State
```typescript
// Table component state
const [currentPage, setCurrentPage] = useState(1)
const [itemsPerPage, setItemsPerPage] = useState(25)
const [sortColumn, setSortColumn] = useState<string | null>(null)
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
const [searchTerm, setSearchTerm] = useState('')
const [filters, setFilters] = useState<Record<string, any>>({})
const [selectedRows, setSelectedRows] = useState<string[]>([])
```

#### UI Component State
```typescript
// Modal visibility
const [isModalOpen, setIsModalOpen] = useState(false)

// Tabs
const [activeTab, setActiveTab] = useState('overview')

// Accordion
const [expandedItems, setExpandedItems] = useState<string[]>([])

// Dropdowns/Popovers
const [isDropdownOpen, setIsDropdownOpen] = useState(false)
```

#### Component Loading States
```typescript
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
```

### Global State (Context API or Zustand)

#### Authentication State
```typescript
interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  isLoading: boolean
}

// Actions: login, logout, refreshToken, updateUser
```

#### Theme State
```typescript
interface ThemeState {
  theme: 'light' | 'dark' | 'system'
  resolvedTheme: 'light' | 'dark'
}

// Actions: setTheme, toggleTheme
```

#### Layout State
```typescript
interface LayoutState {
  isSidebarOpen: boolean
  isMobileMenuOpen: boolean
}

// Actions: toggleSidebar, closeSidebar, openSidebar
```

#### Global Notifications
```typescript
interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface NotificationState {
  toasts: Toast[]
}

// Actions: addToast, removeToast, clearAll
```

#### Global Filters/Context (if multi-tenant)
```typescript
interface GlobalFilterState {
  selectedOrganization: string | null
  dateRange: { start: Date; end: Date } | null
}

// Actions: setOrganization, setDateRange, clearFilters
```

### Recommended State Management Libraries

For this ERP application, consider:

1. **React Context API** (Built-in)
   - Use for: Auth, Theme, Layout, Notifications
   - Simple, no dependencies
   - Good for low-frequency updates

2. **Zustand** (Recommended for complex state)
   - Lightweight, simple API
   - Better performance than Context for frequent updates
   - Good for: Table state, complex form state, global filters

3. **React Query / TanStack Query** (For server state)
   - Excellent for API data fetching
   - Built-in caching, refetching, pagination
   - Handles loading/error states automatically
   - **Highly recommended** for table data, dashboard metrics

4. **URL State** (via Next.js `useSearchParams`)
   - For: Pagination, filters, sort
   - Shareable URLs, browser back/forward support
   - Persists across page refreshes

### State Management Implementation Example

```typescript
// lib/store/auth-store.ts (Zustand example)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)

// hooks/use-table-data.ts (React Query example)
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '@/lib/api/users'

export function useTableData(page: number, filters: Filters) {
  return useQuery({
    queryKey: ['users', page, filters],
    queryFn: () => fetchUsers(page, filters),
    staleTime: 30000, // 30 seconds
  })
}
```

## 📋 Next Steps

1. **Set up folder structure** as outlined above
2. **Install dependencies**:
   - `@tanstack/react-query` for server state
   - `zustand` for global state (optional)
   - `zod` for validation schemas
   - `date-fns` for date formatting
   - Chart library (e.g., `recharts` or `chart.js`)

3. **Create base components** starting with UI primitives
4. **Implement authentication flow** with Context or Zustand
5. **Set up API client** with interceptors for auth tokens
6. **Build layout components** (Sidebar, Header)
7. **Implement first feature** (e.g., Users module) as a reference

## 🎨 Design System Considerations

Based on the Figma design:
- **Color Palette**: Monochrome (black, white, gray) with accent colors for status
- **Typography**: Clear hierarchy, consistent font sizes
- **Spacing**: Consistent padding/margins (use Tailwind spacing scale)
- **Components**: Reusable, composable components
- **Dark Mode**: Full support with smooth transitions
- **Responsive**: Mobile-first approach, breakpoints for tablet/desktop
