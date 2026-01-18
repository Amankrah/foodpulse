# FoodPulse GROQ Query Reference

Complete GROQ queries for your enhanced Sanity schema.

---

## 📄 Article Queries

### Get All Published Articles (with pagination)

```groq
*[_type == "article" && defined(publishedAt)] | order(publishedAt desc) [0...12] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,

  "category": category->{
    title,
    "slug": slug.current,
    color,
    icon
  },

  "author": author->{
    name,
    "slug": slug.current,
    image {
      asset->{url},
      alt
    }
  },

  image {
    asset->{url, metadata},
    alt
  },

  "readingTime": coalesce(readingTime, round(length(pt::text(body)) / 5 / 200)),

  isRecipe,
  "recipePreview": select(
    isRecipe => {
      "prepTime": recipeData.prepTime,
      "cookTime": recipeData.cookTime,
      "servings": recipeData.servings,
      "difficulty": recipeData.difficulty
    }
  )
}
```

---

### Get Single Article (Complete)

```groq
*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishedAt,
  updatedAt,
  reviewedAt,
  featured,
  showTableOfContents,

  "category": category->{
    title,
    "slug": slug.current,
    color,
    icon,
    description
  },

  "author": author->{
    name,
    "slug": slug.current,
    bio,
    role,
    credentials,
    expertise,
    image {
      asset->{url},
      alt
    },
    social {
      twitter,
      linkedin,
      instagram,
      website
    }
  },

  image {
    asset->{url, metadata {dimensions, lqip}},
    alt
  },

  "ogImage": coalesce(
    ogImage.asset->url,
    image.asset->url
  ),

  seo {
    metaTitle,
    metaDescription,
    keywords,
    noIndex,
    canonicalUrl
  },

  tags,

  faq[] {
    question,
    answer
  },

  sources[] {
    title,
    url,
    author,
    year
  },

  isRecipe,
  recipeData {
    prepTime,
    cookTime,
    restingTime,
    servings,
    yield,
    difficulty,
    cuisine,
    course,
    diet,
    ingredientGroups[] {
      groupName,
      ingredients[] {
        amount,
        unit,
        ingredient,
        notes
      }
    },
    instructions[] {
      step,
      image {
        asset->{url},
        alt
      },
      tip
    },
    nutrition {
      calories,
      protein,
      carbohydrates,
      fat,
      fiber,
      sugar,
      sodium
    },
    notes
  },

  "relatedArticles": relatedArticles[]->{
    title,
    "slug": slug.current,
    excerpt,
    image {
      asset->{url},
      alt
    },
    "category": category->{
      title,
      color
    },
    "author": author->name,
    publishedAt
  },

  "series": series->{
    title,
    "slug": slug.current,
    description,
    isComplete,
    "articles": *[_type == "article" && references(^._id)] | order(seriesOrder asc) {
      title,
      "slug": slug.current,
      seriesOrder,
      excerpt
    }
  },

  seriesOrder,

  "readingTime": coalesce(readingTime, round(length(pt::text(body)) / 5 / 200))
}
```

---

### Get Articles by Category

```groq
{
  "category": *[_type == "category" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    color,
    icon,
    image {
      asset->{url},
      alt
    },
    seo {
      metaTitle,
      metaDescription
    }
  },

  "articles": *[_type == "article" && category->slug.current == $slug && defined(publishedAt)]
    | order(publishedAt desc) [0...$limit] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    image {
      asset->{url},
      alt
    },
    "author": author->{
      name,
      "slug": slug.current
    },
    "readingTime": coalesce(readingTime, round(length(pt::text(body)) / 5 / 200))
  },

  "total": count(*[_type == "article" && category->slug.current == $slug && defined(publishedAt)])
}
```

---

### Get Featured Articles

```groq
*[_type == "article" && featured == true && defined(publishedAt)]
  | order(publishedAt desc) [0...4] {
  title,
  "slug": slug.current,
  excerpt,
  image {
    asset->{url},
    alt
  },
  "category": category->{
    title,
    "slug": slug.current,
    color
  },
  "author": author->name,
  publishedAt
}
```

---

## 🍳 Recipe Queries

### Get All Recipes

```groq
*[_type == "article" && isRecipe == true && defined(publishedAt)]
  | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  image {
    asset->{url},
    alt
  },
  "category": category->{
    title,
    color
  },
  "prepTime": recipeData.prepTime,
  "cookTime": recipeData.cookTime,
  "totalTime": recipeData.prepTime + coalesce(recipeData.cookTime, 0) + coalesce(recipeData.restingTime, 0),
  "servings": recipeData.servings,
  "difficulty": recipeData.difficulty,
  "diet": recipeData.diet,
  "course": recipeData.course,
  "cuisine": recipeData.cuisine,
  publishedAt
}
```

---

### Filter Recipes by Dietary Needs

```groq
*[_type == "article"
  && isRecipe == true
  && defined(publishedAt)
  && $diet in recipeData.diet
] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  image {
    asset->{url},
    alt
  },
  "prepTime": recipeData.prepTime,
  "totalTime": recipeData.prepTime + coalesce(recipeData.cookTime, 0),
  "difficulty": recipeData.difficulty,
  "diet": recipeData.diet
}

// Use with: {diet: "vegan"} or {diet: "gluten-free"}
```

---

### Filter Recipes by Course

