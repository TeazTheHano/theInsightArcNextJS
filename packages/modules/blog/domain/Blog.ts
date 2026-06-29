/**
 * Domain Entity for a Blog Item (from metadata)
 */
export interface Blog {
    id: string;
    title?: string;
    description?: string;
    coverImage: string;
    coverImageSquare?: string;
    timeStamp?: string; // ISO 8601 format
    link?: string;
    category?: string;
    author?: string;
    tags?: string[];
    ratio?: string;
}

/**
 * Domain Entity for a full Blog Detail (includes content)
 */
export interface BlogDetail {
    meta: Blog;
    content: string; // Markdown body
}
