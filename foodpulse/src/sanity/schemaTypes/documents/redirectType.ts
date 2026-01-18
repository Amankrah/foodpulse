import {defineField, defineType} from 'sanity'

export const redirectType = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Source Path',
      type: 'string',
      description: 'Old URL path (e.g., /old-article-slug)',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.startsWith('/')) {
            return 'Path must start with /'
          }
          return true
        }),
    }),
    defineField({
      name: 'destination',
      title: 'Destination Path',
      type: 'string',
      description: 'New URL path (e.g., /new-article-slug)',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.startsWith('/')) {
            return 'Path must start with /'
          }
          return true
        }),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent Redirect',
      type: 'boolean',
      description: '301 (permanent) or 302 (temporary)',
      initialValue: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Reason for this redirect',
    }),
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      permanent: 'permanent',
    },
    prepare({source, destination, permanent}) {
      return {
        title: source,
        subtitle: `→ ${destination} (${permanent ? '301' : '302'})`,
      }
    },
  },
})
