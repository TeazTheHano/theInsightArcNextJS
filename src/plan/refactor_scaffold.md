# 🏗️ Refactor Scaffold — The Insight Arc (Clean Architecture)

## Mục tiêu
Thiết kế lại toàn bộ hệ thống theo đúng nguyên tắc:

- Clean Architecture  
- Ports & Adapters  
- Separation of Concerns  
- Scalable folder structure  
- Decoupled UI ↔ Domain ↔ Infra  

---

# 📚 **1. Folder Structure Chuẩn**

```
src/
  core/
    domain/
      Blog.ts
    entities/
      BlogMetaData.ts
      BlogContent.ts
    usecases/
      GetBlogList.ts
      GetBlogBySlug.ts
      IncreaseBlogView.ts
    ports/
      BlogRepositoryPort.ts
      BlogViewCounterPort.ts
    mappers/
      BlogMapper.ts

  infrastructure/
    github/
      GitHubBlogRepository.ts
    vercel/
      VercelKVViewCounter.ts

  app/
    blog/
    inspiration/
    api/

  ui/
  shared/
```

---

# 📦 **2. Core Entities**

## `/core/entities/BlogMetaData.ts`

```ts
export interface BlogMetaData {
    id: string
    title: string
    description: string
    coverImage: string
    coverImageSquare: string | null
    publishedAt: string
    category: string
    author: string
    tags: string[]
}
```

---

# 🧠 **3. Domain Model**

## `/core/domain/Blog.ts`

```ts
export class Blog {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly coverImage: string,
        public readonly coverImageSquare: string | null,
        public readonly publishedAt: Date,
        public readonly category: string,
        public readonly author: string,
        public readonly tags: string[],
    ) {}

    get formattedDate() {
        return this.publishedAt.toLocaleDateString("vi-VN");
    }

    isFeatured() {
        return this.tags.includes("featured");
    }
}
```

---

# 🔄 **4. Mapper**

## `/core/mappers/BlogMapper.ts`

```ts
import { BlogMetaData } from "../entities/BlogMetaData";
import { Blog } from "../domain/Blog";

export class BlogMapper {
    static toDomain(meta: BlogMetaData): Blog {
        return new Blog(
            meta.id,
            meta.title,
            meta.description,
            meta.coverImage,
            meta.coverImageSquare,
            new Date(meta.publishedAt),
            meta.category,
            meta.author,
            meta.tags,
        );
    }
}
```

---

# 🎯 **5. Ports**

## `BlogRepositoryPort.ts`

```ts
import type { Blog } from "../domain/Blog";

export interface BlogRepositoryPort {
    getAllBlogs(): Promise<Blog[]>;
    getBlogBySlug(slug: string): Promise<Blog | null>;
}
```

## `BlogViewCounterPort.ts`

```ts
export interface BlogViewCounterPort {
    increaseView(id: string): Promise<number>;
    getViews(id: string): Promise<number>;
}
```

---

# 🚀 **6. Use Cases**

## `GetBlogList.ts`

```ts
import type { BlogRepositoryPort } from "../ports/BlogRepositoryPort";

export class GetBlogList {
    constructor(private repo: BlogRepositoryPort) {}

    execute() {
        return this.repo.getAllBlogs();
    }
}
```

## `GetBlogBySlug.ts`

```ts
import type { BlogRepositoryPort } from "../ports/BlogRepositoryPort";

export class GetBlogBySlug {
    constructor(private repo: BlogRepositoryPort) {}

    execute(slug: string) {
        return this.repo.getBlogBySlug(slug);
    }
}
```

## `IncreaseBlogView.ts`

```ts
import type { BlogViewCounterPort } from "../ports/BlogViewCounterPort";

export class IncreaseBlogView {
    constructor(private port: BlogViewCounterPort) {}

    execute(blogId: string) {
        return this.port.increaseView(blogId);
    }
}
```

---

# 🏗️ **7. Infrastructure Implementation**

- GitHubBlogRepository → Fetch metadata.json, fetch content, map → Domain  
- VercelKVViewCounter → Implement view counter port  

---

# 📌 **8. Hiện trạng tiến độ (Checklist)**

### 🔵 CORE  
- [x] Entities  
- [x] Domain Model  
- [x] Ports  
- [x] Use Cases  
- [x] Mapper  

### 🔵 INFRA  
- [ ] GitHubBlogRepository  
- [ ] VercelKVViewCounter  

### 🔵 UI / APP  
- [ ] Tích hợp usecases vào page  
- [ ] Trending  
- [ ] Tag page  
- [ ] Search  
- [ ] Share modal  

---

# 📝 **9. Quy tắc bất biến**

- UI không được gọi GitHub API trực tiếp  
- UI chỉ gọi UseCase  
- UseCase chỉ nói chuyện với Ports  
- Infra chỉ implement Ports  
- Mapper ở giữa Entity ↔ Domain  
- Domain model là bất biến và không optional  
