# CMS Providers Guide

This document explains how to use and extend the CMS abstraction layer.

## Overview

The codebase now uses a CMS abstraction layer that allows you to swap content management systems without changing application code. Currently, Ghost CMS is implemented, but you can easily add support for other CMS providers like Contentful, Strapi, or Sanity.

## Current Providers

### Ghost CMS (Default)

Ghost is the default CMS provider. It's configured via environment variables:

```bash
CMS_PROVIDER=ghost  # Optional, defaults to 'ghost'
GHOST_URL=https://your-ghost-site.com
GHOST_CONTENT_API_KEY=your-api-key
```

## Using CMS Functions

All application code should import from `@/lib/cms`:

```typescript
import { getPosts, getPostBySlug } from '@/lib/cms'

// Works exactly like before
const posts = await getPosts({ limit: 10 })
const post = await getPostBySlug('my-post')
```

## Adding a New CMS Provider

To add support for a new CMS provider:

### 1. Create Provider Class

Create a new file: `lib/cms/providers/[provider-name].ts`

```typescript
import type { CMSProvider, GetPostsOptions } from '../types'
import type { Post, Tag, Author, Page, Settings } from '../../types'
import { CMSAPIError, ContentFetchError, NotFoundError } from '../../errors'

export class [ProviderName]CMSProvider implements CMSProvider {
  constructor() {
    // Initialize your CMS client here
    // Read from environment variables
  }

  async getPosts(options?: GetPostsOptions): Promise<Post[]> {
    // Implement using your CMS API
    try {
      // Your CMS API calls here
      // Map CMS-specific types to our canonical types
      return mappedPosts
    } catch (error) {
      // Handle errors appropriately
      throw new CMSAPIError(
        `Failed to fetch posts: ${error.message}`,
        statusCode,
        '[provider-name]',
        error
      )
    }
  }

  // Implement all other interface methods...
  async getPostBySlug(slug: string): Promise<Post> { ... }
  async getFeaturedPosts(limit?: number): Promise<Post[]> { ... }
  async getPostsByTag(slug: string, limit?: number): Promise<Post[]> { ... }
  async getPostsByAuthor(slug: string, limit?: number): Promise<Post[]> { ... }
  async searchPosts(query: string, limit?: number): Promise<Post[]> { ... }
  async getTags(): Promise<Tag[]> { ... }
  async getTagBySlug(slug: string): Promise<Tag> { ... }
  async getAuthors(): Promise<Author[]> { ... }
  async getAuthorBySlug(slug: string): Promise<Author> { ... }
  async getPages(): Promise<Page[]> { ... }
  async getPageBySlug(slug: string): Promise<Page> { ... }
  async getSettings(): Promise<Settings> { ... }
}
```

### 2. Register Provider in Factory

Update `lib/cms/index.ts`:

```typescript
import { [ProviderName]CMSProvider } from './providers/[provider-name]'

export function getCMSProvider(): CMSProvider {
  if (cmsProvider) {
    return cmsProvider
  }

  const providerType = process.env.CMS_PROVIDER || 'ghost'
  
  switch (providerType) {
    case 'ghost':
      cmsProvider = new GhostCMSProvider()
      break
    case '[provider-name]':
      cmsProvider = new [ProviderName]CMSProvider()
      break
    default:
      throw new Error(`Unknown CMS provider: ${providerType}`)
  }
  
  return cmsProvider
}
```

### 3. Update Environment Variables

Add configuration for your provider:

```bash
CMS_PROVIDER=[provider-name]
[PROVIDER]_API_KEY=your-api-key
[PROVIDER]_SPACE_ID=your-space-id
# ... other provider-specific variables
```

### 4. Update Image Domains

If your CMS hosts images on different domains, update `next.config.js`:

```javascript
images: {
  remotePatterns: [
    // Your CMS image domains
    {
      protocol: 'https',
      hostname: '**.your-cms.com',
    },
  ],
}
```

## Type Mapping

Each CMS provider must map its native types to our canonical types defined in `lib/types.ts`:

- `Post` - Blog post/article
- `Tag` - Category/tag
- `Author` - Content author
- `Page` - Static page
- `Settings` - Site settings

The provider is responsible for transforming CMS-specific data structures to match these interfaces.

## Error Handling

Use the generic error types from `lib/errors.ts`:

- `CMSAPIError` - For API-related errors (with status code)
- `ContentFetchError` - For content fetching errors
- `NotFoundError` - For 404-style errors

Always include the provider name when throwing `CMSAPIError`:

```typescript
throw new CMSAPIError(
  `Failed to fetch posts: ${error.message}`,
  statusCode,
  'contentful', // Provider name
  originalError
)
```

## Testing Your Provider

1. **Unit Tests**: Test each interface method
2. **Integration Tests**: Test with real CMS API
3. **Type Safety**: Ensure all return types match the interface
4. **Error Handling**: Test error scenarios

## Example: Contentful Provider

Here's a skeleton for a Contentful provider:

```typescript
import { createClient } from 'contentful'
import type { CMSProvider, GetPostsOptions } from '../types'
import type { Post } from '../../types'

export class ContentfulCMSProvider implements CMSProvider {
  private client

  constructor() {
    this.client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    })
  }

  async getPosts(options?: GetPostsOptions): Promise<Post[]> {
    try {
      const response = await this.client.getEntries({
        content_type: 'post',
        limit: options?.limit || 10,
        skip: ((options?.page || 1) - 1) * (options?.limit || 10),
      })

      // Map Contentful entries to our Post type
      return response.items.map(entry => ({
        id: entry.sys.id,
        slug: entry.fields.slug,
        title: entry.fields.title,
        // ... map all required fields
      }))
    } catch (error) {
      throw new CMSAPIError(
        `Failed to fetch posts: ${error.message}`,
        undefined,
        'contentful',
        error
      )
    }
  }

  // Implement other methods...
}
```

## Best Practices

1. **Type Safety**: Always type check and validate responses
2. **Error Handling**: Provide meaningful error messages
3. **Caching**: Consider caching strategies if your CMS has rate limits
4. **Pagination**: Respect pagination limits
5. **Documentation**: Document any CMS-specific quirks or limitations

## Migration from Ghost

If you're migrating from Ghost:

1. Implement the new provider
2. Test thoroughly with a small subset of content
3. Update `CMS_PROVIDER` environment variable
4. Monitor for any issues
5. Update image domains if needed

The application code doesn't need to change - it will automatically use the new provider!

## Questions?

- See `CMS_ABSTRACTION_REFACTORING_PLAN.md` for implementation details
- Check existing `GhostCMSProvider` for reference implementation
- Review `lib/cms/types.ts` for the full interface contract

