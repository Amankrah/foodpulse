import {type SchemaTypeDefinition} from 'sanity'

// Document types
import {articleType} from './documents/articleType'
import {authorType} from './documents/authorType'
import {categoryType} from './documents/categoryType'
import {seriesType} from './documents/seriesType'
import {redirectType} from './documents/redirectType'
import {settingsType} from './documents/settingsType'

// Object types
import {seoType} from './objects/seoType'
import {faqItemType} from './objects/faqItemType'
import {recipeDataType} from './objects/recipeDataType'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Documents
    articleType,
    authorType,
    categoryType,
    seriesType,
    redirectType,
    settingsType,

    // Objects
    seoType,
    faqItemType,
    recipeDataType,
  ],
}
