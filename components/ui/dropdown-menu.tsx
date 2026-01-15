'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/helpers'

interface DropdownMenuItem {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'danger'
}

interface DropdownMenuProps {
  items: DropdownMenuItem[]
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function DropdownMenu({
  items,
  isOpen,
  onClose,
  className,
}: DropdownMenuProps) {
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          onClose()
        }
      }

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu */}
      <div
        ref={menuRef}
        className={cn(
          'absolute right-0 z-50 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-900 dark:ring-gray-800',
          className
        )}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="py-1">
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                item.onClick()
                onClose()
              }}
              className={cn(
                'flex w-full items-center gap-3 px-4 py-2 text-sm font-medium transition-colors',
                'hover:bg-gray-100 dark:hover:bg-gray-800',
                item.variant === 'danger'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-700 dark:text-gray-300'
              )}
              role="menuitem"
            >
              {item.icon && (
                <span
                  className={cn(
                    'flex-shrink-0',
                    item.variant === 'danger'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function DropdownMenuTrigger({
  children,
  isOpen,
  onToggle,
  className,
}: DropdownMenuTriggerProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
        className
      )}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {children}
    </button>
  )
}
