import { IBlogGateway } from "../application/blog.gateway";
import { BlogItemContract, BlogDetailContract } from "../application/contracts/blog.contract";
import { CONFIG } from "@/utils/config";
import { BlogMapper } from "./mappers/blog.mapper";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || CONFIG.GITHUB.TOKEN;
const BASE_PATH = `https://api.github.com/repos/${CONFIG.GITHUB.CONTENT_REPO}/contents/${CONFIG.BLOG.BASE_PATH}`;

const getHeaders = (accept: string) => {
    const headers: Record<string, string> = { "Accept": accept };
    if (GITHUB_TOKEN) headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    return headers;
};

const decodeBase64 = (base64: string): string => {
    if (typeof window !== 'undefined') {
        return decodeURIComponent(escape(window.atob(base64)));
    } else {
        return Buffer.from(base64, 'base64').toString('utf-8');
    }
};

const parseSimpleYaml = (yaml: string): Record<string, any> => {
    const meta: Record<string, any> = {};
    yaml.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed) {
            const [key, ...rest] = trimmed.split(":");
            if (key) meta[key.trim()] = rest.join(":").trim();
        }
    });
    return meta;
};

const parseFrontmatter = (content: string): { meta: Record<string, any>; body: string } => {
    const match = /^---\s*\n([\s\S]+?)\n---\s*\n([\s\S]*)$/m.exec(content);
    if (match) {
        return { meta: parseSimpleYaml(match[1]), body: match[2] };
    }
    return { meta: {}, body: content };
};

export class GitHubBlogGateway implements IBlogGateway {
  async getBlogList(): Promise<BlogItemContract[]> {
    const res = await fetch(`${BASE_PATH}/metadata.json?ref=${CONFIG.GITHUB.BRANCH}`, { 
        headers: getHeaders("application/vnd.github.v3.raw+json"),
        cache: 'no-store' 
    });
    if (!res.ok) throw new Error("Failed to fetch Blog List");
    
    let rawData = await res.json();
    if (!Array.isArray(rawData) && rawData.content) {
        rawData = JSON.parse(decodeBase64(rawData.content));
    }

    return rawData.map((item: any) => {
      const domain = BlogMapper.toDomain(item);
      return BlogMapper.toContract(domain);
    });
  }

  async getBlogDetail(slug: string): Promise<BlogDetailContract> {
    const res = await fetch(`${BASE_PATH}/${slug}.md?ref=${CONFIG.GITHUB.BRANCH}`, { 
        headers: getHeaders("application/vnd.github.v3+json"),
        cache: 'no-store'
    });
    if (!res.ok) throw new Error(`Failed to fetch Blog Detail for ${slug}`);
    
    const data = await res.json();
    const contentStr = decodeBase64(data.content);
    const { meta: rawMeta, body: rawMarkdown } = parseFrontmatter(contentStr);
    
    // Fallback if ID is missing in frontmatter
    rawMeta.id = rawMeta.id || slug;
    
    const domainMeta = BlogMapper.toDomain(rawMeta);
    const contractMeta = BlogMapper.toContract(domainMeta);

    return {
      meta: contractMeta,
      htmlContent: BlogMapper.markdownToHtml(rawMarkdown),
    };
  }
}
