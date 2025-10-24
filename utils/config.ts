/**
 * Project global config for content fetching and environment variables
 */

export const CONFIG = {
  // --- GitHub content source ---
  GITHUB: {
    OWNER: "TeazTheHano",
    CONTENT_REPO: process.env.NEXT_PUBLIC_CONTENT_REPO || "TeazTheHano/theInsightArcContent",
    TOKEN: process.env.NEXT_PUBLIC_GITHUB_TOKEN || "",
    BRANCH: process.env.NEXT_PUBLIC_CONTENT_BRANCH || "main",
  },

  // --- Blog structure ---
  BLOG: {
    BASE_PATH: "blogs",  // thư mục trong repo B chứa .md
    CACHE_EXPIRE_HOURS: 0.01666666667, // 1 phút
  },

  INSPIRATION: {
    BASE_PATH: "inspirations",  // thư mục trong repo B chứa .md
    CACHE_EXPIRE_HOURS: 0.01666666667,
  }

  // --- API endpoints (sau này nếu mở rộng) ---
  //   API: {
  //     BASE_URL: import.meta.env.VITE_API_URL || "",
  //   },

  // --- Build info (optional) ---
  //   BUILD: {
  //     ENV: import.meta.env.MODE, // 'development' | 'production'
  //     VERSION: "1.0.0",
  //   },
};
