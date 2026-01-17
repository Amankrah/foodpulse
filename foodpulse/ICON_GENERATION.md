# Icon Generation Guide

## Generated Icons

All icons have been generated from `public/foodpulse-logo.png`:

### Favicons
- **favicon.ico** - Standard favicon (32x32)
- **favicon-16x16.png** - Small favicon
- **favicon-32x32.png** - Standard favicon

### Mobile & PWA Icons
- **apple-touch-icon.png** - iOS home screen icon (180x180)
- **android-chrome-192x192.png** - Android icon (192x192)
- **android-chrome-512x512.png** - Android icon for high-res displays (512x512)

## How to Use

### Regenerate Icons
If you update the logo, run:
```bash
npm run generate:icons
```

This will regenerate all icon sizes from `public/foodpulse-logo.png`.

### Icon References

Icons are automatically referenced in:
- **src/app/layout.tsx** - Metadata icons configuration
- **src/app/manifest.ts** - PWA manifest icons

### Browser Support

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ iOS Safari (apple-touch-icon)
- ✅ Android Chrome (android-chrome icons)
- ✅ PWA installations (manifest icons)

## Technical Details

The icons are generated using the `sharp` library with:
- **Format**: PNG with transparent background
- **Fit**: Contain (preserves aspect ratio)
- **Background**: Transparent (alpha: 0)

## File Locations

```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
└── android-chrome-512x512.png
```

## Source Files

- **Generator Script**: `scripts/generate-icons.js`
- **Source Logo**: `public/foodpulse-logo.png` (512x512)
