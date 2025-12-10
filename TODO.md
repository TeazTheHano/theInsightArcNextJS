
# Things

src/
 ├─ core/
 │   ├─ entities/
 │   │   ├─ Blog.ts
 │   │   ├─ Inspiration.ts
 │   ├─ use-cases/
 │   │   ├─ GetBlogList.ts
 │   │   ├─ GetBlogDetail.ts
 │   │   ├─ SearchBlog.ts
 │   │   ├─ IncrementViewCount.ts
 │   ├─ ports/
 │       ├─ BlogRepository.ts     <-- interface
 │       ├─ ViewCounterRepository.ts
 │
 ├─ infrastructure/
 │   ├─ github/
 │   │   ├─ GithubBlogRepository.ts
 │   ├─ vercel/
 │   │   ├─ KVViewCounterRepository.ts
 │   ├─ cache/
 │       ├─ LocalStorageCache.ts
 │
 ├─ presentation/
 │   ├─ components/
 │   ├─ hooks/
 │   ├─ pages/ (Next.js)
 │   ├─ adapters/
 │       ├─ useBlogList.ts
 │       ├─ useBlogDetail.ts
 │       ├─ useSearchBlog.ts
 │

app/78678
 ├─ blog/
 │   ├─ page.tsx
 │   ├─ [id]/
 │        ├─ page.tsx
 │
 ├─ inspiration/
