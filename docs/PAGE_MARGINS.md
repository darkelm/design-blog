# Page Margins & Layout

## Current Margin System

### Content Width (`max-w-content`)
- **Formula**: `clamp(75rem, 90vw, 100rem)`
- **Minimum**: 1200px (on tablets)
- **Preferred**: 90% of viewport width (scales proportionally)
- **Maximum**: 1600px (on large desktops)

### Inner Padding (`px-fluid`)
- **Formula**: `clamp(1.5rem, 2.5vw + 0.5rem, 3rem)`
- **Minimum**: 24px (mobile)
- **Preferred**: Scales with viewport (2.5vw + 0.5rem)
- **Maximum**: 48px (large desktop)

### Actual Page Margins

The actual left/right margins are calculated as:
```
Total Margin = (Viewport Width - Content Width) / 2
```

#### Examples:

**Mobile (375px):**
- Content width: 1200px (min) → actual: 375px - 48px = 327px
- Padding: 24px (inside content)
- Visible margin: ~0px (content fills viewport minus padding)

**Tablet (768px):**
- Content width: 90vw = 691px
- Padding: ~24px
- Total margin: (768 - 691) / 2 = **~38px per side**

**Desktop (1440px):**
- Content width: 90vw = 1296px
- Padding: ~40px
- Total margin: (1440 - 1296) / 2 = **~72px per side**

**Large Desktop (1920px):**
- Content width: 1600px (max)
- Padding: 48px
- Total margin: (1920 - 1600) / 2 = **~160px per side**

## Why This Approach?

This fluid system matches Google Design Blog and Figma Blog:
- ✅ Content scales proportionally with viewport
- ✅ Margins stay balanced across all screen sizes
- ✅ No awkward gaps or cramped content
- ✅ Maintains readability on large screens

## Comparison to Old System

**Old (Fixed):**
- Content: 1400px (fixed)
- Padding: 64px (fixed)
- Margin on 1920px: 260px per side (too wide!)

**New (Fluid):**
- Content: 1200px-1600px (scales)
- Padding: 24px-48px (scales)
- Margin on 1920px: 160px per side (proportional)

