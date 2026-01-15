# ERP Frontend Architecture

## Overview

This ERP application is built with **Next.js 16** using the **App Router** pattern, leveraging **Server Components** extensively for optimal performance and efficiency.

## Architecture Principles

### 1. Server Components First
- **Default to Server Components**: All pages and data-fetching components are Server Components by default
- **Client Components Only When Needed**: Use `'use client'` directive only for:
  - Interactive components (buttons, forms, modals)
  - Components using React hooks (useState, useEffect, etc.)
  - Components using browser APIs
  - Components with event handlers

### 2. Data Fetching Strategy
- **Server Components**: Fetch data directly in Server Components using async/await
- **No Client-Side Fetching**: Avoid `useEffect` + `fetch` patterns in favor of Server Components
- **Server Actions**: Use Server Actions for mutations (create, update, delete)
- **Revalidation**: Use `revalidatePath` and `revalidateTag` for cache invalidation

### 3. Performance Optimizations
- **Automatic Code Splitting**: Next.js automatically splits code by route
- **Streaming**: Server Components stream HTML for faster initial load
- **Suspense Boundaries**: Use Suspense for loading states
- **Static Generation**: Pre-render static pages when possible

## Folder Structure

```
app/
├── (auth)/                    # Route group - authentication pages
│   └── login/
│       └── page.tsx          # Server Component
├── (dashboard)/               # Route group - authenticated pages
│   ├── layout.tsx            # Server Component - wraps with MainLayout
│   ├── dashboard/
│   │   └── page.tsx          # Server Component - fetches dashboard data
│   ├── users/
│   │   ├── page.tsx          # Server Component - fetches users list
│   │   ├── [id]/
│   │   │   └── page.tsx      # Server Component - fetches user details
│   │   └── new/
│   │       └── page.tsx      # Server Component - user creation form
│   ├── products/
│   │   └── page.tsx          # Server Component
│   └── settings/
│       └── page.tsx          # Server Component
├── layout.tsx                # Root layout - Server Component
└── page.tsx                  # Landing page - Server Component

components/
├── ui/                       # Base UI components
│   ├── button.tsx            # Client Component (interactive)
│   ├── input.tsx             # Client Component (form input)
│   ├── card.tsx              # Server Component (presentational)
│   ├── badge.tsx             # Server Component (presentational)
│   └── skeleton.tsx          # Server Component (loading state)
├── layouts/                  # Layout components
│   ├── main-layout.tsx       # Client Component (sidebar state)
│   ├── sidebar.tsx           # Client Component (navigation)
│   └── header.tsx            # Client Component (theme toggle)
├── dashboard/                # Dashboard-specific components
│   ├── metric-card.tsx       # Server Component
│   ├── dashboard-stats.tsx   # Server Component
│   └── recent-activity-list.tsx # Server Component
├── tables/                   # Table components
│   └── user-table.tsx        # Client Component (sorting, pagination)
└── common/                   # Shared components
    ├── empty-state.tsx       # Server Component
    └── loading-spinner.tsx   # Server Component

lib/
├── actions/                  # Server Actions
│   └── users.ts              # User CRUD operations
├── api/
│   └── client.ts             # API client (used by Server Components/Actions)
├── utils/
│   ├── formatters.ts         # Pure functions (Server/Client safe)
│   ├── validators.ts         # Pure functions
│   └── helpers.ts            # Pure functions
└── constants/
    └── index.ts              # Constants

providers/
└── theme-provider.tsx        # Client Component (Context API)

types/
├── auth.ts
├── user.ts
├── product.ts
├── dashboard.ts
├── api.ts
└── common.ts
```

## Component Patterns

### Server Component Example

```typescript
// app/(dashboard)/dashboard/page.tsx
async function getDashboardData() {
  // Fetch data on the server
  const response = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store', // or 'force-cache' for static data
  })
  return response.json()
}

export default async function DashboardPage() {
  const data = await getDashboardData() // Runs on server
  
  return (
    <div>
      <h1>Dashboard</h1>
      <MetricCard metric={data.metric} /> {/* Server Component */}
    </div>
  )
}
```

### Client Component Example

```typescript
// components/tables/user-table.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function UserTable({ initialData }) {
  const router = useRouter() // Client-side navigation
  const [search, setSearch] = useState('')
  
  // Interactive logic here
  return <table>...</table>
}
```

### Server Action Example

```typescript
// lib/actions/users.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function createUser(data: UserFormData) {
  const response = await apiClient.post('/users', data)
  revalidatePath('/users') // Refresh the users page
  return { success: true, data: response }
}
```

### Using Server Actions in Client Components

```typescript
// components/forms/user-form.tsx
'use client'

import { createUser } from '@/lib/actions/users'

export function UserForm() {
  const handleSubmit = async (formData: FormData) => {
    const result = await createUser({
      name: formData.get('name'),
      email: formData.get('email'),
    })
    
    if (result.success) {
      router.push('/users')
    }
  }
  
  return <form action={handleSubmit}>...</form>
}
```

## Data Flow

1. **Page Load (Server Component)**:
   - Server Component fetches data
   - Renders HTML on server
   - Streams to client

2. **User Interaction (Client Component)**:
   - User clicks/interacts
   - Client Component handles event
   - Calls Server Action
   - Server Action updates data
   - Revalidates cache
   - Page refreshes with new data

3. **Navigation**:
   - Next.js prefetches linked pages
   - Server Components fetch data
   - Instant navigation with cached data

## Performance Benefits

### 1. Reduced JavaScript Bundle
- Server Components don't ship JavaScript to client
- Only Client Components add to bundle size
- Smaller initial bundle = faster load

### 2. Faster Initial Load
- HTML is pre-rendered on server
- No client-side data fetching delay
- Streaming allows progressive rendering

### 3. Better SEO
- Full HTML content on initial load
- Search engines can index content immediately

### 4. Reduced API Calls
- Data fetched once on server
- Shared across requests
- Can use caching strategies

## Best Practices

### ✅ Do

- Use Server Components for data fetching
- Use Server Actions for mutations
- Keep Client Components small and focused
- Use Suspense for loading states
- Leverage Next.js caching (fetch cache, route cache)

### ❌ Don't

- Don't use `useEffect` for data fetching in pages
- Don't make everything a Client Component
- Don't fetch data in Client Components when Server Components can do it
- Don't forget to revalidate after mutations

## State Management

### Server State
- **Fetched in Server Components**: Data is fetched on server
- **Revalidated via Server Actions**: Cache invalidation after mutations
- **URL State**: Filters, pagination, sorting in URL params

### Client State
- **React State**: Form inputs, UI toggles, modal visibility
- **Context API**: Theme, auth (when needed)
- **URL Search Params**: For shareable state (filters, pagination)

## Migration Guide

If you have existing Client Components fetching data:

**Before (Client Component)**:
```typescript
'use client'
useEffect(() => {
  fetch('/api/users').then(res => res.json()).then(setUsers)
}, [])
```

**After (Server Component)**:
```typescript
async function getUsers() {
  const res = await fetch('/api/users')
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()
  return <UserTable initialData={users} />
}
```

## Testing Strategy

- **Server Components**: Test data fetching logic separately
- **Client Components**: Test with React Testing Library
- **Server Actions**: Test as async functions
- **Integration**: Test full user flows

## Future Enhancements

- Add React Query for complex client-side state
- Implement optimistic updates
- Add real-time updates with WebSockets
- Implement advanced caching strategies
