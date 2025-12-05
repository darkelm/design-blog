declare module '@tryghost/content-api' {
  export interface BrowseOptions {
    limit?: number | string
    page?: number
    filter?: string
    include?: string[]
    fields?: string[]
    order?: string
  }

  export interface ReadOptions {
    include?: string[]
    fields?: string[]
  }

  export interface Post {
    id: string
    uuid: string
    title: string
    slug: string
    html: string
    excerpt?: string
    feature_image?: string | null
    featured?: boolean
    published_at?: string
    updated_at?: string
    reading_time?: number
    tags?: any[]
    authors?: any[]
    meta_title?: string
    meta_description?: string
    og_image?: string
    og_title?: string
    og_description?: string
    twitter_image?: string
    twitter_title?: string
    twitter_description?: string
  }

  export interface Tag {
    id: string
    slug: string
    name: string
    description?: string
    feature_image?: string
    visibility?: 'public' | 'internal'
    meta_title?: string
    meta_description?: string
    count?: {
      posts: number
    }
  }

  export interface Author {
    id: string
    slug: string
    name: string
    profile_image?: string
    cover_image?: string
    bio?: string
    website?: string
    location?: string
    twitter?: string
    facebook?: string
    meta_title?: string
    meta_description?: string
    count?: {
      posts: number
    }
  }

  export interface Page {
    id: string
    slug: string
    title: string
    html: string
    feature_image?: string
    meta_title?: string
    meta_description?: string
  }

  export interface Settings {
    title: string
    description: string
    logo?: string
    icon?: string
    cover_image?: string
    facebook?: string
    twitter?: string
    lang: string
    timezone: string
    navigation: Array<{ label: string; url: string }>
    secondary_navigation?: Array<{ label: string; url: string }>
  }

  export interface PostsResponse {
    posts: Post[]
    meta: {
      pagination: {
        page: number
        limit: number
        pages: number
        total: number
        next: number | null
        prev: number | null
      }
    }
  }

  export interface TagsResponse {
    tags: Tag[]
    meta?: {
      pagination?: {
        page: number
        limit: number
        pages: number
        total: number
      }
    }
  }

  export interface AuthorsResponse {
    authors: Author[]
    meta?: {
      pagination?: {
        page: number
        limit: number
        pages: number
        total: number
      }
    }
  }

  export class GhostContentAPI {
    constructor(config: {
      url: string
      key: string
      version: string
    })

    posts: {
      browse(options?: BrowseOptions): Promise<Post[] | PostsResponse>
      read(data: { slug: string } | { id: string }, options?: ReadOptions): Promise<Post>
    }

    tags: {
      browse(options?: BrowseOptions): Promise<Tag[] | TagsResponse>
      read(data: { slug: string } | { id: string }, options?: ReadOptions): Promise<Tag>
    }

    authors: {
      browse(options?: BrowseOptions): Promise<Author[] | AuthorsResponse>
      read(data: { slug: string } | { id: string }, options?: ReadOptions): Promise<Author>
    }

    pages: {
      browse(options?: BrowseOptions): Promise<Page[]>
      read(data: { slug: string } | { id: string }, options?: ReadOptions): Promise<Page>
    }

    settings: {
      browse(): Promise<Settings>
    }
  }

  export default GhostContentAPI
}

