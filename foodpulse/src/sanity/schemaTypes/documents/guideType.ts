import {defineField, defineType} from 'sanity'

export const guideType = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media & Files'},
    {name: 'access', title: 'Access & Pricing'},
    {name: 'metadata', title: 'Metadata'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // === CONTENT GROUP ===
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Guide title (e.g., "The Complete Guide to Macronutrients")',
      validation: (rule) => rule.required().max(100),
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short compelling subtitle',
      validation: (rule) => rule.max(150),
      group: 'content',
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Brief description for cards and meta (150-200 chars)',
      validation: (rule) => rule.required().min(100).max(250),
      rows: 3,
      group: 'content',
    }),

    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
      description: 'Introduction shown before chapters',
      group: 'content',
    }),

    defineField({
      name: 'whatYoullLearn',
      title: "What You'll Learn",
      type: 'array',
      of: [{type: 'string'}],
      description: 'Bullet points of key takeaways (shown in hero)',
      validation: (rule) => rule.min(3).max(6),
      group: 'content',
    }),

    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          title: 'Chapter',
          fields: [
            {
              name: 'title',
              title: 'Chapter Title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'slug',
              title: 'Chapter Slug',
              type: 'slug',
              options: {source: 'title'},
              description: 'For anchor links',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H3', value: 'h3'},
                    {title: 'H4', value: 'h4'},
                    {title: 'Quote', value: 'blockquote'},
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Code', value: 'code'},
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
                        title: 'Glossary Term',
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
                {
                  type: 'object',
                  name: 'callout',
                  title: 'Callout Box',
                  fields: [
                    {
                      name: 'type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Info', value: 'info'},
                          {title: 'Tip', value: 'tip'},
                          {title: 'Warning', value: 'warning'},
                          {title: 'Example', value: 'example'},
                        ],
                      },
                    },
                    {name: 'title', type: 'string', title: 'Title (optional)'},
                    {name: 'content', type: 'text', title: 'Content'},
                  ],
                  preview: {
                    select: {type: 'type', content: 'content'},
                    prepare({type, content}) {
                      const icons: Record<string, string> = {
                        info: 'ℹ️',
                        tip: '💡',
                        warning: '⚠️',
                        example: '📝',
                      }
                      return {
                        title: `${icons[type] || '📌'} Callout`,
                        subtitle: content?.slice(0, 50) + '...',
                      }
                    },
                  },
                },
                {
                  type: 'object',
                  name: 'inlineCta',
                  title: 'Inline CTA',
                  fields: [
                    {name: 'text', type: 'string', title: 'CTA Text'},
                    {name: 'buttonText', type: 'string', title: 'Button Text'},
                    {name: 'link', type: 'url', title: 'Link'},
                  ],
                  preview: {
                    select: {text: 'text'},
                    prepare({text}) {
                      return {title: '📣 CTA', subtitle: text}
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {title: `📖 ${title}`}
            },
          },
        },
      ],
      description: 'Guide chapters/sections',
      group: 'content',
    }),

    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Summary points shown at the end',
      group: 'content',
    }),

    // === MEDIA GROUP ===
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
      group: 'media',
    }),

    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Square image for cards (optional, uses featured if not set)',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt Text'}],
      group: 'media',
    }),

    defineField({
      name: 'downloadFile',
      title: 'Downloadable PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'PDF version of the guide',
      group: 'media',
    }),

    defineField({
      name: 'downloadFileName',
      title: 'Download File Name',
      type: 'string',
      description: 'Name for the downloaded file (e.g., "macronutrients-guide-foodpulse.pdf")',
      group: 'media',
    }),

    // === ACCESS GROUP ===
    defineField({
      name: 'guideType',
      title: 'Guide Type',
      type: 'string',
      options: {
        list: [
          {title: 'Quick Guide', value: 'quick'},
          {title: 'Comprehensive Guide', value: 'comprehensive'},
          {title: 'Premium Guide', value: 'premium'},
          {title: 'Interactive Tool', value: 'tool'},
        ],
        layout: 'radio',
      },
      initialValue: 'comprehensive',
      validation: (rule) => rule.required(),
      group: 'access',
    }),

    defineField({
      name: 'accessType',
      title: 'Access Type',
      type: 'string',
      options: {
        list: [
          {title: 'Free (No Gate)', value: 'free'},
          {title: 'Email Gated', value: 'email-gated'},
          {title: 'Paid', value: 'paid'},
        ],
        layout: 'radio',
      },
      initialValue: 'free',
      validation: (rule) => rule.required(),
      group: 'access',
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in USD (for paid guides)',
      hidden: ({document}) => document?.accessType !== 'paid',
      group: 'access',
    }),

    defineField({
      name: 'purchaseLink',
      title: 'Purchase Link',
      type: 'url',
      description: 'Link to purchase (Gumroad, BMC, Stripe, etc.)',
      hidden: ({document}) => document?.accessType !== 'paid',
      group: 'access',
    }),

    defineField({
      name: 'previewContent',
      title: 'Preview Content',
      type: 'text',
      description: 'Teaser content shown before paywall (for paid guides)',
      hidden: ({document}) => document?.accessType !== 'paid',
      rows: 4,
      group: 'access',
    }),

    // === METADATA GROUP ===
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Nutrition Basics', value: 'nutrition'},
          {title: 'Meal Planning', value: 'meal-planning'},
          {title: 'Food Labels', value: 'food-labels'},
          {title: 'Healthy Eating', value: 'healthy-eating'},
          {title: 'Food Systems', value: 'food-systems'},
          {title: 'Tools & Calculators', value: 'tools'},
        ],
      },
      validation: (rule) => rule.required(),
      group: 'metadata',
    }),

    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
      initialValue: 'beginner',
      group: 'metadata',
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time',
      validation: (rule) => rule.min(1),
      group: 'metadata',
    }),

    defineField({
      name: 'relatedGuides',
      title: 'Related Guides',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'guide'}]}],
      validation: (rule) => rule.max(4).unique(),
      group: 'metadata',
    }),

    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}]}],
      validation: (rule) => rule.max(4).unique(),
      group: 'metadata',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'metadata',
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'metadata',
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured Guide',
      type: 'boolean',
      description: 'Show in featured section on hub page',
      initialValue: false,
      group: 'metadata',
    }),

    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      group: 'metadata',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'metadata',
    }),

    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      group: 'metadata',
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
          description: 'SEO title (60 chars max)',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description (155-160 chars)',
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          options: {layout: 'tags'},
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Custom OG image (1200x630px)',
        }),
      ],
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      guideType: 'guideType',
      accessType: 'accessType',
      isPublished: 'isPublished',
      media: 'featuredImage',
    },
    prepare({title, category, guideType, accessType, isPublished, media}) {
      const statusIcon = isPublished ? '✓' : '○'
      const typeIcon: Record<string, string> = {
        quick: '📄',
        comprehensive: '📚',
        premium: '💎',
        tool: '🔧',
      }
      const accessIcon: Record<string, string> = {
        free: '',
        'email-gated': '📧',
        paid: '💰',
      }

      return {
        title: `${statusIcon} ${title}`,
        subtitle: `${typeIcon[guideType] || '📖'} ${category} ${accessIcon[accessType] || ''}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Recently Published',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
})
