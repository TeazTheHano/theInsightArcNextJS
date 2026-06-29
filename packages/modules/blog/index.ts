import { GitHubBlogGateway } from "./infrastructure/github-blog.gateway";
import { useGetBlogList } from "./application/queries/useGetBlogList";
import { useGetBlogDetail } from "./application/queries/useGetBlogDetail";

// Khởi tạo Dependency Injection tại ranh giới (Boundary)
const blogGateway = new GitHubBlogGateway();

// Public Hooks cho UI (Application Layer)
export const useBlogs = () => useGetBlogList(blogGateway);
export const useBlogDetail = (slug: string) => useGetBlogDetail(blogGateway, slug);

// Public Entities (Domain Layer)
export * from "./domain/Blog";
export * from "./application/contracts/blog.contract";

// Public UI Components
export { default as BlogDetail } from "./ui/components/BlogDetail";
export { BlogItem2RowGen } from "./ui/components/BlogListVariant";
export { IdealItemGen } from "./ui/components/IdealItem";
export { BlogSquareItemGen } from "./ui/components/SquareItem";