```groq
*[_type == "article"
  && isRecipe == true
  && defined(publishedAt)
  && recipeData.course == $course
] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  image {asset->{url}, alt},
  "totalTime": recipeData.prepTime + coalesce(recipeData.cookTime, 0)
}

// Use with: {course: "Breakfast"} or {course: "Dessert"}
```

---

## 👤 Author Queries

### Get Single Author with Articles

```groq
{
  "author": *[_type == "author" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    bio,
    fullBio,
    role,
    credentials,
    expertise,
    image {
      asset->{url},
      alt
    },
    social {
      twitter,
      linkedin,
      instagram,
      website
    },
    email,
    isFounder
  },

  "articles": *[_type == "article" && author._ref == ^.author._id && defined(publishedAt)]
    | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    image {
      asset->{url},
      alt
    },
    "category": category->{
      title,
      "slug": slug.current,
      color
    }
  },

  "articleCount": count(*[_type == "article" && author._ref == ^.author._id])
}
```

---

### Get All Authors

```groq
*[_type == "author"] | order(name asc) {
  name,
  "slug": slug.current,
  bio,
  role,
  image {
    asset->{url},
    alt
  },
  isFounder,
  "articleCount": count(*[_type == "article" && references(^._id)])
}
```

---

## 📚 Series Queries

### Get Single Series with Articles

```groq
{
  "series": *[_type == "series" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    image {
      asset->{url},
      alt
    },
    isComplete
  },

  "articles": *[_type == "article" && series._ref == ^.series._id]
    | order(seriesOrder asc) {
    title,
    "slug": slug.current,
    excerpt,
    seriesOrder,
    image {
      asset->{url},
      alt
    },
    publishedAt,
    "author": author->name
  }
}
```

---

## 🗂️ Category Queries

### Get All Categories (with article counts)

```groq
*[_type == "category"] | order(order asc, title asc) {
  title,
  "slug": slug.current,
  description,
  color,
  icon,
  order,
  "articleCount": count(*[_type == "article" && references(^._id)])
}
```

---

## ⚙️ Settings Query

### Get Site Settings

```groq
*[_type == "settings" && _id == "settings"][0] {
  siteName,
  tagline,
  description,
  logo {
    asset->{url},
    alt
  },
  favicon {
    asset->{url}
  },
  socialLinks {
    facebook,
    twitter,
    instagram,
    youtube,
    pinterest
  },
  "defaultAuthor": defaultAuthor->{
    name,
    "slug": slug.current
  },
  footerText,
  analyticsId
}
```

---

## 🔀 Redirect Queries

### Get All Redirects (for next.config.js)

```groq
*[_type == "redirect"] {
  source,
  destination,
  permanent
}
```

---

## 🗺️ Sitemap Query

### Get All URLs for Sitemap

```groq
{
  "articles": *[_type == "article" && defined(publishedAt)]
    | order(publishedAt desc) {
    "slug": slug.current,
    "category": category->slug.current,
    publishedAt,
    updatedAt
  },

  "categories": *[_type == "category"] {
    "slug": slug.current
  },

  "authors": *[_type == "author"] {
    "slug": slug.current
  },

  "series": *[_type == "series"] {
    "slug": slug.current
  }
}
```

---

## 🔍 Search Query

### Full-text Search

```groq
*[
  _type == "article"
  && (
    title match $searchTerm
    || excerpt match $searchTerm
    || pt::text(body) match $searchTerm
  )
  && defined(publishedAt)
] | order(publishedAt desc) [0...20] {
  title,
  "slug": slug.current,
  excerpt,
  "category": category->title,
  "author": author->name,
  image {
    asset->{url},
    alt
  }
}

// Use with: {searchTerm: "*fermentation*"}
```

---

## 📊 Analytics Queries

### Most Recent Articles

```groq
*[_type == "article" && defined(publishedAt)]
  | order(publishedAt desc) [0...10] {
  title,
  "slug": slug.current,
  publishedAt,
  "category": category->title,
  "author": author->name
}
```

---

### Articles by Publish Year

```groq
*[_type == "article"
  && defined(publishedAt)
  && publishedAt >= $yearStart
  && publishedAt < $yearEnd
] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt
}

// Use with:
// {yearStart: "2024-01-01T00:00:00Z", yearEnd: "2025-01-01T00:00:00Z"}
```

---

## 💡 Usage Tips

### 1. **Coalesce for Fallbacks**
```groq
"readingTime": coalesce(readingTime, round(length(pt::text(body)) / 5 / 200))
```

### 2. **Select for Conditionals**
```groq
"recipePreview": select(
  isRecipe => recipeData,
  null
)
```

### 3. **References**
```groq
// Forward reference
"author": author->{name}

// Reverse reference (all articles by this author)
"articles": *[_type == "article" && references(^._id)]
```

### 4. **Portable Text to Plain Text**
```groq
"bodyText": pt::text(body)
```

### 5. **Array Filtering**
```groq
// Check if value exists in array
$diet in recipeData.diet
```

---

## 🚀 Performance Tips

1. **Use projections** - Only fetch fields you need
2. **Limit results** - Use `[0...10]` for pagination
3. **Index commonly queried fields** - publishedAt, slug
4. **Cache queries** - Use Next.js ISR or SWR
5. **Use GROQ CDN** - For client-side queries

---

**Last Updated**: January 2026
**Sanity API Version**: Use the version from your `env.ts`
