import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'pricing', title: 'Pricing' },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Product name',
      type: 'string',
      validation: (rule) => rule.required().max(120),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description for product cards and meta',
      rows: 3,
      validation: (rule) => rule.max(300),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Full description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      description: 'Optional longer description on the product page',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Product image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text', description: 'For accessibility' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
      group: 'content',
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Price in dollars (e.g. 9.99). Stored for display; Stripe uses cents.',
      validation: (rule) => rule.required().min(0).precision(2),
      group: 'pricing',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'usd',
      options: {
        list: [
          { title: 'USD', value: 'usd' },
          { title: 'EUR', value: 'eur' },
          { title: 'GBP', value: 'gbp' },
        ],
      },
      hidden: ({ document }) => !document?.price,
      group: 'pricing',
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      description:
        'Optional. If set, checkout uses this Stripe Price instead of price above. Use for recurring or exact Stripe sync.',
      group: 'pricing',
    }),
    defineField({
      name: 'productType',
      title: 'Product type',
      type: 'string',
      options: {
        list: [
          { title: 'Digital', value: 'digital' },
          { title: 'Physical', value: 'physical' },
        ],
      },
      initialValue: 'digital',
      group: 'pricing',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
      description: 'Unpublished products are hidden from the shop.',
      group: 'metadata',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image', price: 'price' },
    prepare({ title, media, price }) {
      return {
        title: title || 'Untitled product',
        media,
        subtitle: price != null ? `$${Number(price).toFixed(2)}` : undefined,
      }
    },
  },
})
