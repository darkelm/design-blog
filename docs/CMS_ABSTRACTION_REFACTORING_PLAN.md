# CMS Abstraction Refactoring Plan
## Making the Codebase CMS-Agnostic

**Document Version:** 1.0  
**Date:** 2024  
**Estimated Time:** 6-8 hours  
**Risk Level:** Low-Medium  
**Breaking Changes:** None (backward compatible implementation)

---

## Executive Summary

This plan outlines the complete refactoring process to make the codebase CMS-agnostic by introducing an abstraction layer between the application code and the content management system (currently Ghost). This will allow swapping Ghost for any other CMS (Contentful, Strapi, Sanity, etc.) without modifying application code.

### Current State Analysis

**Ghost Integration Points:**
1. **Direct Imports:** 5 files directly import from `lib/ghost.ts`
2. **Error Types:** `GhostAPIError` class is Ghost-specific
3. **Environment Variables:** `GHOST_URL` and `GHOST_CONTENT_API_KEY`
4. **Package Dependency:** `@tryghost/content-api` v1.11.21
5. **Configuration:** `next.config.js` has Ghost-specific image domains
6. **Types:** Type definitions are generic (good) but file is labeled "Ghost Content API Types"

**Isolation Score:** 70% - Good foundation, needs abstraction layer

---

## Phase 1: Architecture Design

### 1.1 Create CMS Provider Interface

**File:** `lib/cms/types.ts` (NEW)

Define a TypeScript interface that all CMS implementations must follow:

```typescript
export interface CMSProvider {
  // Posts
  getPosts(options?: GetPostsOptions): Promise<Post[]>
  getPostBySlug(slug: string): Promise<Post>
  getFeaturedPosts(limit?: number): Promise<Post[]>
  getPostsByTag(slug: string, limit?: number): Promise<Post[]>
  getPostsByAuthor(slug: string, limit?: number): Promise<Post[]>
  searchPosts(query: string, limit?: number): Promise<Post[]>
  
  // Tags
  getTags(): Promise<Tag[]>
  getTagBySlug(slug: string): Promise<Tag>
  
  // Authors
  getAuthors(): Promise<Author[]>
  getAuthorBySlug(slug: string): Promise<Author>
  
  // Pages
  getPages(): Promise<Page[]>
  getPageBySlug(slug: string): Promise<Page>
  
  // Settings
  getSettings(): Promise<Settings>
}

export interface GetPostsOptions {
  limit?: number
  page?: number
  filter?: string
  include?: string[]
}
```

**Rationale:** This interface defines the contract all CMS providers must implement, ensuring type safety and consistency.

**Dependencies:** Uses types from `lib/types.ts`

**Estimated Time:** 30 minutes

---

### 1.2 Create CMS Provider Factory

**File:** `lib/cms/index.ts` (NEW)

Factory function that returns the active CMS provider based on environment configuration:

```typescript
import type { CMSProvider } from './types'
import { GhostCMSProvider } from './providers/ghost'

let cmsProvider: CMSProvider | null = null

export function getCMSProvider(): CMSProvider {
  if (cmsProvider) {
    return cmsProvider
  }

  const providerType = process.env.CMS_PROVIDER || 'ghost'
  
  switch (providerType) {
    case 'ghost':
      cmsProvider = new GhostCMSProvider()
      break
    case 'mock':
      // Could add mock provider later
      throw new Error('Mock provider not yet implemented')
    default:
      throw new Error(`Unknown CMS provider: ${providerType}`)
  }
  
  return cmsProvider
}

// Re-export all CMS functions for convenience
export {
  getPosts,
  getPostBySlug,
  getFeaturedPosts,
  getPostsByTag,
  getPostsByAuthor,
  searchPosts,
  getTags,
  getTagBySlug,
  getAuthors,
  getAuthorBySlug,
  getPages,
  getPageBySlug,
  getSettings,
} from './functions'
```

