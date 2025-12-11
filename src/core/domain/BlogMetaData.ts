export class Blog {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly coverImage: string;
    readonly coverImageSquare: string | null;

    readonly publishedAt: Date;

    readonly category: string;
    readonly author: string;
    readonly tags: string[];

    constructor(params: {
        id: string;
        title: string;
        description: string;
        coverImage: string;
        coverImageSquare: string | null;
        publishedAt: Date;
        category: string;
        author: string;
        tags: string[];
    }) {
        this.id = params.id;
        this.title = params.title;
        this.description = params.description;
        this.coverImage = params.coverImage;
        this.coverImageSquare = params.coverImageSquare;

        this.publishedAt = params.publishedAt;

        this.category = params.category;
        this.author = params.author;
        this.tags = params.tags;
    }

    /**
     * Domain Logic: tính thời gian đọc
     */
    estimateReadingTime(content?: string): number {
        if (!content) return 0;
        const words = content.split(/\s+/).length;
        return Math.max(1, Math.ceil(words / 200)); // 200 wpm
    }

    /**
     * Domain Logic: bài viết được xem là "mới"
     */
    isNew(days = 7): boolean {
        const diff = Date.now() - this.publishedAt.getTime();
        return diff <= days * 24 * 60 * 60 * 1000;
    }

    /**
     * Domain Logic: format ngày (chỉ dùng cho UI)
     */
    formattedDate(locale = "vi-VN"): string {
        return this.publishedAt.toLocaleDateString(locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    /**
     * Domain Logic: check featured
     */
    isFeatured(): boolean {
        return this.tags.includes("featured");
    }

}