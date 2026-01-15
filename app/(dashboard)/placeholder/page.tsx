import { ContentPlaceholder } from '@/components/common/content-placeholder'

/**
 * Placeholder page demonstrating the white rounded container design
 * This matches the Figma design: empty white rounded rectangle
 */
export default function PlaceholderPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 dark:bg-black">
      <ContentPlaceholder
        message="This is a placeholder container matching the Figma design"
        minHeight="md"
        className="w-full max-w-2xl"
      />
    </div>
  )
}
