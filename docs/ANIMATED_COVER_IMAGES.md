# Animated Cover Images in Ghost

This guide explains how to use GIFs and MP4 videos as cover images in Ghost CMS.

---

## Ghost Support

**Ghost CMS supports:**
- ✅ **GIFs** - Fully supported, can be uploaded as feature images
- ✅ **MP4 Videos** - Can be uploaded, but require custom handling in your theme

---

## How to Add Animated Cover Images

### Method 1: Upload in Ghost Admin

1. Go to Ghost Admin → Posts → Edit Post
2. Click "Add feature image"
3. Upload your GIF or MP4 file
4. Ghost will store the URL in `post.feature_image`
5. The `AnimatedCoverImage` component will automatically detect and render it

### Method 2: Use External URLs

You can also use external URLs:
- Upload to Cloudinary, Imgur, or similar
- Paste the URL in Ghost's feature image field
- Make sure the URL ends with `.gif`, `.mp4`, `.webm`, or `.mov`

---

## Using AnimatedCoverImage Component

The `AnimatedCoverImage` component automatically detects file types and renders appropriately:

```tsx
import { AnimatedCoverImage } from '@/components'

<AnimatedCoverImage
  post={post}
  className="w-full aspect-[4/3] object-cover rounded-xl"
  priority={true}
  width={1200}
  height={675}
/>
```

### Features

- **Auto-detection**: Detects GIF, MP4, or static image
- **GIF support**: Renders GIFs with `<img>` tag
- **Video support**: Renders MP4s with `<video>` tag (autoplay, loop, muted)
- **Fallback**: Falls back to static image if detection fails
- **Next.js Image**: Uses Next.js Image component for static images (optimization)

---

## File Type Detection

The component detects file types by URL extension:

- `.gif` → Rendered as `<img>` (animated GIF)
- `.mp4`, `.webm`, `.mov` → Rendered as `<video>` (autoplay, loop, muted)
- Everything else → Rendered as Next.js `<Image>` (optimized static image)

---

## Best Practices

### GIFs

- **Size**: Keep GIFs under 2MB for performance
- **Dimensions**: Use appropriate dimensions (don't upload 4K GIFs)
- **Optimization**: Use tools like [EZGIF](https://ezgif.com/optimize) to compress
- **Duration**: Shorter loops (2-5 seconds) work best

### MP4 Videos

- **Format**: Use MP4 (H.264 codec) for best compatibility
- **Size**: Keep videos under 5MB for cover images
- **Duration**: 3-10 seconds works best for loops
- **Resolution**: 1920x1080 max, often 1280x720 is sufficient
- **Compression**: Use tools like [HandBrake](https://handbrake.fr/) to compress

### Performance

- **Lazy loading**: Videos/GIFs load when in viewport (unless `priority={true}`)
- **CDN**: Use Ghost's CDN or Cloudinary for faster delivery
- **Fallback**: Always provide a static image fallback

---

## Example: Hero Section with Animated Cover

```tsx
import { AnimatedCoverImage } from '@/components'

export function Hero({ post }: HeroProps) {
  return (
    <div>
      <AnimatedCoverImage
        post={post}
        className="w-full aspect-[4/3] object-cover rounded-xl"
        priority
      />
    </div>
  )
}
```

---

## Troubleshooting

**GIF not animating?**
- Check file size (browsers may not animate very large GIFs)
- Ensure the URL ends with `.gif`
- Check browser console for errors

**Video not playing?**
- Videos require autoplay policies (muted, loop, playsInline)
- Some browsers block autoplay - user interaction may be needed
- Check video codec (H.264 works best)

**Performance issues?**
- Compress GIFs/videos before uploading
- Use `priority={false}` for below-the-fold images
- Consider using static images for mobile devices

---

## Alternatives

If Ghost's built-in support isn't enough:

1. **Cloudinary**: Upload GIFs/videos to Cloudinary, use their transformation API
2. **Vimeo/YouTube**: Embed videos as iframes (not recommended for cover images)
3. **Custom fields**: Use Ghost's custom fields to store video URLs separately

---

## Resources

- [Ghost Image Upload Guide](https://ghost.org/docs/themes/)
- [GIF Optimization Tools](https://ezgif.com/)
- [Video Compression Guide](https://handbrake.fr/docs/)








