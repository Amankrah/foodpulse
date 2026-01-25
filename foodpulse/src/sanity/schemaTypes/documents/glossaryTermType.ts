import {defineField, defineType} from 'sanity'

export const glossaryTermType = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'relationships', title: 'Relationships'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // === CONTENT GROUP ===
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      description: 'The term being defined (e.g., "Macronutrients")',
      validation: (rule) => rule.required().max(100),
      group: 'content',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'term',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'pronunciation',
      title: 'Pronunciation',
      type: 'string',
      description: 'Phonetic pronunciation (e.g., "mak-roh-NOO-tree-ents")',
      group: 'content',
    }),

    defineField({
      name: 'shortDefinition',
      title: 'Short Definition',
      type: 'text',
      description: 'One-sentence definition (for cards and AI citations). 150-200 characters.',
      validation: (rule) => [
        rule.required().error('Short definition is required'),
        rule.min(50).warning('Definition seems too short'),
        rule.max(250).warning('Keep under 250 characters for snippets'),
      ],
      rows: 3,
      group: 'content',
    }),

    defineField({
      name: 'fullDefinition',
      title: 'Full Definition',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
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
              {
                name: 'glossaryLink',
                type: 'object',
                title: 'Glossary Term Link',
                fields: [
                  {
                    name: 'term',
                    type: 'reference',
                    to: [{type: 'glossaryTerm'}],
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
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (rule) => rule.required(),
            },
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
        },
      ],
      description: 'Expanded explanation with examples, context, and details',
      validation: (rule) => rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'example',
      title: 'Example in Context',
      type: 'text',
      description: 'A practical example showing how this term is used or applied',
      rows: 3,
      group: 'content',
    }),

    defineField({
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'text',
      description: 'Brief explanation of why this concept is important for consumers',
      rows: 3,
      group: 'content',
    }),

    defineField({
      name: 'commonMisconceptions',
      title: 'Common Misconceptions',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Myths or misunderstandings about this term',
      group: 'content',
    }),

    // === RELATIONSHIPS GROUP ===
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Nutrition Science', value: 'nutrition-science'},
          {title: 'Food Science', value: 'food-science'},
          {title: 'Food Systems', value: 'food-systems'},
          {title: 'Health & Wellness', value: 'health-wellness'},
          {title: 'Consumer & Practical', value: 'consumer-practical'},
          {title: 'Cooking & Kitchen', value: 'cooking-kitchen'},
        ],
      },
      validation: (rule) => rule.required(),
      group: 'relationships',
    }),

    defineField({
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'glossaryTerm'}]}],
      description: 'Other glossary terms related to this one',
      validation: (rule) => rule.max(6),
      group: 'relationships',
    }),

    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}]}],
      description: 'Articles that discuss this term in depth',
      validation: (rule) => rule.max(5),
      group: 'relationships',
    }),

    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Source Title'},
            {name: 'url', type: 'url', title: 'URL'},
            {name: 'organization', type: 'string', title: 'Organization'},
          ],
          preview: {
            select: {title: 'title', subtitle: 'organization'},
          },
        },
      ],
      description: 'Authoritative sources for this definition',
      group: 'relationships',
    }),

    // === SEO GROUP ===
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title (default: "[Term] — Definition | FoodPulse Glossary")',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description (default: uses short definition)',
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          options: {layout: 'tags'},
        }),
      ],
      group: 'seo',
    }),

    // === METADATA ===
    defineField({
      name: 'letter',
      title: 'Starting Letter',
      type: 'string',
      description: 'Auto-populated for A-Z navigation',
      readOnly: true,
      hidden: true,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'term',
      subtitle: 'category',
      definition: 'shortDefinition',
    },
    prepare({title, subtitle, definition}) {
      const categoryLabels: Record<string, string> = {
        'nutrition-science': '🧬 Nutrition',
        'food-science': '🔬 Food Science',
        'food-systems': '🌾 Food Systems',
        'health-wellness': '💚 Health',
        'consumer-practical': '🛒 Consumer',
        'cooking-kitchen': '🍳 Cooking',
      }
      return {
        title,
        subtitle: `${categoryLabels[subtitle] || subtitle} — ${definition?.slice(0, 50)}...`,
      }
    },
  },

  orderings: [
    {
      title: 'Term (A-Z)',
      name: 'termAsc',
      by: [{field: 'term', direction: 'asc'}],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'term', direction: 'asc'},
      ],
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{field: 'updatedAt', direction: 'desc'}],
    },
  ],
})
