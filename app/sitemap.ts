import { MetadataRoute } from 'next'
import { getPosts, getTags, getAuthors } from '@/lib/cms'
import type { Post, Tag, Author } from '@/lib/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

  // Fetch all content
  const [posts, tags, authors] = await Promise.all([
    getPosts({ limit: 1000 }) as Promise<Post[]>,
    getTags() as Promise<Tag[]>,
    getAuthors() as Promise<Author[]>,
  ])

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Post pages
  posts.forEach((post) => {
    routes.push({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Tag pages
  tags
    .filter((tag) => tag.visibility === 'public')
    .forEach((tag) => {
      routes.push({
        url: `${baseUrl}/tag/${tag.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })

  // Author pages
  authors.forEach((author) => {
    routes.push({
      url: `${baseUrl}/author/${author.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  })

  return routes
}








