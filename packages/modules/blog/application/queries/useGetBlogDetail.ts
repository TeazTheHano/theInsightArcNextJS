import { useQuery } from "@tanstack/react-query";
import { IBlogGateway } from "../blog.gateway";

import { BlogDetailContract } from "../contracts/blog.contract";

export const useGetBlogDetail = (gateway: IBlogGateway, slug: string, initialData?: BlogDetailContract) => {
  return useQuery({
    queryKey: ["blogDetail", slug],
    queryFn: () => gateway.getBlogDetail(slug),
    enabled: !!slug,
    initialData,
  });
};
