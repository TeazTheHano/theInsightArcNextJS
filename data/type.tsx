export interface BlogItemProps {
    id: string
    title?: string
    description?: string
    coverImage: string
    coverImageSquare?: string
    timeStamp?: string // ISO 8601 format
    link?: string // for internal link use /example, for external link use https://example.com
    category?: string
    author?: string
    tags?: string[]
    ratio?: string
}

