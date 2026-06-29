import { Blog } from "../../domain/Blog";
import { BlogItemContract } from "../../application/contracts/blog.contract";
import { marked } from "marked";

export class BlogMapper {
    /** Helper method to remove outer quotes and unescape inner quotes from YAML parsing */
    private static cleanString(str: any): string {
        if (typeof str !== 'string') return str || "";
        let cleaned = str.trim();
        if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
            cleaned = cleaned.substring(1, cleaned.length - 1);
        }
        return cleaned.replace(/\\"/g, '"');
    }

    /** Map Raw API JSON (Github metadata.json) -> Domain Entity */
    static toDomain(raw: any): Blog {
        return {
            id: raw.id || "",
            title: this.cleanString(raw.title) || "Untitled",
            description: this.cleanString(raw.description) || "",
            coverImage: this.cleanString(raw.coverImage),
            coverImageSquare: this.cleanString(raw.coverImageSquare),
            timeStamp: this.cleanString(raw.timeStamp) || new Date().toISOString(),
            link: this.cleanString(raw.link),
            category: this.cleanString(raw.category) || "General",
            author: this.cleanString(raw.author) || "Admin",
            tags: raw.tags ? (typeof raw.tags === 'string' ? raw.tags.replace(/^\[|\]$/g, '').split(',').map((t: string) => this.cleanString(t)).filter(Boolean) : raw.tags) : [],
            ratio: this.cleanString(raw.ratio),
        };
    }

    /** Map Domain Entity -> UI Contract */
    static toContract(domain: Blog): BlogItemContract {
        return {
            id: domain.id,
            title: domain.title || "",
            description: domain.description || "",
            coverImage: domain.coverImage,
            coverImageSquare: domain.coverImageSquare,
            timeStamp: domain.timeStamp || "",
            displayDate: domain.timeStamp ? new Date(domain.timeStamp).toLocaleDateString('vi-VN') : "",
            tags: domain.tags || [],
            authorName: domain.author || "",
            categoryName: domain.category || "",
            link: domain.link,
            ratio: domain.ratio,
        };
    }

    /** Map Markdown Content -> HTML Content for UI */
    static markdownToHtml(markdown: string): string {
        try {
            return marked.parse(markdown) as string;
        } catch (e) {
            console.error("Error parsing markdown", e);
            return markdown;
        }
    }
}
