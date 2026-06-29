import { IInspirationGateway } from "../application/inspiration.gateway";
import { InspirationContract } from "../application/contracts/inspiration.contract";
import { InspirationMapper } from "./mappers/inspiration.mapper";

import { CONFIG } from "@/utils/config";

/**
 * Implementation của IInspirationGateway gọi API từ Github.
 */
export class GitHubInspirationGateway implements IInspirationGateway {
  async getInspirationList(): Promise<InspirationContract[]> {
    const url = `https://api.github.com/repos/${CONFIG.GITHUB.CONTENT_REPO}/contents/${CONFIG.INSPIRATION.BASE_PATH}/metadata.json?ref=${CONFIG.GITHUB.BRANCH}`;
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github.v3.raw+json",
    };
    
    // Authorization header (same as old fetchContent.ts)
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || CONFIG.GITHUB.TOKEN;
    if (token) {
      headers["Authorization"] = `token ${token}`;
    }

    const res = await fetch(url, { headers, next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error(`GitHub API error for Inspirations: ${res.statusText}`);
    }

    const rawData = await res.json();
    
    return rawData.map((item: any) => {
      const domain = InspirationMapper.toDomain(item);
      return InspirationMapper.toContract(domain);
    });
  }
}
