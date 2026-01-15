import { Suspense } from 'react'
import { UserTable } from '@/components/tables/user-table'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Server Component - fetches data on the server
async function getUsers(searchParams: {
  page?: string
  limit?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}) {
  // In production, this would fetch from your API
  await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate API delay

  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 25

  // Mock data - using correct UserRole types
  const roles: ('admin' | 'lead' | 'sales')[] = ['admin', 'lead', 'sales']
  const mockUsers = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % 3] as 'admin' | 'lead' | 'sales',
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
  }))

  // Apply search filter
  let filteredUsers = mockUsers
  if (searchParams.search) {
    const search = searchParams.search.toLowerCase()
    filteredUsers = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    )
  }

  // Apply sorting
  if (searchParams.sortBy) {
    filteredUsers.sort((a, b) => {
      const aVal = a[searchParams.sortBy as keyof typeof a]
      const bVal = b[searchParams.sortBy as keyof typeof b]
      const order = searchParams.sortOrder === 'desc' ? -1 : 1
      if (aVal < bVal) return -1 * order
      if (aVal > bVal) return 1 * order
      return 0
    })
  }

  // Apply pagination
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedUsers = filteredUsers.slice(start, end)

  return {
    users: paginatedUsers,
    total: filteredUsers.length,
    page,
    limit,
    totalPages: Math.ceil(filteredUsers.length / limit),
  }
}

function UsersTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Static page for static export - searchParams handled client-side
export default async function UsersPage() {
  // Use default/empty params for static generation
  const data = await getUsers({})

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your users and their permissions
          </p>
        </div>
        <Link href="/users/new">
          <Button variant="primary">Add New User</Button>
        </Link>
      </div>

      <Suspense fallback={<UsersTableSkeleton />}>
        <UserTable
          initialData={data}
          searchParams={{}}
        />
      </Suspense>
    </div>
  )
}
