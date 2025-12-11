import type { BlogMetaData } from "../entities/BlogMetaData";
import { Blog } from "../domain/BlogMetaData";

export class BlogMapper {
    static toDomain(entity: BlogMetaData): Blog {
        return new Blog({
            ...entity,
            publishedAt: new Date(entity.publishedAt),
        });
    }

    static toDomainList(list: BlogMetaData[]): Blog[] {
        return list.map((e) => BlogMapper.toDomain(e));
    }
}