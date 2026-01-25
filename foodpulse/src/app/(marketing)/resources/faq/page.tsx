import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { FAQ_PAGE_QUERY } from '@/lib/sanity/queries'
import { FAQJsonLd } from '@/components/faq/FAQJsonLd'
import { FAQPage } from '@/components/faq/FAQPage'
import type { FAQPageData } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Food & Nutrition FAQ | FoodPulse',
  description:
    'Find answers to common questions about food, nutrition, food labels, and healthy eating. Evidence-based answers from FoodPulse.',
  openGraph: {
    title: 'Food & Nutrition FAQ | FoodPulse',
    description: 'Answers to your food and nutrition questions',
    url: 'https://foodpulse.co/resources/faq',
  },
}

async function getFAQData(): Promise<FAQPageData> {
  const data = await client.fetch<FAQPageData>(FAQ_PAGE_QUERY, {}, { next: { revalidate: 3600 } })
  return data
}

export default async function FAQPageRoute() {
  const data = await getFAQData()

  // Flatten all FAQs for schema
  const allFaqs = data.categories.flatMap((cat) => cat.faqs)

  return (
    <>
      <FAQJsonLd faqs={allFaqs} />
      <FAQPage
        categories={data.categories}
        totalCount={data.totalCount}
        featuredFaqs={data.featuredFaqs}
      />
    </>
  )
}
