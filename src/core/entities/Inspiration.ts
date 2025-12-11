export interface Inspiration {
    id: string
    title: string
    description: string
    coverImage: string

    /**
     * UI nhận string (ISO)
     * Domain nhận Date
     * Nên giữ string ở đây — ở infra sẽ convert sang Date cho core
     */
    timeStamp: string

    link: string
    category: string
    author: string
    tags: string[]
    ratio: string
}