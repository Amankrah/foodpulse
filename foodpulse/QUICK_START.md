# 🚀 FoodPulse Sanity Quick Start Guide

Your Sanity schema has been fully enhanced! Follow these steps to get started.

---

## ✅ Step 1: Start Sanity Studio

```bash
npm run dev
```

Then navigate to: **http://localhost:3000/studio**

---

## ⚠️ IMPORTANT: Migration Required

Your existing articles use **inline author objects**. The new schema uses **author references**.

### What This Means:
- ❌ Existing articles will show "missing author"
- ✅ You need to create Author documents first
- ✅ Then update each article to reference the new authors

---

## 📝 Step 2: Create Your First Author

1. Go to Studio sidebar → **Authors** → **Create new**
2. Fill in:
   - **Name**: (e.g., "Etornam Akwofie")
   - **Slug**: Auto-generated
   - **Profile Photo**: Upload image with alt text
   - **Short Bio**: Max 300 characters
   - **Role**: (e.g., "Nutritionist", "Food Scientist")
   - **Credentials**: (Optional) Add qualifications
   - **Social Media**: (Optional) Add links

3. **Publish** the author

---

## 🔄 Step 3: Update Existing Articles

For each existing article:

1. Open the article
2. Go to **Metadata** tab
3. Find **Author** field (will show as empty or broken)
4. Select your newly created author
5. **Save** and **Publish**

---

## ⚙️ Step 4: Create Site Settings

1. Go to Studio sidebar → **Site Settings**
2. Fill in:
   - **Site Name**: "FoodPulse"
   - **Tagline**: "Explore all things food"
   - **Description**: Your default meta description
   - **Logo**: Upload your logo
   - **Social Links**: Add your social media URLs
   - **Default Author**: Select the author you created
   - **Footer Text**: Copyright notice
   - **Analytics ID**: (Optional) Your GA4 ID

3. **Publish**

---

## 📊 Step 5: Explore New Features

### Create a Recipe Article

1. **Articles** → **Create new**
2. Fill in basic fields (Title, Excerpt, Category, etc.)
3. Go to **Metadata** tab → Toggle **"This is a Recipe Article"** ✅
4. Go to **Recipe Data** tab (now visible!)
5. Fill in:
   - Prep/Cook/Resting times
   - Servings
   - Difficulty level
   - Ingredients (can create multiple groups)
   - Step-by-step instructions
   - Nutrition info (optional)
6. **Publish**

### Add FAQ Section (for Rich Snippets)

1. Edit any article
2. Go to **SEO** tab
3. Add **FAQ Section**
4. Click **Add item**
5. Enter Question & Answer
6. **Publish**

### Create a Series

1. **Series** → **Create new**
2. Add Title, Description, Cover Image
3. **Publish**
4. Go to your articles → **Metadata** tab → Select this Series
5. Set **Order in Series** (1, 2, 3...)

---

## 🎨 New Studio Features You'll See

### Article Preview
```
Article Title
By Author Name | Category | ✓ SEO
```
- ✅ Shows SEO status at a glance
- ⚠️ Warns if meta description is missing

### Organized Sidebar
```
Content
├── Articles
│   ├── All Articles
│   ├── By Category
│   ├── Featured Articles  ⭐
│   ├── Recipes  🍳
│   └── Drafts  📝
├── Authors
├── Categories
├── Series
├── Redirects
└── Site Settings
```

### Field Groups (Tabs)
Each article now has organized tabs:
- **Content**: Write your article
- **Metadata**: Dates, author, tags, series
- **SEO**: Meta fields, OG image, FAQ
- **Recipe**: Recipe-specific data (if `isRecipe` is true)

---

## 🔍 SEO Checklist (Every Article)

Before publishing, ensure:

- ✅ **Title**: Under 100 characters
- ✅ **Meta Description**: 120-160 characters (REQUIRED)
- ✅ **Featured Image**: With descriptive alt text
- ✅ **Author**: Selected
- ✅ **Category**: Selected
- ✅ **Excerpt**: 100-160 characters
- ✅ **Keywords**: At least 3 target keywords
- ✅ **Body**: Well-structured with H2/H3 headings

### Optional but Recommended:
- 📸 **OG Image**: Custom social share image (1200x630px)
- ❓ **FAQ**: Add FAQ items for rich snippets
- 📚 **Sources**: Add references for E-E-A-T
- 🔗 **Related Articles**: Select up to 4
- 📖 **Series**: Link to multi-part content

---

## 🍳 Recipe Schema Checklist

For recipe articles, ensure:

- ✅ **Toggle**: `isRecipe` is TRUE
- ✅ **Prep Time**: In minutes
- ✅ **Cook Time**: In minutes (optional)
- ✅ **Servings**: Number of servings
- ✅ **Ingredients**: Complete list with amounts
- ✅ **Instructions**: Step-by-step
- ✅ **Difficulty**: Easy/Medium/Hard

### Recommended for Recipe Schema:
- 🥗 **Diet**: Vegan, Gluten-free, etc.
- 🍽️ **Course**: Breakfast, Dinner, Dessert, etc.
- 🌍 **Cuisine**: Mediterranean, Asian, etc.
- 📊 **Nutrition**: Calories, protein, etc.
- 📝 **Notes**: Storage, variations, tips

---

## 🔧 Common Tasks

### Redirect an Old URL

1. **Redirects** → **Create new**
2. **Source Path**: `/old-article-slug`
3. **Destination Path**: `/new-article-slug`
4. **Permanent**: ✅ (for 301) or ❌ (for 302)
5. **Notes**: "URL cleanup" (optional)
6. **Publish**

Then implement in `next.config.js`:

```js
async redirects() {
  const redirects = await sanityClient.fetch(`*[_type == "redirect"]`)
  return redirects.map(r => ({
    source: r.source,
    destination: r.destination,
    permanent: r.permanent,
  }))
}
```

### Feature an Article

1. Edit article
2. **Metadata** tab
3. Toggle **Featured Article** ✅
4. **Publish**

### Create Category Landing Pages

Each category now has:
- Hero image
- SEO meta title & description
- Display order

Update in **Categories** section.

---

## 📖 Query Your New Data

See `GROQ_QUERIES.md` for complete query examples.

### Quick Example: Get Article with Author

```groq
*[_type == "article" && slug.current == $slug][0] {
  title,
  body,
  "author": author->{
    name,
    bio,
    credentials,
    image
  },
  "relatedArticles": relatedArticles[]->{
    title,
    "slug": slug.current
  }
}
```

---

## 🆘 Need Help?

- **Implementation Summary**: `SANITY_IMPLEMENTATION_SUMMARY.md`
- **Full Guide**: `foodpulse-sanity-schema-guide.md`
- **GROQ Queries**: `GROQ_QUERIES.md`
- **Sanity Docs**: https://www.sanity.io/docs

---

## 🎯 Next Steps

1. ✅ Create authors
2. ✅ Update existing articles
3. ✅ Create site settings
4. ✅ Test recipe schema
5. ✅ Add FAQ sections
6. ✅ Create series (if needed)
7. ✅ Update frontend GROQ queries
8. ✅ Implement redirects in Next.js

---

**Ready to publish amazing, SEO-optimized content!** 🚀
