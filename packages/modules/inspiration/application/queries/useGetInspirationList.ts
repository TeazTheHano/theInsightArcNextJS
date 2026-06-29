import { useQuery } from "@tanstack/react-query";
import { IInspirationGateway } from "../inspiration.gateway";

export const useGetInspirationList = (gateway: IInspirationGateway) => {
  return useQuery({
    queryKey: ["inspirations"],
    queryFn: () => gateway.getInspirationList(),
  });
};
