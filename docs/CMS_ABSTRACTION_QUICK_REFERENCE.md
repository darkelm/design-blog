# CMS Abstraction - Quick Reference

## Overview

This is a quick reference guide for the CMS abstraction refactoring. See `CMS_ABSTRACTION_REFACTORING_PLAN.md` for full details.

## Current Ghost Dependencies

### Direct Imports (5 files)
- `app/post/[slug]/page.tsx`
- `app/tag/[slug]/page.tsx`
- `app/author/[slug]/page.tsx`
- `app/sitemap.ts`
- `lib/data/homePage.ts`

### Ghost-Specific Code Locations
- `lib/ghost.ts` - All Ghost API calls
- `lib/errors.ts` - `GhostAPIError` class
- `next.config.js` - Ghost image domains
- `package.json` - `@tryghost/content-api` dependency

## New Architecture

```
lib/cms/
├── index.ts          → Factory function
├── types.ts          → CMSProvider interface
├── functions.ts      → Convenience wrappers
└── providers/
    └── ghost.ts      → Ghost implementation
```

## Migration Pattern

### Before
```typescript
import { getPosts } from '@/lib/ghost'
```

### After (New Code)
```typescript
import { getPosts } from '@/lib/cms'
```

### During Migration (Backward Compatible)
```typescript
// Both work:
import { getPosts } from '@/lib/ghost'      // ✅ Still works
import { getPosts } from '@/lib/cms'        // ✅ New way
```

## Key Files Created

1. **`lib/cms/types.ts`** - Interface contract
2. **`lib/cms/index.ts`** - Provider factory
3. **`lib/cms/functions.ts`** - Wrapper functions
4. **`lib/cms/providers/ghost.ts`** - Ghost implementation

## Environment Variables

```bash
CMS_PROVIDER=ghost  # Default, options: ghost, contentful, strapi, etc.
GHOST_URL=...       # Only if CMS_PROVIDER=ghost
GHOST_CONTENT_API_KEY=...  # Only if CMS_PROVIDER=ghost
```

## Implementation Checklist

- [ ] Phase 1: Create interface & factory (1.5h)
- [ ] Phase 2: Move Ghost to provider (2.5h)
- [ ] Phase 3: Update error types (1.25h)
- [ ] Phase 4: Update application code (1.5h)
- [ ] Phase 5: Update configuration (25m)
- [ ] Phase 6: Documentation & testing (2.25h)

**Total:** ~9.25 hours

## Testing Checklist

- [ ] All pages render correctly
- [ ] Backward compatible imports work
- [ ] New abstraction imports work
- [ ] Error handling works
- [ ] Build succeeds
- [ ] Static generation works
- [ ] API routes work

## Benefits

✅ CMS-agnostic codebase  
✅ Easy to swap CMS providers  
✅ Zero breaking changes  
✅ Type-safe implementation  
✅ Future-proof architecture

## Adding a New CMS Provider

1. Create `lib/cms/providers/[name].ts`
2. Implement `CMSProvider` interface
3. Add case to factory in `lib/cms/index.ts`
4. Test thoroughly
5. Update documentation

Example:
```typescript
export class ContentfulCMSProvider implements CMSProvider {
  // Implement all interface methods
}
```

## Questions?

See `CMS_ABSTRACTION_REFACTORING_PLAN.md` for complete details.

