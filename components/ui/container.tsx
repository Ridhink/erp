import * as React from 'react'
import { cn } from '@/lib/utils/helpers'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'mobile' | 'full'
}

export function Container({
  children,
  className,
  variant = 'default',
}: ContainerProps) {
  const variants = {
    default: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
    mobile: 'mx-auto max-w-md px-4 sm:px-6',
    full: 'w-full',
  }

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  )
}
