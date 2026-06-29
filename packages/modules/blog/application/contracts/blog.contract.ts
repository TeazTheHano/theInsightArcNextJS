export interface BlogItemContract {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    coverImageSquare?: string;
    timeStamp: string;
    displayDate: string; // Đã format sẵn cho UI (VD: 24/10/2026)
    tags: string[];
    authorName: string;
    categoryName: string;
    link?: string;
    ratio?: string;
}

export interface BlogDetailContract {
    meta: BlogItemContract;
    htmlContent: string; // Nội dung đã được xử lý (không phải markdown thô)
}
