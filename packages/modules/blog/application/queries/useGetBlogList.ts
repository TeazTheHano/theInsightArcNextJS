import { useQuery } from "@tanstack/react-query";
import { IBlogGateway } from "../blog.gateway";

export const useGetBlogList = (gateway: IBlogGateway) => {
  return useQuery({
    queryKey: ["blogList"],
    queryFn: () => gateway.getBlogList(),
  });
};
