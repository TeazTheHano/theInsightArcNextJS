import type { BlogItemContract as BlogItemProps } from '@/packages/modules/blog';
import { GitHubBlogGateway } from '@/packages/modules/blog/infrastructure/github-blog.gateway';

import { slugify } from "./slugify";

export interface searchEngineOutputProps {
    title: BlogItemProps[],
    author: BlogItemProps[],
    category: BlogItemProps[],
    tag: BlogItemProps[],
}

export const searchEngine = async (
    query: string,
    dataBase?: BlogItemProps[],
): Promise<searchEngineOutputProps> => {
    const result: searchEngineOutputProps = {
        title: [],
        author: [],
        category: [],
        tag: [],
    }

    if (!query.trim()) return result;
    const lowerQuery = query.toLowerCase();

    const target: BlogItemProps[] = dataBase || (await (new GitHubBlogGateway()).getBlogList());

    // Helper function to filter items based on a property
    const filterByProperty = (
        items: BlogItemProps[],
        getValue: (item: BlogItemProps) => string | undefined
    ): BlogItemProps[] => {
        return items.filter((item) => {
            const value = getValue(item);
            return value?.toLowerCase().includes(lowerQuery);
        });
    };

    // Filter for tags (special case as it's an array)
    const filterByTags = (items: BlogItemProps[]): BlogItemProps[] => {
        return items.filter((item) =>
            item.tags?.some((tag) => typeof tag === 'string' && slugify(tag).includes(slugify(query)))
        );
    };

    result.title = filterByProperty(target, (item) => item.title);
    result.author = filterByProperty(target, (item) => item.authorName);
    result.category = filterByProperty(target, (item) => item.categoryName);
    result.tag = filterByTags(target);

    return result;
};
