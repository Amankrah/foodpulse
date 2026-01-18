import {defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      description: 'Brief bio for article bylines (max 300 characters)',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Extended bio for author page',
    }),
    defineField({
      name: 'role',
      title: 'Role/Job Title',
      type: 'string',
      description: 'e.g., "Nutritionist", "Food Scientist"',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Professional qualifications (e.g., "PhD in Food Science", "Registered Dietitian")',
    }),
    defineField({
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Topics the author specializes in (for E-E-A-T)',
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'website',
          title: 'Website',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'isFounder',
      title: 'Founder/Primary Author',
      type: 'boolean',
      description: 'Mark as primary author for the site',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
