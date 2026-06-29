import { useQuery } from "@tanstack/react-query";
import { IBlogGateway } from "../blog.gateway";

export const useGetBlogDetail = (gateway: IBlogGateway, slug: string) => {
  return useQuery({
    queryKey: ["blogDetail", slug],
    queryFn: () => gateway.getBlogDetail(slug),
    enabled: !!slug,
  });
};
