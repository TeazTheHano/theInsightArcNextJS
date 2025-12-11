import type { BlogViewCounterPort } from "../ports/BlogViewCounterPort";

/**
 * Use case: Increase the view count of a blog post.
 * 
 * This use case depends on the BlogViewCounterPort, which defines
 * the methods that any infrastructure implementation must provide
 * (e.g. Vercel KV, Redis, Supabase, custom backend).
 */
export class IncreaseBlogView {
    private viewCounter: BlogViewCounterPort;

    constructor(viewCounter: BlogViewCounterPort) {
        this.viewCounter = viewCounter;
    }

    /**
     * Increase the view count for a specific blog post by ID.
     */
    async execute(blogId: string): Promise<number> {
        if (!blogId) {
            throw new Error("blogId is required");
        }
        const newCount = await this.viewCounter.increaseView(blogId);
        return newCount;
    }
}