**Rationale:** Single point of CMS initialization. Adding new providers only requires updating the factory.

**Dependencies:** `lib/cms/types.ts`, `lib/cms/providers/ghost.ts`

**Estimated Time:** 30 minutes

---

### 1.3 Create Convenience Functions

**File:** `lib/cms/functions.ts` (NEW)

Thin wrapper functions that delegate to the active CMS provider:

```typescript
import { getCMSProvider } from './index'
import type { GetPostsOptions } from './types'

export async function getPosts(options?: GetPostsOptions) {
  const provider = getCMSProvider()
  return provider.getPosts(options)
}

export async function getPostBySlug(slug: string) {
  const provider = getCMSProvider()
  return provider.getPostBySlug(slug)
}

// ... (all other functions)
```

**Rationale:** Provides familiar function names that application code already uses, making migration seamless.

**Dependencies:** `lib/cms/index.ts`, `lib/cms/types.ts`

**Estimated Time:** 45 minutes

---

## Phase 2: Ghost Provider Implementation

### 2.1 Move Ghost Code to Provider

**File:** `lib/cms/providers/ghost.ts` (NEW)  
**File:** `lib/ghost.ts` (MODIFY - deprecate, keep for backward compatibility)

**Steps:**
1. Copy entire `lib/ghost.ts` to `lib/cms/providers/ghost.ts`
2. Wrap all functions in a `GhostCMSProvider` class implementing `CMSProvider`
3. Update imports to use internal Ghost API
4. Keep `lib/ghost.ts` as a compatibility layer that imports from the new provider

**Example Structure:**
```typescript
import GhostContentAPI from '@tryghost/content-api'
import type { CMSProvider, GetPostsOptions } from '../types'
import type { Post, Tag, Author, Page, Settings } from '../../types'
import { CMSAPIError, ContentFetchError, NotFoundError } from '../../errors'

export class GhostCMSProvider implements CMSProvider {
  private api: GhostContentAPI

  constructor() {
    this.api = new GhostContentAPI({
      url: process.env.GHOST_URL || 'https://your-ghost-site.com',
      key: process.env.GHOST_CONTENT_API_KEY || 'your-content-api-key',
      version: 'v5.0',
    })
  }

  async getPosts(options?: GetPostsOptions): Promise<Post[]> {
    // Move existing getPosts logic here
  }

  // Implement all other interface methods
}
```

**Rationale:** Encapsulates Ghost-specific code in a provider class, making it easy to swap.

**Dependencies:** `@tryghost/content-api`, `lib/cms/types.ts`, `lib/types.ts`, `lib/errors.ts`

**Estimated Time:** 2 hours

**Files Affected:**
- `lib/cms/providers/ghost.ts` (NEW)
- `lib/ghost.ts` (MODIFY - becomes compatibility wrapper)

---

### 2.2 Update Compatibility Layer

**File:** `lib/ghost.ts` (MODIFY)

Transform into a thin wrapper that uses the new CMS abstraction:

```typescript
/**
 * @deprecated Import from '@/lib/cms' instead
 * This file is kept for backward compatibility
 */
import {
  getPosts as cmsGetPosts,
  getPostBySlug as cmsGetPostBySlug,
  // ... all other functions
} from './cms'

export const getPosts = cmsGetPosts
export const getPostBySlug = cmsGetPostBySlug
// ... re-export all functions

// Keep error types for now (will migrate in Phase 3)
export { GhostAPIError, ContentFetchError, NotFoundError } from './errors'
```

**Rationale:** Ensures existing code continues to work during migration, allows gradual transition.

**Estimated Time:** 15 minutes

---

## Phase 3: Error Handling Abstraction

### 3.1 Create Generic Error Types

**File:** `lib/errors.ts` (MODIFY)

Rename and restructure error classes to be CMS-agnostic:

**Current:**
- `GhostAPIError` (CMS-specific)
- `ContentFetchError` (generic)
- `NotFoundError` (generic)

