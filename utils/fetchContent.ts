import { CONFIG } from "./config";
import { getCache, saveCache } from "./cacheUtils";
import type { BlogItemProps } from "../data/type";

/**
 * Helper functions for GitHub API interactions
 */

/**
 * Builds the GitHub API URL for accessing repository contents.
 * This function constructs the full URL to fetch files or directories from the specified GitHub repository and branch.
 * @param path - The relative path to the file or directory in the repository (e.g., 'blog/metadata.json').
 * @returns The complete GitHub API URL as a string.
 */
const buildGitHubUrl = (path: string): string => {
    return `https://api.github.com/repos/${CONFIG.GITHUB.CONTENT_REPO}/contents/${path}?ref=${CONFIG.GITHUB.BRANCH}`;
};

/**
 * Generates the headers required for GitHub API requests.
 * Includes the Accept header for specifying the response format and optionally adds Authorization if a token is configured.
 * @param accept - The Accept header value (e.g., 'application/vnd.github.v3+json' for JSON or 'application/vnd.github.v3.raw' for raw content).
 * @returns An object containing the headers for the fetch request.
 */
const getGitHubHeaders = (accept: string): HeadersInit => {
    return {
        Accept: accept,
        ...(CONFIG.GITHUB.TOKEN && { Authorization: `token ${CONFIG.GITHUB.TOKEN}` }),
    };
};

/**
 * Fetches data from the GitHub API for a given path.
 * This function handles the HTTP request to GitHub, checks for errors, and returns the JSON response.
 * @param path - The relative path to the file or directory in the repository.
 * @param accept - The Accept header value to specify the desired response format.
 * @returns A promise that resolves to the JSON data from the GitHub API response.
 * @throws Error if the HTTP response is not ok (e.g., 404, 403).
 */
const fetchGitHubData = async (path: string, accept: string): Promise<any> => {
    const url = buildGitHubUrl(path);
    const res = await fetch(url, { headers: getGitHubHeaders(accept) });
    if (!res.ok) {
        throw new Error(`GitHub API error for ${path}: ${res.statusText}`);
    }
    return await res.json();
};

/**
 * Decodes a base64-encoded string to a UTF-8 string.
 * GitHub API returns file contents as base64-encoded strings, so this function converts them back to readable text.
 * @param base64 - The base64-encoded string to decode.
 * @returns The decoded UTF-8 string.
 */
const decodeBase64 = (base64: string): string => {
    const binaryString = atob(base64); // Decode base64 to binary string
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i); // Convert each character to byte
    }
    return new TextDecoder('utf-8').decode(bytes); // Decode bytes to UTF-8 string
};

/**
 * Parses a simple YAML string into a key-value object.
 * This is a basic parser for YAML frontmatter in Markdown files, assuming simple key: value pairs without nesting or complex structures.
 * It splits the YAML by lines, extracts key-value pairs separated by ':', and trims whitespace.
 * @param yaml - The YAML string to parse (e.g., from frontmatter).
 * @returns An object with parsed key-value pairs.
 */
const parseSimpleYaml = (yaml: string): Record<string, any> => {
    const meta: Record<string, any> = {};
    yaml.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed) {
            const [key, ...rest] = trimmed.split(":"); // Split on first ':' to handle values with ':'
            if (key) {
                meta[key.trim()] = rest.join(":").trim(); // Rejoin rest in case value contains ':'
            }
        }
    });
    return meta;
};

/**
 * Parses the frontmatter from a Markdown string.
 * Frontmatter is metadata at the top of Markdown files, enclosed in '---' delimiters.
 * This function extracts the YAML metadata and the body content separately.
 * If no frontmatter is found, it returns empty meta and the full content as body.
 * @param content - The full Markdown content string.
 * @returns An object with 'meta' (parsed YAML object) and 'body' (the content after frontmatter).
 */
const parseFrontmatter = (content: string): { meta: Record<string, any>; body: string } => {
    const match = /^---\s*\n([\s\S]+?)\n---\s*\n([\s\S]*)$/m.exec(content); // Regex to match frontmatter: --- yaml --- body
    if (match) {
        const yaml = match[1]; // Extract YAML part
        const body = match[2]; // Extract body part
        return { meta: parseSimpleYaml(yaml), body }; // Parse YAML and return
    }
    return { meta: {}, body: content }; // No frontmatter, return full content as body
};

/**
 * Fetches the list of blog items from metadata.json stored in the GitHub content repository.
 * This function retrieves a JSON file containing an array of blog metadata (e.g., titles, dates, slugs).
 * Supports caching to reduce API calls; if cache is enabled and valid, returns cached data.
 * Handles both direct array responses and base64-encoded content from GitHub API.
 * @param useCache - Optional flag to enable caching; defaults to false.
 * @returns A promise that resolves to an array of BlogItemProps representing the blog list.
 * @throws Error if fetching or parsing fails, with details about the issue.
 */
