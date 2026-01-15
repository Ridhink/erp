# ERP System - Setup Guide

## Overview

This ERP system is built with **Next.js 16** using the **App Router** pattern, maximizing the use of **Server Components** for optimal performance.

## Key Features

- ✅ **Server Components First**: Most components are Server Components for better performance
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Dark Mode**: Built-in theme switching with system preference detection
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Server Actions**: Mutations handled via Server Actions
- ✅ **Optimized Data Fetching**: Data fetched on server, streamed to client

## Project Structure

```
erp/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication route group
│   ├── (dashboard)/         # Dashboard route group
│   │   ├── layout.tsx       # Dashboard layout with sidebar
│   │   ├── dashboard/       # Dashboard page
│   │   ├── users/           # Users management
│   │   ├── products/        # Products management
│   │   └── settings/        # Settings page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── layouts/             # Layout components
│   ├── dashboard/           # Dashboard-specific components
│   ├── tables/              # Table components
│   └── common/              # Shared components
├── lib/                     # Utilities and configurations
│   ├── actions/             # Server Actions
│   ├── api/                 # API client
│   ├── utils/               # Utility functions
│   └── constants/           # Constants
├── providers/               # React Context providers
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Architecture Highlights

### Server Components

Most pages and components are Server Components, which means:
- They run on the server
- They don't ship JavaScript to the client
- They can directly access databases and APIs
- They provide better SEO and performance

Example:
```typescript
// app/(dashboard)/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await getDashboardData() // Runs on server
  return <DashboardContent data={data} />
}
```

### Client Components

Only use Client Components (`'use client'`) when you need:
- Interactivity (onClick, onChange, etc.)
- React hooks (useState, useEffect, etc.)
- Browser APIs (localStorage, window, etc.)

Example:
```typescript
// components/tables/user-table.tsx
'use client'

export function UserTable({ initialData }) {
  const [search, setSearch] = useState('')
  // Interactive logic here
}
```

### Server Actions

Use Server Actions for mutations (create, update, delete):

```typescript
// lib/actions/users.ts
'use server'

export async function createUser(data: UserFormData) {
  // Server-side logic
  revalidatePath('/users')
  return { success: true }
}
```

## Environment Variables

Create a `.env.local` file for environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Key Dependencies

- **next**: 16.1.2 - React framework
- **react**: 19.2.3 - UI library
- **typescript**: 5.x - Type safety
- **tailwindcss**: 4.x - Styling
- **clsx**: Utility for conditional classes
- **tailwind-merge**: Merge Tailwind classes

## Development Workflow

### Adding a New Page

1. Create a new file in `app/(dashboard)/your-page/page.tsx`
2. Make it a Server Component (default)
3. Fetch data directly in the component
4. Use Suspense for loading states

### Adding a New Component

1. Determine if it needs to be a Client Component
2. If interactive → `'use client'` directive
3. If presentational → Server Component (default)
4. Place in appropriate folder (`components/ui`, `components/dashboard`, etc.)

### Adding a Server Action

1. Create file in `lib/actions/`
2. Add `'use server'` directive
3. Use `revalidatePath` or `revalidateTag` to refresh cache
4. Call from Client Components or form actions

## Performance Best Practices

1. **Use Server Components** for data fetching
2. **Leverage Next.js caching** (fetch cache, route cache)
3. **Use Suspense** for loading states
4. **Code split** by route (automatic with App Router)
5. **Optimize images** with Next.js Image component
6. **Minimize Client Components** to reduce bundle size

## Styling

The project uses **Tailwind CSS** with:
- Dark mode support
- Custom color palette (monochrome with accents)
- Responsive breakpoints
- Utility-first approach

## Type Safety

All components and functions are fully typed with TypeScript:
- Type definitions in `types/`
- Props interfaces for all components
- API response types
- Form data types

## Next Steps

1. **Connect to your API**: Update `lib/api/client.ts` with your API URL
2. **Implement authentication**: Add auth logic in `app/(auth)/`
3. **Add more features**: Follow the existing patterns
4. **Customize styling**: Update Tailwind config and components
5. **Add tests**: Set up testing framework

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Architecture Guide](./ARCHITECTURE.md)
- [Design Analysis](./DESIGN_ANALYSIS.md)

## Support

For questions or issues, refer to:
- Next.js documentation
- React Server Components guide
- Project architecture documentation
