# FoodPulse

A Next.js web app for evidence-based food education. It offers guides, articles, and simple tools to help people make smarter food choices and understand nutrition.

Content is managed in Sanity CMS. The site includes calculators (e.g. BMI, calories, macros), a searchable glossary and FAQ, newsletter and contact forms, and is built to deploy on Vercel or any Node-friendly host.

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** React, Tailwind CSS, Radix UI, Framer Motion
- **CMS:** Sanity (articles, guides, glossary, FAQ, authors)
- **Email:** Resend (contact, newsletter)
- **Analytics:** Vercel Analytics & Speed Insights

## Getting Started

Install dependencies, set any required environment variables for Sanity and your email/API services, then run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|--------|--------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run generate:icons` | Generate icon assets |

## Project Overview

- **Content:** Articles by category, guides, glossary, and FAQ—all editable in Sanity. Sanity Studio is available at `/studio`.
- **Tools:** Nutrition and health calculators (BMI, calorie, macro, protein, fiber, caffeine, hydration).
- **Features:** Site search, newsletter signup, contact form, sitemap, and structured data (JSON-LD) for SEO.

## Deployment

The app can be deployed to Vercel or any platform that supports Next.js. Configure environment variables in your hosting dashboard to match your Sanity project and any other services.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
