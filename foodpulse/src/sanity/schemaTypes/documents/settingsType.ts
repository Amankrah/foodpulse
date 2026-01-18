import {defineField, defineType} from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline for the site',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Default meta description for the site',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (32x32px recommended)',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        }),
        defineField({
          name: 'pinterest',
          title: 'Pinterest',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'defaultAuthor',
      title: 'Default Author',
      type: 'reference',
      to: [{type: 'author'}],
      description: 'Fallback author for articles without an assigned author',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      description: 'Copyright and additional footer text',
    }),
    defineField({
      name: 'analyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      description: 'GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
