export interface TagProps {
    title: string;
    link: string;
    // color: string;
}

export interface BlogItemProps {
    id: string
    title?: string
    description?: string
    coverImage: string
    timeStamp?: string // ISO 8601 format
    link?: string // for internal link use /example, for external link use https://example.com
    category?: string
    author?: string
    tags?: TagProps[]
    ratio?: string
}