**New Structure:**
```typescript
// Keep generic errors
export class ContentFetchError extends Error { ... }
export class NotFoundError extends Error { ... }

// Make API error generic
export class CMSAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public provider?: string, // 'ghost', 'contentful', etc.
    public originalError?: unknown
  ) {
    super(message)
    this.name = 'CMSAPIError'
  }
}

// Keep GhostAPIError as alias for backward compatibility
export class GhostAPIError extends CMSAPIError {
  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message, statusCode, 'ghost', originalError)
    this.name = 'GhostAPIError'
  }
}
```

**Rationale:** Maintains backward compatibility while introducing generic error types.

**Files Affected:**
- `lib/errors.ts`
- `lib/cms/providers/ghost.ts` (update to use CMSAPIError)

**Estimated Time:** 45 minutes

---

### 3.2 Update Error Usage

**Files to Update:**
1. `lib/cms/providers/ghost.ts` - Replace `GhostAPIError` with `CMSAPIError` (or keep as wrapper)
2. Any error handling code that checks for `GhostAPIError` type

**Estimated Time:** 30 minutes

---

## Phase 4: Application Code Migration

### 4.1 Update Page Files

**Files to Update:**
1. `app/page.tsx`
2. `app/post/[slug]/page.tsx`
3. `app/tag/[slug]/page.tsx`
4. `app/author/[slug]/page.tsx`
5. `app/sitemap.ts`
6. `lib/data/homePage.ts`

**Migration Pattern:**
```typescript
// BEFORE
import { getPosts, getPostBySlug } from '@/lib/ghost'

// AFTER
import { getPosts, getPostBySlug } from '@/lib/cms'
// OR keep using '@/lib/ghost' temporarily (backward compatible)
```

**Strategy:** Update imports to use `@/lib/cms` for all new code. Keep old imports working via compatibility layer.

**Estimated Time:** 1 hour

---

### 4.2 Update API Routes

**Files to Check/Update:**
- `app/api/search/route.ts` (if it exists and uses Ghost)

**Action:** Update to use CMS abstraction if present.

**Estimated Time:** 30 minutes

---

### 4.3 Update Type Definitions

**File:** `lib/types.ts` (MODIFY)

Update file header comment:
```typescript
// BEFORE
// Ghost Content API Types

// AFTER
// CMS Content Types
// These types represent the canonical content structure used by the application.
// All CMS providers must map their native types to these interfaces.
```

**Rationale:** Types are already generic, just need to update documentation.

**Estimated Time:** 5 minutes

---

## Phase 5: Configuration & Environment

### 5.1 Environment Variables

**File:** `.env.example` (CREATE or UPDATE)

Add new environment variable:
```bash
# CMS Provider Selection
CMS_PROVIDER=ghost  # Options: ghost, contentful, strapi, etc.

# Ghost CMS Configuration (if CMS_PROVIDER=ghost)
GHOST_URL=https://your-ghost-site.com
GHOST_CONTENT_API_KEY=your-api-key
```

**Rationale:** Allows runtime CMS selection without code changes.

**Estimated Time:** 15 minutes

---

### 5.2 Next.js Configuration

**File:** `next.config.js` (MODIFY)

Make image domain configuration more generic:

```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      // Ghost domains
      {
        protocol: 'https',
        hostname: '**.ghost.io',
      },
      {
        protocol: 'https',
        hostname: '**.ghost.org',
      },
      // Add other CMS domains as needed
      // {
      //   protocol: 'https',
      //   hostname: 'images.ctfassets.net', // Contentful
      // },
      // {
      //   protocol: 'https',
      //   hostname: '**.sanity.io', // Sanity
      // },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}
```

**Rationale:** Prepares for multiple CMS image sources.

**Estimated Time:** 10 minutes

---

## Phase 6: Documentation & Testing

### 6.1 Update Documentation

