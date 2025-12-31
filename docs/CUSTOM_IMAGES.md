# Using Custom Images

This guide explains how to use your own custom images in the blog.

---

## Option 1: Local Images (Recommended for Static Assets)

**Best for:** Logos, icons, static graphics, placeholder images

### Setup

1. Place images in the `public/images/` folder
2. Reference them with paths starting with `/images/`

### Example

```tsx
import Image from 'next/image'

<Image
  src="/images/hero/my-custom-image.jpg"
  alt="My custom image"
  width={1400}
  height={700}
  className="rounded-lg"
/>
```

### Advantages
- ✅ No configuration needed
- ✅ Fast (served from same domain)
- ✅ Works offline
- ✅ Full control

### Disadvantages
- ❌ Increases bundle size
- ❌ Not ideal for many large images
- ❌ Requires rebuild to update

---

## Option 2: Custom Domain/CDN

**Best for:** Hosting images on your own server or CDN

### Setup

1. Add your domain to `next.config.js`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.yourdomain.com',
    },
    // Or use wildcard for subdomains
    {
      protocol: 'https',
      hostname: '**.yourdomain.com',
    },
  ],
}
```

2. Use the full URL in components:

```tsx
<Image
  src="https://cdn.yourdomain.com/images/my-image.jpg"
  alt="Description"
  width={1400}
  height={700}
/>
```

### Advantages
- ✅ Can update images without rebuilding
- ✅ Can use CDN for performance
- ✅ Good for many images

### Disadvantages
- ❌ Requires hosting setup
- ❌ Need to manage image optimization yourself

---

## Option 3: Image Hosting Services

**Best for:** Easy image management, automatic optimization

### Popular Services

**Cloudinary** (Recommended)
```javascript
// Add to next.config.js
{
  protocol: 'https',
  hostname: 'res.cloudinary.com',
}
```

```tsx
<Image
  src="https://res.cloudinary.com/your-cloud/image/upload/v123/my-image.jpg"
  alt="Description"
  width={1400}
  height={700}
/>
```

**Imgix**
```javascript
{
  protocol: 'https',
  hostname: '**.imgix.net',
}
```

**Vercel Blob** (if deploying on Vercel)
- Built-in integration, no config needed
- Automatic optimization

---

## Image Optimization Guidelines

### Recommended Sizes

| Use Case | Dimensions | Aspect Ratio | Format |
|----------|-----------|--------------|--------|
| Hero images | 1400×700px | 2:1 | JPG/WebP |
| Featured cards | 1200×675px | 16:9 | JPG/WebP |
| Article cards | 800×500px | 16:10 | JPG/WebP |
| Author avatars | 200×200px | 1:1 | PNG/JPG |
| Logos | Variable | Original | PNG/SVG |

### Optimization Tips

1. **Compress before uploading**
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target: < 200KB for hero images, < 100KB for cards

2. **Use WebP when possible**
   - Better compression than JPG
   - Next.js automatically serves WebP to supported browsers

3. **Provide proper dimensions**
   - Always specify `width` and `height` props
   - Prevents layout shift (CLS)

4. **Use `priority` for above-the-fold images**
   ```tsx
   <Image
     src="/images/hero.jpg"
     alt="Hero"
     width={1400}
     height={700}
     priority  // Loads immediately
   />
   ```

---

## Using Custom Images in Ghost Posts

If you want to use custom images in Ghost posts:

1. **Upload to Ghost**: Use Ghost's built-in image uploader
   - Images are automatically optimized
   - Works seamlessly with the blog

2. **Use Ghost's CDN**: Ghost Pro includes image CDN
   - Already configured in `next.config.js`
   - Automatic optimization and resizing

3. **Custom Ghost Domain**: If self-hosting
   - Add your Ghost domain to `next.config.js`
   - Images will work automatically

---

## Example: Adding a Custom Logo

```tsx
// components/Header.tsx
import Image from 'next/image'

<Link href="/" className="flex items-center gap-3">
  <Image
    src="/images/logos/logo.svg"
    alt="Company Logo"
    width={32}
    height={32}
    className="rounded-lg"
  />
  <span className="font-semibold text-lg text-neutral-900">Company</span>
</Link>
```

---

## Troubleshooting

**Image not loading?**
- Check the path starts with `/` for local images
- Verify domain is added to `next.config.js` for external images
- Restart dev server after config changes

**Image looks blurry?**
- Ensure you're providing the correct `width` and `height`
- Use higher resolution source images
- Check if image is being optimized correctly

**Performance issues?**
- Compress images before uploading
- Use `priority` only for critical images
- Consider using a CDN for many images








