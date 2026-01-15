import * as React from 'react'
import { cn } from '@/lib/utils/helpers'

interface PanelProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
}

export function Panel({
  children,
  className,
  variant = 'default',
}: PanelProps) {
  const variants = {
    default: 'bg-white dark:bg-gray-900',
    elevated: 'bg-white shadow-lg dark:bg-gray-900',
    outlined: 'border border-gray-200 bg-transparent dark:border-gray-800',
  }

  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  )
}
