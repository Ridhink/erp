'use client'

import * as React from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'

interface MainLayoutProps {
  children: React.ReactNode
  navItems: Array<{
    label: string
    href: string
    icon?: React.ReactNode
  }>
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export function MainLayout({ children, navItems, user }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        items={navItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden lg:pl-64">
        {/* Header */}
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          user={user}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-black lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
