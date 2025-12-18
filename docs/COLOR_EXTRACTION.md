# Automatic Color Extraction

This document explains how automatic color extraction works for section backgrounds.

## Overview

Key sections (Featured, Case Studies, Perspectives, Process) automatically extract dominant colors from their featured images and use them as background colors. Colors are cached and only change when the content in those sections changes.

## How It Works

### 1. Color Extraction

When a page loads:
1. The system checks if colors are cached for the current content
2. If content hasn't changed (same post IDs), cached colors are used
3. If content has changed, colors are extracted from the first post's `feature_image`
4. Extracted colors are automatically adjusted for accessibility (WCAG AA compliance)
5. Colors are cached for future use

### 2. Sections with Colors

- **Featured (Hero)**: Background color from featured post image
- **Case Studies**: Background color from first case study image
- **Perspectives**: Background color from first perspective post image
- **Process**: Background color from first process post image

### 3. Accessibility

- Colors are automatically adjusted to ensure WCAG AA contrast (4.5:1 minimum)
- Text color (black or white) is automatically selected for optimal readability
- If extraction fails, sections fall back to default neutral colors

## Technical Details

### Files

- `lib/colorExtraction.ts`: Image processing and color extraction using `sharp`
- `lib/colorAccessibility.ts`: WCAG contrast calculations and color adjustments
- `lib/colorCache.ts`: Persistent cache management
- `lib/getSectionColors.ts`: Main utility for getting section colors
- `lib/colorCache.json`: Cache file (auto-generated, gitignored)

### Cache Structure

```json
{
  "featured": {
    "postIds": ["post-id-1"],
    "colors": {
      "backgroundColor": "#829dce",
      "textColor": "#ffffff",
      "contrastRatio": 4.8
    },
    "lastUpdated": "2024-01-01T00:00:00.000Z"
  }
}
```

### When Colors Change

Colors only change when:
1. **Content changes**: New posts are featured in a section (different post IDs)
2. **Manual override**: Colors can be manually set (future feature)

Colors do NOT change when:
- Same posts are reordered
- Post metadata changes (title, excerpt, etc.)
- Page is rebuilt/reloaded

## Manual Override (Future)

To manually set colors, you can:
1. Edit `lib/colorCache.json` directly
2. Use Ghost custom fields (future feature)
3. Set environment variables (future feature)

## Troubleshooting

### Colors Not Showing

- Check that posts have `feature_image` set
- Verify images are accessible (local files in `public/` or valid URLs)
- Check browser console for extraction errors

### Colors Changing Unexpectedly

- Verify post IDs haven't changed
- Check `lib/colorCache.json` to see cached values
- Delete cache file to force re-extraction

### Performance

- Color extraction happens server-side during build/ISR
- First extraction may be slower (downloading/processing images)
- Subsequent loads use cached colors (fast)

## Best Practices

1. **Use high-quality images**: Better images = better color extraction
2. **Consistent image style**: Similar images will produce similar colors
3. **Test accessibility**: Always verify text is readable on extracted colors
4. **Monitor cache**: Check `colorCache.json` periodically to ensure colors are stable





