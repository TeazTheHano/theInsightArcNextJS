import type { BlogMetaData } from "../entities/BlogMetaData";

export interface BlogMetaDataRepositoryPort {
    getBlogList(): Promise<BlogMetaData[]>;
    getBlogById(id: string): Promise<BlogMetaData | null>;
    getBlogsByTag(tag: string): Promise<BlogMetaData[]>;
}