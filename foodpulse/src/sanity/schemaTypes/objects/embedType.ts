import {defineField, defineType} from 'sanity'

export const embedType = defineType({
  name: 'embed',
  title: 'Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'embedType',
      title: 'Embed Type',
      type: 'string',
      options: {
        list: [
          {title: 'LinkedIn Post', value: 'linkedin'},
          {title: 'Twitter/X Post', value: 'twitter'},
          {title: 'YouTube Video', value: 'youtube'},
          {title: 'Instagram Post', value: 'instagram'},
          {title: 'Custom HTML', value: 'custom'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The URL of the post/video to embed',
      hidden: ({parent}) => parent?.embedType === 'custom',
    }),
    defineField({
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
      description: 'Paste the embed code provided by the platform (LinkedIn, Twitter, etc.)',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption to display below the embed',
    }),
  ],
  preview: {
    select: {
      embedType: 'embedType',
      url: 'url',
      caption: 'caption',
    },
    prepare({embedType, url, caption}) {
      return {
        title: caption || `${embedType || 'Embed'}`,
        subtitle: url || 'Custom embed code',
      }
    },
  },
})
