
export interface BlogViewCounterPort {
    increaseView(blogId: string): Promise<number>;
    getViews(blogId: string): Promise<number>;
}