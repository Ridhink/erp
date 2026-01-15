import { MemberProfileView } from '@/components/members/member-profile-view'
import { notFound } from 'next/navigation'

// Server Component - fetches member data
async function getMemberData(id: string) {
  // In production, this would fetch from your API
  await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate API delay

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

export default async function MemberDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const member = await getMemberData(params.id)

  if (!member) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-5xl">
      <MemberProfileView member={member} />
    </div>
  )
}
