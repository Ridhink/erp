import { CustomerIntelligenceView } from '@/components/leads/customer-intelligence-view'

// Get lead data (static for GitHub Pages)
function getLeadData(id: string) {
  // Mock lead data - in production, fetch by ID
  const mockLead = {
    id,
    leadId: 'L001',
    name: 'Robert Wilson',
    phone: '+1 555 123 4567',
    email: 'robert.wilson@email.com',
    source: 'website' as const,
    status: 'interested' as const,
    assignedTo: 'Sarah Lead',
    createdAt: new Date('2025-12-04T09:30:00').toISOString(),
    // Extended profile data
    fullName: 'Robert Wilson',
    occupation: 'Business Consultant',
    nationality: 'USA',
    tier: 'Bronze',
    tone: 'Positive',
    familyStructure: {
      travelGroup: 'Family of 4',
      specialOccasion: 'None',
    },
    negotiationInsight: {
      primaryTrigger: 'Luxury',
      priceSensitivity: 'Moderate',
      preferredContact: 'WhatsApp',
    },
    travelPreferences: ['Luxury', 'Family'],
    pastTours: [
      {
        id: '1',
        title: 'Swiss Alps Luxury Tour',
        date: 'Oct 2023',
        pax: 4,
        price: 4500,
        paymentMethod: 'PAID VIA CARD',
      },
      {
        id: '2',
        title: 'Bali Beach Retreat',
        date: 'Jun 2023',
        pax: 2,
        price: 3200,
        paymentMethod: 'PAID VIA CARD',
      },
    ],
    communicationHistory: [
      {
        id: '1',
        type: 'note' as const,
        author: 'Sarah Lead',
        role: 'Team Lead',
        timestamp: new Date().toISOString(),
        content: 'Spoke about the Swiss tour. Customer is very keen on the Glacier Express. Note: They are price sensitive regarding the flight upgrades but will pay premium for hotels.',
        tags: ['High Buying Intent', 'Negotiation Open'],
      },
      {
        id: '2',
        type: 'system' as const,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        content: 'Inquiry received for "Luxury Alpine Escape" via Website.',
      },
    ],
  }

  return mockLead
}

// Generate static params for static export
export async function generateStaticParams() {
  // Return known lead IDs for static generation
  // In a real app, this would fetch from your data source
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

export const dynamicParams = false

export default function LeadDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const lead = getLeadData(params.id)

  if (!lead) {
    return <div>Lead not found</div>
  }

  return (
    <div className="mx-auto max-w-5xl">
      <CustomerIntelligenceView lead={lead} />
    </div>
  )
}
