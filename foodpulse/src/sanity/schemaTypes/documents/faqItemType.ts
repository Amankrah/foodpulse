import {defineField, defineType} from 'sanity'

export const faqItemType = defineType({
  name: 'faqDocument',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    // Question
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The question being asked (start with "What", "How", "Why", etc.)',
      validation: (rule) => [
        rule.required().error('Question is required'),
        rule.max(200).warning('Keep questions concise'),
      ],
    }),

    // Slug (for direct linking)
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'question',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[?]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),

    // Short Answer (for schema/snippets)
    defineField({
      name: 'shortAnswer',
      title: 'Short Answer',
      type: 'text',
      description: 'Concise answer (1-3 sentences). Used in schema markup and search snippets.',
      validation: (rule) => [
        rule.required().error('Short answer is required'),
        rule.min(50).warning('Answer should be at least 50 characters'),
        rule.max(500).warning('Keep short answer under 500 characters for snippets'),
      ],
      rows: 4,
    }),

    // Full Answer (expanded content)
    defineField({
      name: 'fullAnswer',
      title: 'Full Answer (Optional)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H4', value: 'h4'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  },
                ],
              },
            ],
          },
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
      ],
      description: 'Extended answer with more detail (shown when expanded)',
    }),

    // Category
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'About FoodPulse', value: 'about-foodpulse'},
          {title: 'Food & Nutrition Basics', value: 'food-nutrition'},
          {title: 'Understanding Food Labels', value: 'food-labels'},
          {title: 'Food Systems & Sustainability', value: 'food-systems'},
          {title: 'Using FoodPulse', value: 'using-foodpulse'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),

    // Related Content
    defineField({
      name: 'relatedArticle',
      title: 'Related Article',
      type: 'reference',
      to: [{type: 'article'}],
      description: 'Link to an article that covers this topic in depth',
    }),

    defineField({
      name: 'relatedGlossaryTerm',
      title: 'Related Glossary Term',
      type: 'reference',
      to: [{type: 'glossaryTerm'}],
      description: 'Link to a glossary term for more definition',
    }),

    // Metadata
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within category (lower = first)',
      initialValue: 99,
    }),

    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured Question',
      type: 'boolean',
      description: 'Show this question prominently at the top',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'question',
      category: 'category',
      isPublished: 'isPublished',
      isFeatured: 'isFeatured',
    },
    prepare({title, category, isPublished, isFeatured}) {
      const status = isPublished ? (isFeatured ? '⭐' : '✓') : '○'
      const categoryLabels: Record<string, string> = {
        'about-foodpulse': '🏠 About',
        'food-nutrition': '🥗 Nutrition',
        'food-labels': '🏷️ Labels',
        'food-systems': '🌾 Systems',
        'using-foodpulse': '💻 Using',
      }
      return {
        title: `${status} ${title}`,
        subtitle: categoryLabels[category] || category,
      }
    },
  },

  orderings: [
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{field: 'updatedAt', direction: 'desc'}],
    },
  ],
})
