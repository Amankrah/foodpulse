import type {StructureResolver} from 'sanity/structure'

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
                        .params({categoryId}),
                    ),
                ),

              // Featured Articles
              S.listItem()
                .title('Featured Articles')
                .child(
                  S.documentList()
                    .title('Featured')
                    .filter('_type == "article" && featured == true'),
                ),

              // Recipes
              S.listItem()
                .title('Recipes')
                .child(
                  S.documentList()
                    .title('Recipes')
                    .filter('_type == "article" && isRecipe == true'),
                ),

              // Drafts
              S.listItem()
                .title('Drafts')
                .child(
                  S.documentList()
                    .title('Drafts')
                    .filter('_type == "article" && !defined(publishedAt)'),
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

      // Redirects
      S.listItem()
        .title('Redirects')
        .child(S.documentTypeList('redirect').title('Redirects')),

      // Settings (Singleton)
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('settings')),
    ])
