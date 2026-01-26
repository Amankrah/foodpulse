import { SITE_URL } from '@/lib/constants'

interface ToolJsonLdProps {
  title: string
  description: string
  slug?: string
}

export function ToolJsonLd({ title, description, slug }: ToolJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `FoodPulse ${title}`,
    description: description,
    url: slug ? `${SITE_URL}/tools/${slug}` : `${SITE_URL}/tools`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'FoodPulse',
      url: SITE_URL,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
