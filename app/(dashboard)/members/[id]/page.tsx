import { MemberProfileView } from '@/components/members/member-profile-view'

// Get member data (static for GitHub Pages)
function getMemberData(id: string) {
  // Mock member data - in production, fetch by ID
  const mockMember = {
    id,
    name: 'Sarah Chen',
    email: 'sarah@holidaypanda.com',
    avatar: undefined,
    role: 'team-lead' as const,
    teamId: 'team-1',
    teamName: 'Asia Pacific Team',
    memberSince: 'Dec 2024',
    // Performance data
    performance: {
      callsToday: 0,
      conversions: 0,
      totalRevenue: 0,
      productivityChange: 8,
      conversionRate: 12.5,
      conversionRateTarget: 15,
      dailyCallQuota: 0,
      dailyCallQuotaTarget: 25,
    },
  }

  return mockMember
}

// Generate static params for static export
export async function generateStaticParams() {
  // Return known member IDs for static generation
  // In a real app, this would fetch from your data source
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

export const dynamicParams = false

export default function MemberDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const member = getMemberData(params.id)

  if (!member) {
    return <div>Member not found</div>
  }

  return (
    <div className="mx-auto max-w-5xl">
      <MemberProfileView member={member} />
    </div>
  )
}
