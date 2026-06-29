import { MetadataRoute } from 'next'
import { GitHubBlogGateway } from '@/packages/modules/blog/infrastructure/github-blog.gateway'
import { GitHubInspirationGateway } from '@/packages/modules/inspiration/infrastructure/github-inspiration.gateway'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theinsightarc.com'
  
  // Static Routes
  const staticRoutes = ['', '/blog', '/inspiration', '/contact', '/game', '/term'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    const blogGateway = new GitHubBlogGateway()
    const inspirationGateway = new GitHubInspirationGateway()
    
    // Fetch dynamic content
    const [blogs, inspirations] = await Promise.all([
      blogGateway.getBlogList().catch(() => []),
      inspirationGateway.getInspirationList().catch(() => [])
    ])

    const blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: new Date(blog.timeStamp || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
    
    // Inspirations don't have separate detail pages yet, 
    // but if they do in the future, we'd add them here.

    return [...staticRoutes, ...blogRoutes]
  } catch (error) {
    return staticRoutes
  }
}
