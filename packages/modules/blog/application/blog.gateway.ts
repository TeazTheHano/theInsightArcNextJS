import { BlogItemContract, BlogDetailContract } from "./contracts/blog.contract";

/**
 * Interface cho việc truy xuất dữ liệu Blog (CQRS Query Port)
 */
export interface IBlogGateway {
  /**
   * Lấy danh sách blog
   */
  getBlogList(): Promise<BlogItemContract[]>;

  /**
   * Lấy chi tiết một blog theo slug/filename
   * @param slug - tên file markdown không chứa extension
   */
  getBlogDetail(slug: string): Promise<BlogDetailContract>;
}
