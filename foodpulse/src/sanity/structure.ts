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
                        .title('🥗 Food and Wellbeing')
                        .child(
                          S.documentList()
                            .title('Food and Wellbeing')
                            .filter('_type == "glossaryTerm" && category == "food-and-wellbeing"')
                            .defaultOrdering([{field: 'term', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🍳 Kitchen and Cooking')
                        .child(
                          S.documentList()
                            .title('Kitchen and Cooking')
                            .filter('_type == "glossaryTerm" && category == "kitchen-and-cooking"')
                            .defaultOrdering([{field: 'term', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('📚 Food Literacy')
                        .child(
                          S.documentList()
                            .title('Food Literacy')
                            .filter('_type == "glossaryTerm" && category == "food-literacy"')
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
                        .title('💚 About FoodPulse')
                        .child(
                          S.documentList()
                            .title('About FoodPulse')
                            .filter('_type == "faqDocument" && category == "about-foodpulse"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🥗 Food and Wellbeing')
                        .child(
                          S.documentList()
                            .title('Food and Wellbeing')
                            .filter('_type == "faqDocument" && category == "food-and-wellbeing"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🍳 Kitchen and Cooking')
                        .child(
                          S.documentList()
                            .title('Kitchen and Cooking')
                            .filter('_type == "faqDocument" && category == "kitchen-and-cooking"')
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('📚 Food Literacy')
                        .child(
                          S.documentList()
                            .title('Food Literacy')
                            .filter('_type == "faqDocument" && category == "food-literacy"')
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
                        .title('🥗 Food and Wellbeing')
                        .child(
                          S.documentList()
                            .title('Food and Wellbeing Guides')
                            .filter('_type == "guide" && category == "food-and-wellbeing"')
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('🍳 Kitchen and Cooking')
                        .child(
                          S.documentList()
                            .title('Kitchen and Cooking Guides')
                            .filter('_type == "guide" && category == "kitchen-and-cooking"')
                            .apiVersion(apiVersion),
                        ),
                      S.listItem()
                        .title('📚 Food Literacy')
                        .child(
                          S.documentList()
                            .title('Food Literacy Guides')
                            .filter('_type == "guide" && category == "food-literacy"')
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
                    ]),
                ),

              S.divider(),

              // By Access
              S.listItem()
                .title('Guides')
                .child(
                  S.documentList()
                    .title('Guides')
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

      // Shop
      S.listItem()
        .title('Shop')
        .child(
          S.list()
            .title('Shop')
            .items([
              S.listItem()
                .title('All Products')
                .child(
                  S.documentTypeList('product')
                    .title('Products')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .apiVersion(apiVersion),
                ),
              S.listItem()
                .title('Published')
                .child(
                  S.documentList()
                    .title('Published Products')
                    .filter('_type == "product" && isPublished == true')
                    .apiVersion(apiVersion),
                ),
              S.listItem()
                .title('Unpublished')
                .child(
                  S.documentList()
                    .title('Unpublished')
                    .filter('_type == "product" && isPublished != true')
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
