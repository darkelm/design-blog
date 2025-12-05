// Ghost Content API Types

export interface Post {
  id: string
  uuid: string
  slug: string
  title: string
  html: string
  excerpt: string
  feature_image: string | null
  featured: boolean
  published_at: string
  updated_at: string
  reading_time: number
  tags?: Tag[]
  authors?: Author[]
  primary_tag?: Tag
  primary_author?: Author
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
  visibility: 'public' | 'internal'
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
  navigation: Navigation[]
  secondary_navigation?: Navigation[]
}

export interface Navigation {
  label: string
  url: string
}

// API Response types
export interface PostsResponse {
  posts: Post[]
  meta: {
    pagination: Pagination
  }
}

export interface Pagination {
  page: number
  limit: number
  pages: number
  total: number
  next: number | null
  prev: number | null
}
