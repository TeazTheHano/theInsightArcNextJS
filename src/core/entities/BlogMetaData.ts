export interface BlogMetaData {
    id: string
    title: string
    description: string
    coverImage: string
    coverImageSquare: string | null

    /**
     * ISO string representing the published date.
     * UI keeps it as string; infra converts to Date for domain logic.
     */
    publishedAt: string

    category: string
    author: string
    tags: string[]
}