# HI-TECH COMPUTERS

A production-ready, highly optimized frontend for HI-TECH COMPUTERS, built with React, TypeScript, and Vite.

## Tech Stack
- **Framework:** React 18
- **Language:** TypeScript
- **Bundler:** Vite
- **Styling:** Vanilla CSS (Custom properties-based design system)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **SEO:** React Helmet Async

## Folder Structure

```
src/
├── components/          # Reusable UI and layout components
│   ├── layout/          # Header, Footer, Layout wrapper
│   └── ui/              # Button, ServiceCard, MapFallback
├── config/              # Centralized configuration
│   └── business.ts      # Business details (name, phone, hours, etc.)
├── data/                # Mock/static data
│   ├── portfolio.ts     # Gallery items for 'Our Work'
│   └── services.ts      # Services catalog
├── pages/               # Page-level components and styles
├── App.tsx              # Main application router
├── index.css            # Global CSS, CSS variables, and design system
└── main.tsx             # Application entry point
```

## How to Edit Business Information

All core business details (phone number, WhatsApp number, email, hours, taglines) are centralized in `src/config/business.ts`. 
If the phone number changes, update it in that one file and it will reflect across the entire website (Header, Footer, Contact page, WhatsApp links).

## How to Edit Services and Portfolio

- **Services:** Edit `src/data/services.ts`. You can add new objects to the array or modify existing ones.
- **Portfolio:** Edit `src/data/portfolio.ts`. To replace the Unsplash placeholder images with real photos, place the real photos in `public/images/work/` and update the `imageUrl` field to point to `/images/work/your-image.jpg`.

## Google Maps Setup

Currently, the Service Area page uses a graceful fallback UI (`MapFallback.tsx`) as requested.
To add a real Google Map later:
1. Obtain a Google Maps API Key.
2. Install a library like `@react-google-maps/api`.
3. Create a `.env` file and add `VITE_GOOGLE_MAPS_API_KEY=your_key`.
4. Replace the `MapFallback` component in `ServiceArea.tsx` with the actual map component.

## WhatsApp Configuration

WhatsApp links are dynamically generated using the number provided in `business.ts`. The links are configured to pre-fill specific messages based on the context (e.g., requesting a quote vs. requesting a visit).

## Deployment Instructions

This project is ready to be deployed to any static hosting provider (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

### Build for Production

```bash
npm install
npm run build
```

This will generate a `dist` folder containing the compiled, minified production assets.

### Deploying to Netlify / Cloudflare Pages

1. Connect your GitHub repository to Netlify/Cloudflare.
2. Set the **Build Command** to `npm run build`.
3. Set the **Publish Directory** to `dist`.
4. A `public/_redirects` file is included to ensure client-side routing works correctly.

### Post-Deployment Checklist

- Connect your custom domain.
- Verify that HTTPS is active.
- Submit the `https://hitechcomputers.com/sitemap.xml` to Google Search Console to speed up indexing.
- Update the `robots.txt` and `sitemap.xml` domain if your final domain differs from `hitechcomputers.com`.