export const fetchBlogList = async (useCache: boolean = false): Promise<BlogItemProps[]> => {
    const cacheKey = "blog-list-cache";

    if (useCache) {
        const cached = getCache(cacheKey, CONFIG.BLOG.CACHE_EXPIRE_HOURS); // Check for valid cached data
        if (cached) return cached; // Return cached data if available
    }

    try {
        // Fetch metadata.json with raw JSON accept header
        const data = await fetchGitHubData(`${CONFIG.BLOG.BASE_PATH}/metadata.json`, "application/vnd.github.v3.raw+json");
        let metadata: BlogItemProps[];

        if (Array.isArray(data)) {
            metadata = data; // Direct array response
        } else if (data.content) {
            const decoded = decodeBase64(data.content); // Decode base64 content
            metadata = JSON.parse(decoded); // Parse JSON string to array
        } else {
            throw new Error("Invalid metadata.json format"); // Unexpected format
        }

        if (useCache) saveCache(cacheKey, metadata); // Save to cache if enabled

        return metadata;
    } catch (error) {
        throw new Error(`Error fetching blog list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

/**
 * Fetches the detailed content of a blog post Markdown file based on the fileName.
 * Includes parsing of frontmatter (metadata) if present in the Markdown file.
 * Supports caching; if enabled and valid cache exists, returns cached data.
 * Retrieves the file from GitHub, decodes base64 content, parses frontmatter, and separates meta and body.
 * Note: Currently fetches the file twice (once for JSON metadata, once for raw content), which may be redundant.
 * @param fileName - The name of the Markdown file (without extension) to fetch (e.g., 'my-post').
 * @param useCache - Optional flag to enable caching; defaults to false.
 * @returns A promise that resolves to an object with 'meta' (frontmatter metadata) and 'content' (body text).
 * @throws Error if fetching, decoding, or parsing fails.
 */
export const fetchBlogContent = async (fileName: string, useCache: boolean = false): Promise<{ meta: Record<string, any>; content: string }> => {
    const cacheKey = `blog-content-${fileName}`;

    if (useCache) {
        const cachedData = getCache(cacheKey, CONFIG.BLOG.CACHE_EXPIRE_HOURS); // Check for cached content
        if (cachedData) {
            return cachedData; // Return cached data if available
        }
    }

    try {
        // Fetch file with JSON accept header to get metadata and base64 content
        const data = await fetchGitHubData(`${CONFIG.BLOG.BASE_PATH}/${fileName}.md`, "application/vnd.github.v3+json");
        // Fetch again with raw accept header (potentially redundant, as raw content is already in data.content)
        // const nonEncyptedData = await fetchGitHubData(`${CONFIG.BLOG.BASE_PATH}/${fileName}.md`, "application/vnd.github.v3.raw");
        // if (nonEncyptedData.content) {
        //     console.log(nonEncyptedData.content); // Debug log (note: nonEncyptedData may not have .text property)
        // }
        const content = decodeBase64(data.content); // Decode base64 content from first fetch
        const { meta, body } = parseFrontmatter(content); // Parse frontmatter and body
        const result = { meta, content: body }; // Prepare result object

        if (useCache) {
            saveCache(cacheKey, result); // Cache the result if enabled
        }
        return result;

    } catch (error) {
        throw new Error(`Error fetching blog content for ${fileName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const fetchInspirationList = async (useCache: boolean = false): Promise<BlogItemProps[]> => {
    const cacheKey = "inspiration-list-cache";

    if (useCache) {
        const cached = getCache(cacheKey, CONFIG.INSPIRATION.CACHE_EXPIRE_HOURS); // Check for valid cached data
        if (cached) return cached; // Return cached data if available
    }

    try {
        // Fetch metadata.json with raw JSON accept header
        const data = await fetchGitHubData(`${CONFIG.INSPIRATION.BASE_PATH}/metadata.json`, "application/vnd.github.v3.raw+json");
        let metadata: BlogItemProps[];

        if (Array.isArray(data)) {
            metadata = data; // Direct array response
        } else if (data.content) {
            const decoded = decodeBase64(data.content); // Decode base64 content
            metadata = JSON.parse(decoded); // Parse JSON string to array
        } else {
            throw new Error("Invalid metadata.json format"); // Unexpected format
        }

        if (useCache) saveCache(cacheKey, metadata); // Save to cache if enabled

        return metadata;
    } catch (error) {
        throw new Error(`Error fetching inspiration list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};