import type {StructureResolver} from 'sanity/structure'
import {apiVersion} from './env'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Articles Section
      S.listItem()
        .title('Articles')
        .child(
          S.list()
            .title('Articles')
            .items([
              // All Articles
              S.listItem()
                .title('All Articles')
                .child(S.documentTypeList('article').title('All Articles')),

              // By Category
              S.listItem()
                .title('By Category')
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Articles')
                        .filter('_type == "article" && category._ref == $categoryId')
                        .params({categoryId})
                        .apiVersion(apiVersion),
                    ),
                ),

              // Featured Articles
              S.listItem()
                .title('Featured Articles')
                .child(
                  S.documentList()
                    .title('Featured')
                    .filter('_type == "article" && featured == true')
                    .apiVersion(apiVersion),
                ),

              // Recipes
              S.listItem()
                .title('Recipes')
                .child(
                  S.documentList()
                    .title('Recipes')
                    .filter('_type == "article" && isRecipe == true')
                    .apiVersion(apiVersion),
                ),

              // Drafts
              S.listItem()
                .title('Drafts')
                .child(
                  S.documentList()
                    .title('Drafts')
                    .filter('_type == "article" && !defined(publishedAt)')
                    .apiVersion(apiVersion),
                ),
            ]),
        ),

      S.divider(),

      // Authors
      S.listItem()
        .title('Authors')
        .child(S.documentTypeList('author').title('Authors')),

      // Categories
      S.listItem()
        .title('Categories')
        .child(S.documentTypeList('category').title('Categories')),

      // Series
      S.listItem()
        .title('Series')
        .child(S.documentTypeList('series').title('Series')),

      S.divider(),

      // Glossary Section
      S.listItem()
        .title('Glossary')
        .child(
          S.list()
            .title('Glossary')
            .items([
              // All Terms
              S.listItem()
                .title('All Terms')
                .child(
                  S.documentTypeList('glossaryTerm')
                    .title('All Glossary Terms')
                    .defaultOrdering([{field: 'term', direction: 'asc'}]),
                ),

              // By Category
              S.listItem()
                .title('By Category')
                .child(
                  S.list()
                    .title('Categories')
                    .items([
                      S.listItem()
                        .title('🧬 Nutrition Science')
                        .child(
                          S.documentList()
                            .title('Nutrition Science')
                            .filter('_type == "glossaryTerm" && category == "nutrition-science"')
                            .defaultOrdering([{field: 'term', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🔬 Food Science')
                        .child(
                          S.documentList()
                            .title('Food Science')
                            .filter('_type == "glossaryTerm" && category == "food-science"')
                            .defaultOrdering([{field: 'term', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🌾 Food Systems')
                        .child(
                          S.documentList()
                            .title('Food Systems')
                            .filter('_type == "glossaryTerm" && category == "food-systems"')
                            .defaultOrdering([{field: 'term', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('💚 Health & Wellness')
                        .child(
                          S.documentList()
                            .title('Health & Wellness')
                            .filter('_type == "glossaryTerm" && category == "health-wellness"')
                            .defaultOrdering([{field: 'term', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🛒 Consumer & Practical')
                        .child(
                          S.documentList()
                            .title('Consumer & Practical')
                            .filter('_type == "glossaryTerm" && category == "consumer-practical"')
                            .defaultOrdering([{field: 'term', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🍳 Cooking & Kitchen')
                        .child(
                          S.documentList()
                            .title('Cooking & Kitchen')
                            .filter('_type == "glossaryTerm" && category == "cooking-kitchen"')
                            .defaultOrdering([{field: 'term', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                    ]),
                ),

              // Recently Updated
              S.listItem()
                .title('Recently Updated')
                .child(
                  S.documentList()
                    .title('Recently Updated')
                    .filter('_type == "glossaryTerm"')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                    .apiVersion(apiVersion),
                ),
            ]),
        ),

      S.divider(),

      // FAQ Section
      S.listItem()
        .title('FAQ')
        .child(
          S.list()
            .title('FAQ')
            .items([
              // All FAQs
              S.listItem()
                .title('All Questions')
                .child(
                  S.documentTypeList('faqDocument')
                    .title('All FAQ Items')
                    .defaultOrdering([
                      {field: 'category', direction: 'asc'},
                      {field: 'order', direction: 'asc'},
                    ])
                    .apiVersion(apiVersion),
                ),

              // By Category
              S.listItem()
                .title('By Category')
                .child(
                  S.list()
                    .title('Categories')
                    .items([
                      S.listItem()
                        .title('🏠 About FoodPulse')
                        .child(
                          S.documentList()
                            .title('About FoodPulse')
                            .filter('_type == "faqDocument" && category == "about-foodpulse"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🥗 Food & Nutrition')
                        .child(
                          S.documentList()
                            .title('Food & Nutrition')
                            .filter('_type == "faqDocument" && category == "food-nutrition"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🏷️ Food Labels')
                        .child(
                          S.documentList()
                            .title('Food Labels')
                            .filter('_type == "faqDocument" && category == "food-labels"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🌾 Food Systems')
                        .child(
                          S.documentList()
                            .title('Food Systems')
                            .filter('_type == "faqDocument" && category == "food-systems"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('💻 Using FoodPulse')
                        .child(
                          S.documentList()
                            .title('Using FoodPulse')
                            .filter('_type == "faqDocument" && category == "using-foodpulse"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                    ]),
                ),

              S.divider(),

              // Featured
              S.listItem()
                .title('⭐ Featured Questions')
                .child(
                  S.documentList()
                    .title('Featured')
                    .filter('_type == "faqDocument" && isFeatured == true')
                    .apiVersion(apiVersion),
                ),

              // Drafts
              S.listItem()
                .title('Unpublished')
                .child(
                  S.documentList()
                    .title('Unpublished')
                    .filter('_type == "faqDocument" && isPublished != true')
                    .apiVersion(apiVersion),
                ),
            ]),
        ),

      S.divider(),

      // Guides Section
      S.listItem()
        .title('Guides')
        .child(
          S.list()
            .title('Guides')
            .items([
              // All Guides
              S.listItem()
                .title('All Guides')
                .child(
                  S.documentTypeList('guide')
                    .title('All Guides')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                    .apiVersion(apiVersion),
                ),

              // By Type
              S.listItem()
                .title('By Type')
                .child(
                  S.list()
                    .title('Guide Types')
                    .items([
                      S.listItem()
                        .title('📄 Quick Guides')
                        .child(
                          S.documentList()
                            .title('Quick Guides')
                            .filter('_type == "guide" && guideType == "quick"')
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('📚 Comprehensive Guides')
                        .child(
                          S.documentList()
                            .title('Comprehensive Guides')
                            .filter('_type == "guide" && guideType == "comprehensive"')
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('💎 Premium Guides')
                        .child(
                          S.documentList()
                            .title('Premium Guides')
                            .filter('_type == "guide" && guideType == "premium"')
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🔧 Tools')
                        .child(
                          S.documentList()
                            .title('Interactive Tools')
                            .filter('_type == "guide" && guideType == "tool"')
                            .apiVersion(apiVersion),
                        ),
                    ]),
                ),

              // By Category
              S.listItem()
                .title('By Category')
                .child(
                  S.list()
                    .title('Categories')
                    .items([
                      S.listItem()
                        .title('🥗 Nutrition')
                        .child(
                          S.documentList()
                            .title('Nutrition Guides')
                            .filter('_type == "guide" && category == "nutrition"')
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('📅 Meal Planning')
                        .child(
                          S.documentList()
                            .title('Meal Planning Guides')
                            .filter('_type == "guide" && category == "meal-planning"')
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🏷️ Food Labels')
                        .child(
                          S.documentList()
                            .title('Food Label Guides')
                            .filter('_type == "guide" && category == "food-labels"')
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🍎 Healthy Eating')
                        .child(
                          S.documentList()
                            .title('Healthy Eating Guides')
                            .filter('_type == "guide" && category == "healthy-eating"')
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🌾 Food Systems')
                        .child(
                          S.documentList()
                            .title('Food Systems Guides')
                            .filter('_type == "guide" && category == "food-systems"')
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🔧 Tools')
                        .child(
                          S.documentList()
                            .title('Tools & Calculators')
                            .filter('_type == "guide" && category == "tools"')
                            .apiVersion(apiVersion),
                        ),
                    ]),
                ),

              S.divider(),

              // By Access
              S.listItem()
                .title('Free Guides')
                .child(
                  S.documentList()
                    .title('Free Guides')
                    .filter('_type == "guide" && accessType == "free"')
                    .apiVersion(apiVersion),
                ),
              S.listItem()
                .title('📧 Email Gated')
                .child(
                  S.documentList()
                    .title('Email Gated')
                    .filter('_type == "guide" && accessType == "email-gated"')
                    .apiVersion(apiVersion),
                ),
              S.listItem()
                .title('💰 Paid Guides')
                .child(
                  S.documentList()
                    .title('Paid Guides')
                    .filter('_type == "guide" && accessType == "paid"')
                    .apiVersion(apiVersion),
                ),

              S.divider(),

              // Featured
              S.listItem()
                .title('⭐ Featured')
                .child(
                  S.documentList()
                    .title('Featured Guides')
                    .filter('_type == "guide" && isFeatured == true')
                    .apiVersion(apiVersion),
                ),

              // Drafts
              S.listItem()
                .title('Unpublished')
                .child(
                  S.documentList()
                    .title('Unpublished')
                    .filter('_type == "guide" && isPublished != true')
                    .apiVersion(apiVersion),
                ),
            ]),
        ),

      S.divider(),

      // Redirects
      S.listItem()
        .title('Redirects')
        .child(S.documentTypeList('redirect').title('Redirects')),

      // Settings (Singleton)
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('settings')),
    ])