**Files to Update:**
1. `README.md` - Update CMS setup instructions
2. Create `docs/CMS_PROVIDERS.md` - Document adding new providers
3. Update `docs/CODEBASE_REVIEW.md` if needed

**Content for `docs/CMS_PROVIDERS.md`:**
- How to add a new CMS provider
- Interface requirements
- Example implementation
- Testing guidelines

**Estimated Time:** 1 hour

---

### 6.2 Update Type Definitions File

**File:** `types/ghost.d.ts` (OPTIONAL - RENAME)

If this file exists and provides Ghost-specific type augmentations:
- Consider renaming to `types/cms.d.ts`
- Or keep as-is if it only augments Ghost types

**Action:** Review and decide based on file content.

**Estimated Time:** 15 minutes

---

### 6.3 Testing Checklist

**Test Cases:**

1. **Backward Compatibility**
   - [ ] Existing imports from `@/lib/ghost` still work
   - [ ] All pages render correctly
   - [ ] No runtime errors

2. **New Abstraction**
   - [ ] Imports from `@/lib/cms` work correctly
   - [ ] CMS provider is initialized correctly
   - [ ] All CMS functions return expected data

3. **Error Handling**
   - [ ] Errors are caught and handled correctly
   - [ ] Error messages are user-friendly
   - [ ] 404s work correctly

4. **Environment Variables**
   - [ ] `CMS_PROVIDER=ghost` works
   - [ ] Missing CMS_PROVIDER defaults to ghost
   - [ ] Invalid CMS_PROVIDER throws helpful error

5. **Build & Deploy**
   - [ ] `npm run build` succeeds
   - [ ] Static pages generate correctly
   - [ ] API routes work in production

**Estimated Time:** 1 hour

---

## Phase 7: Cleanup & Optimization (Optional)

### 7.1 Remove Deprecated Code

**After Migration Period (2-4 weeks):**

1. Remove compatibility layer in `lib/ghost.ts`
2. Update all remaining imports
3. Remove `@deprecated` comments

**Estimated Time:** 30 minutes

---

### 7.2 Add Additional CMS Providers (Future)

**Example: Contentful Provider**

**File:** `lib/cms/providers/contentful.ts` (FUTURE)

```typescript
import { createClient } from 'contentful'
import type { CMSProvider } from '../types'
// ... implement interface
```

**Estimated Time:** 4-6 hours per provider

---

## Implementation Order

### Recommended Sequence:

1. **Phase 1** - Architecture Design (1.5 hours)
   - Create interface
   - Create factory
   - Create convenience functions

2. **Phase 2** - Ghost Provider (2.5 hours)
   - Move Ghost code to provider
   - Update compatibility layer

3. **Phase 3** - Error Handling (1.25 hours)
   - Update error types
   - Update error usage

4. **Phase 4** - Application Migration (1.5 hours)
   - Update page files
   - Update API routes

5. **Phase 5** - Configuration (25 minutes)
   - Environment variables
   - Next.js config

6. **Phase 6** - Documentation & Testing (2.25 hours)
   - Write documentation
   - Test thoroughly

**Total Estimated Time:** 9.25 hours (including buffer)

---

## Risk Assessment

### Low Risk ✅
- Creating new files (no impact on existing code)
- Backward compatibility layer ensures no breaking changes
- Type system catches most integration errors

