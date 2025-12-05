# Image Pipeline

Consistent image treatment is where design blogs often get sloppy. This document defines the standards and process for all imagery.

---

## Image Specifications

### Featured Images

Used in hero sections, article cards, and social sharing.

| Context | Aspect Ratio | Dimensions | Max File Size |
|---------|--------------|------------|---------------|
| Hero (post page) | 2:1 | 1400 × 700px | 250KB |
| Card (homepage, archives) | 16:10 | 800 × 500px | 150KB |
| Social sharing (OG image) | 1.91:1 | 1200 × 630px | 200KB |

Ghost will use the same uploaded image for all contexts, so **optimize for the largest use case (1400px wide)** and let Ghost handle resizing.

### Inline Content Images

Images within the article body.

| Type | Max Width | Format | Notes |
|------|-----------|--------|-------|
| Full-width images | 1200px | WebP or JPG | For hero shots, key visuals |
| Standard images | 800px | WebP or JPG | Most inline images |
| Small/aside images | 400px | WebP or PNG | Diagrams, icons, small illustrations |

### Author Avatars

| Dimensions | Format | Notes |
|------------|--------|-------|
| 400 × 400px | WebP or JPG | Square, will be displayed circular |

Upload at 400px even though display is smaller—accounts for retina screens.

---

## Format Guidelines

### Preferred Formats

1. **WebP** — Best compression, wide support. Use for photos and complex images.
2. **JPG** — Fallback if WebP isn't feasible. Use 80-85% quality.
3. **PNG** — Only for images requiring transparency or sharp edges (logos, diagrams with text).

### Avoid

- **GIF** — Use MP4/WebM for animations
- **BMP, TIFF** — Not web formats
- **Uncompressed PNG for photos** — File size will be huge

---

## Standard Treatments

To maintain visual consistency, apply these treatments to relevant images.

### Screenshots

Never let screenshots float raw. Always add:

- **Padding:** 40-60px around the screenshot
- **Background:** Light gray (`#F5F5F5`) or your brand's light neutral
- **Corner radius:** 8px on the screenshot itself (if it doesn't already have UI chrome)
- **Shadow:** Subtle drop shadow: `0 4px 24px rgba(0,0,0,0.08)`

### Browser/Device Frames

For UI work, consider wrapping in:

- **Browser chrome:** Simple, minimal browser frame (no specific brand)
- **Device frames:** For mobile, use generic device frames (not specific iPhone/Android models that date quickly)

Keep frames subtle. The UI is the focus, not the frame.

### Before/After Images

For comparisons:

- Use consistent dimensions for both
- Side-by-side preferred over stacked
- Add subtle divider or labels ("Before" / "After")
- Consider slider interaction if building custom component

### Diagrams and Illustrations

- Maintain consistent stroke weight (2px recommended)
- Use your color palette, not random colors
- Export at 2x for retina clarity
- Add generous padding

---

## Figma Template

Create a Figma file with pre-built frames for each image type.

### Template Structure

```
📁 Blog Image Templates
├── 📄 Featured Images
│   ├── Frame: Hero (1400 × 700)
│   ├── Frame: Social/OG (1200 × 630)
│   └── Guidelines
├── 📄 Screenshots
│   ├── Frame: Full-width screenshot
│   ├── Frame: Standard screenshot
│   ├── Browser frame component
│   └── Device frame components
├── 📄 Diagrams
│   ├── Template with grid
│   └── Icon/shape library
└── 📄 Author Avatars
    └── Frame: Avatar (400 × 400)
```

### How Authors Use It

1. Duplicate the appropriate frame
2. Drop in their image/content
3. Apply any standard treatments (the frame may have these built in)
4. Export using the export settings on the frame (pre-configured)
5. Run through compression (see below)
6. Upload to Ghost

---

## Compression Workflow

Always compress before uploading to Ghost. Ghost serves whatever you give it.

### Tools

**Web-based:**
- [Squoosh](https://squoosh.app) — Google's tool, excellent for one-off images
- [TinyPNG](https://tinypng.com) — Good for batch processing

**Desktop:**
- [ImageOptim](https://imageoptim.com) (Mac) — Drag and drop, lossless + lossy
- [FileOptimizer](https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer) (Windows)

**CLI/Automated:**
- `sharp` (Node.js) — For build pipelines
- `imagemin` (Node.js) — Flexible plugin system

### Target File Sizes

| Image Type | Target Size |
|------------|-------------|
| Featured image | Under 200KB, ideally under 150KB |
| Inline images | Under 150KB |
| Small diagrams | Under 50KB |
| Author avatars | Under 30KB |

If you're consistently over these, revisit dimensions or compression settings.

---

## Alt Text Standards

Every image needs alt text. No exceptions.

### Writing Good Alt Text

**Do:**
- Describe what's in the image, not what it means
- Be concise (under 125 characters preferred)
- Include relevant text that appears in the image
- For charts/diagrams, summarize the key takeaway

**Don't:**
- Start with "Image of..." or "Picture of..." (screen readers already announce it's an image)
- Use "click here" or interaction language
- Leave it blank (this is an accessibility failure)
- Stuff keywords (alt text is for users, not SEO gaming)

### Examples

**Screenshot of a form:**
> Alt: "Patient registration form with name, email, and date of birth fields. Error message shown on email field."

**Diagram:**
> Alt: "Flowchart showing three stages: Research, Design, and Validation, with arrows indicating iteration between Design and Validation."

**Team photo:**
> Alt: "Five members of the design team in a workshop, gathered around a whiteboard with sticky notes."

**Decorative image:**
If an image is purely decorative and adds no information, use empty alt text (`alt=""`). Screen readers will skip it.

---

## Naming Conventions

Use consistent file naming for organization.

### Pattern

```
[post-slug]-[descriptor]-[version].[ext]

Examples:
patient-dashboard-hero-v2.webp
form-redesign-before.webp
form-redesign-after.webp
sarah-chen-avatar.webp
research-process-diagram.webp
```

### Rules

- Lowercase only
- Hyphens, not underscores or spaces
- Descriptive but concise
- Include version if iterating (`v2`, `v3`)
- No dates in filenames (Ghost tracks upload dates)

---

## Checklist Before Upload

- [ ] Image is the correct dimensions
- [ ] Image is compressed (check file size)
- [ ] Alt text is written
- [ ] Filename follows naming convention
- [ ] Standard treatments applied (if applicable)
- [ ] Image previewed at actual display size (not zoomed)
