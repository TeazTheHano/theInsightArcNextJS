// Domain & Contracts
export * from "./domain/Inspiration";
export * from "./application/contracts/inspiration.contract";

// Application Hooks (export as Facade wrapper)
import { useGetInspirationList } from "./application/queries/useGetInspirationList";
import { GitHubInspirationGateway } from "./infrastructure/github-inspiration.gateway";

const gateway = new GitHubInspirationGateway(); // Dependency Injection factory

export const useInspirations = () => {
    return useGetInspirationList(gateway);
};
