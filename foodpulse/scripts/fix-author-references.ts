/**
 * Migration script to fix author references in articles
 * This removes the embedded name/bio fields and keeps only the reference
 *
 * Run with: npx sanity exec scripts/fix-author-references.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const query = `*[_type == "article" && defined(author) && defined(author.name)] {
  _id,
  _rev,
  author
}`

async function fixAuthorReferences() {
  const documents = await client.fetch(query)

  console.log(`Found ${documents.length} documents with malformed author references`)

  if (documents.length === 0) {
    console.log('No documents to fix!')
    return
  }

  const transaction = client.transaction()

  documents.forEach((doc: any) => {
    console.log(`Fixing document: ${doc._id}`)

    // Extract only the _ref and _type from the author field
    const fixedAuthor = {
      _ref: doc.author._ref,
      _type: 'reference',
    }

    transaction.patch(doc._id, {
      set: {
        author: fixedAuthor,
      },
    })
  })

  try {
    await transaction.commit()
    console.log('✅ Successfully fixed all author references!')
  } catch (error) {
    console.error('❌ Error fixing references:', error)
  }
}

fixAuthorReferences()
