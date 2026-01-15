import { ContentContainer } from '@/components/ui/content-container'

interface ContentPlaceholderProps {
  message?: string
  minHeight?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

/**
 * ContentPlaceholder - An empty white rounded container
 * Used for loading states, empty states, or content placeholders
 * Matches the Figma design: empty white rounded rectangle on dark background
 */
export function ContentPlaceholder({
  message = 'Content will appear here',
  minHeight = 'md',
  className,
}: ContentPlaceholderProps) {
  return (
    <ContentContainer
      variant="centered"
      minHeight={minHeight}
      className={className}
    >
      {message && (
        <div className="flex h-full items-center justify-center p-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {message}
          </p>
        </div>
      )}
    </ContentContainer>
  )
}
