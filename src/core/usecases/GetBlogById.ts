import type { BlogMetaData } from "../entities/BlogMetaData";
import { BlogMetaDataRepositoryPort } from "../ports/BlogMetaDataRepositoryPort";

export class GetBlogMetaDataById {
    constructor(private repo: BlogMetaDataRepositoryPort) { }

    async execute(id: string): Promise<BlogMetaData | null> {
        return this.repo.getBlogById(id);
    }
}