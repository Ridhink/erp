import * as React from 'react'
import { cn } from '@/lib/utils/helpers'

interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'centered' | 'fullscreen'
  minHeight?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

/**
 * ContentContainer - A simple white rounded rectangle container
 * Matches the Figma design: white background with rounded corners
 */
export function ContentContainer({
  children,
  className,
  variant = 'default',
  minHeight = 'md',
  ...props
}: ContentContainerProps) {
  const variants = {
    default: '',
    centered: 'mx-auto max-w-7xl',
    fullscreen: 'h-screen w-screen',
  }

  const minHeights = {
    sm: 'min-h-[200px]',
    md: 'min-h-[400px]',
    lg: 'min-h-[600px]',
    xl: 'min-h-[800px]',
    full: 'min-h-screen',
  }

  return (
    <div
      className={cn(
        'rounded-2xl bg-white dark:bg-gray-900',
        variants[variant],
        minHeights[minHeight],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
