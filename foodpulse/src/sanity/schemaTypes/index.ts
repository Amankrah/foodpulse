import { type SchemaTypeDefinition } from 'sanity'
import { articleType } from './articleType'
import { categoryType } from './categoryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [articleType, categoryType],
}
