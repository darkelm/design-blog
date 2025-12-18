# Custom Images Directory

Place your custom images here. They'll be accessible at `/images/your-image.jpg`

## Recommended Structure

```
public/
├── images/
│   ├── hero/          # Hero images
│   ├── logos/         # Logos and branding
│   ├── placeholders/  # Placeholder images
│   └── misc/          # Other images
```

## Usage in Components

```tsx
import Image from 'next/image'

// Local image from public folder
<Image
  src="/images/hero/my-custom-hero.jpg"
  alt="Description"
  width={1400}
  height={700}
/>
```

## Image Guidelines

- **Format**: JPG for photos, PNG for graphics/logos, WebP for best performance
- **Sizes**: 
  - Hero images: 1400x700px (2:1 ratio)
  - Card images: 800x500px (16:10 ratio)
  - Featured images: 1200x675px (16:9 ratio)
- **Optimization**: Compress before uploading (use tools like TinyPNG or ImageOptim)





