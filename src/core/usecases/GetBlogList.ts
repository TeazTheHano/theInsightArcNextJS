import { BlogMetaData } from "../entities/BlogMetaData";
import { BlogMetaDataRepositoryPort } from "../ports/BlogMetaDataRepositoryPort";

export class GetBlogList {
    constructor(private repo: BlogMetaDataRepositoryPort) { }

    async execute(): Promise<BlogMetaData[]> {
        return this.repo.getBlogList();
    }
}