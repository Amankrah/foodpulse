import {defineField, defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'metadata', title: 'Metadata'},
    {name: 'seo', title: 'SEO'},
    {name: 'recipe', title: 'Recipe Data'},
  ],
  fields: [
    // CONTENT GROUP
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Brief description of the article (150-160 characters)',
      validation: (rule) => rule.required().min(100).max(160),
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO',
          validation: (rule) => rule.required().error('Alt text is required for accessibility'),
        }),
      ],
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'showTableOfContents',
      title: 'Show Table of Contents',
      type: 'boolean',
      description: 'Display a table of contents (auto-generated from H2/H3 headings)',
      initialValue: true,
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
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
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
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
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout',
          fields: [
            {
              name: 'type',
              type: 'string',
              options: {
                list: [
                  {title: 'Info', value: 'info'},
                  {title: 'Warning', value: 'warning'},
                  {title: 'Tip', value: 'tip'},
                ],
              },
            },
            {
              name: 'text',
              type: 'text',
            },
          ],
        },
        {
          type: 'embed',
        },
      ],
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'sources',
      title: 'Sources & References',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Source Title'},
            {name: 'url', type: 'url', title: 'URL'},
            {name: 'author', type: 'string', title: 'Author (optional)'},
            {name: 'year', type: 'string', title: 'Year (optional)'},
          ],
          preview: {
            select: {title: 'title', subtitle: 'url'},
          },
        },
      ],
      description: 'Academic sources and references for E-E-A-T',
      group: 'content',
    }),

    // METADATA GROUP
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (rule) => rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      group: 'metadata',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      group: 'metadata',
    }),
    defineField({
      name: 'reviewedAt',
      title: 'Last Reviewed',
      type: 'datetime',
      description: 'Date content was last fact-checked/reviewed (for E-E-A-T)',
      group: 'metadata',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Display this article prominently on the homepage',
      initialValue: false,
      group: 'metadata',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time. Leave empty to auto-calculate.',
      group: 'metadata',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}]}],
      validation: (rule) => rule.max(4).unique(),
      description: 'Select up to 4 related articles',
      group: 'metadata',
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{type: 'series'}],
      description: 'If this article is part of a series',
      group: 'metadata',
    }),
    defineField({
      name: 'seriesOrder',
      title: 'Order in Series',
      type: 'number',
      hidden: ({document}) => !document?.series,
      description: 'Position in the series (1, 2, 3...)',
      group: 'metadata',
    }),
    defineField({
      name: 'isRecipe',
      title: 'This is a Recipe Article',
      type: 'boolean',
      description: 'Enable to show recipe-specific fields',
      initialValue: false,
      group: 'metadata',
    }),

    // SEO GROUP
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Custom image for social sharing (1200x630px). Falls back to featured image.',
      options: {
        accept: 'image/*',
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
      group: 'seo',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'array',
      of: [{type: 'faqItem'}],
      description: 'Add FAQ items for rich snippets in search results',
      group: 'seo',
    }),

    // RECIPE GROUP
    defineField({
      name: 'recipeData',
      title: 'Recipe Information',
      type: 'recipeData',
      hidden: ({document}) => !document?.isRecipe,
      group: 'recipe',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      media: 'image',
      categoryTitle: 'category.title',
      metaDescription: 'seo.metaDescription',
    },
    prepare(selection) {
      const {authorName, categoryTitle, metaDescription} = selection
      const seoStatus = metaDescription ? '✓ SEO' : '⚠️ No meta'
      return {
        title: selection.title,
        subtitle: `${authorName || 'No author'} | ${categoryTitle || 'No category'} | ${seoStatus}`,
        media: selection.media,
      }
    },
  },
})