### Medium Risk ⚠️
- Factory initialization timing (ensure it's called correctly)
- Error handling changes (test thoroughly)
- Environment variable management

### Mitigation Strategies
1. Implement backward compatibility layer first
2. Test each phase before moving to next
3. Keep old code working during migration
4. Use TypeScript for compile-time safety
5. Write integration tests for CMS functions

---

## File Structure After Refactoring

```
lib/
├── cms/
│   ├── index.ts              # Factory & re-exports
│   ├── types.ts              # CMSProvider interface
│   ├── functions.ts          # Convenience wrappers
│   └── providers/
│       ├── ghost.ts          # Ghost implementation
│       └── [future-providers].ts
├── ghost.ts                  # Compatibility layer (deprecated)
├── types.ts                  # Generic content types
├── errors.ts                 # Generic error types
└── ... (other files)
```

---

## Success Criteria

✅ **Phase 1 Complete:**
- CMS interface defined and exported
- Factory function works
- Convenience functions work

✅ **Phase 2 Complete:**
- Ghost provider implements interface
- All Ghost functions work through provider
- Backward compatibility maintained

✅ **Phase 3 Complete:**
- Generic error types in place
- Error handling works correctly
- No Ghost-specific errors in application code

✅ **Phase 4 Complete:**
- All pages use new abstraction (or compatibility layer)
- No direct Ghost imports in application code
- All functionality works

✅ **Phase 5 Complete:**
- Environment variables documented
- Configuration is CMS-agnostic

✅ **Phase 6 Complete:**
- Documentation updated
- All tests pass
- Build succeeds

---

## Future Enhancements

### Potential Additions:

1. **CMS Provider Registry**
   - Auto-discover providers
   - Plugin system

2. **CMS Configuration Validation**
   - Validate provider config on startup
   - Better error messages

3. **CMS Health Checks**
   - Test connection on startup
   - Retry logic

4. **Multi-CMS Support**
   - Use different CMS for different content types
   - A/B testing with multiple providers

5. **CMS Migration Tools**
   - Export/import content between CMS
   - Content transformation utilities

---

## Appendix: Detailed File Changes

### Files to Create (7 files)

1. `lib/cms/types.ts` - Interface definition
2. `lib/cms/index.ts` - Factory & exports
3. `lib/cms/functions.ts` - Convenience functions
4. `lib/cms/providers/ghost.ts` - Ghost implementation
5. `docs/CMS_PROVIDERS.md` - Provider documentation
6. `.env.example` - Environment template
7. `docs/CMS_ABSTRACTION_REFACTORING_PLAN.md` - This file

### Files to Modify (10 files)

1. `lib/ghost.ts` - Compatibility wrapper
2. `lib/errors.ts` - Generic error types
3. `lib/types.ts` - Update comments
4. `app/page.tsx` - Update imports (optional, works via compatibility)
5. `app/post/[slug]/page.tsx` - Update imports (optional)
6. `app/tag/[slug]/page.tsx` - Update imports (optional)
7. `app/author/[slug]/page.tsx` - Update imports (optional)
8. `app/sitemap.ts` - Update imports (optional)
9. `lib/data/homePage.ts` - Update imports (optional)
10. `next.config.js` - Update comments

### Files to Review (2 files)

1. `app/api/search/route.ts` - Check if exists and uses Ghost
2. `types/ghost.d.ts` - Review for migration needs

---

## Migration Timeline

**Week 1:**
- Phase 1-2: Core abstraction + Ghost provider
- Testing: Ensure backward compatibility

**Week 2:**
- Phase 3-4: Error handling + Application migration
- Testing: Full functionality check

**Week 3:**
- Phase 5-6: Configuration + Documentation
- Final testing and deployment

**Week 4+ (Optional):**
- Phase 7: Cleanup deprecated code
- Monitor for issues

---

## Conclusion

This refactoring plan provides a comprehensive, step-by-step approach to making the codebase CMS-agnostic while maintaining full backward compatibility. The modular approach allows for gradual migration and easy testing at each phase.

**Key Benefits:**
- ✅ Zero breaking changes
- ✅ Gradual migration path
- ✅ Easy to test
- ✅ Type-safe implementation
- ✅ Future-proof architecture

**Next Steps:**
1. Review and approve this plan
2. Create feature branch: `feature/cms-abstraction`
3. Begin Phase 1 implementation
4. Test each phase before proceeding

---

**Questions or Concerns?**
- Review this document with the team
- Adjust timeline based on priorities
- Modify approach based on specific requirements

