# CSS Optimization and SPA Navigation Plan

## CSS Optimization Steps
1. Analyze current CSS usage and identify critical vs non-critical styles.
2. Remove or minimize unused Tailwind CSS imports since it's not heavily used.
3. Extract critical CSS (e.g., fonts, base styles) to inline in layout.tsx.
4. Lazy load non-critical CSS (e.g., themes, typography variants) using dynamic imports.
5. Update next.config.ts for additional optimizations like SWC and CSS minification.
6. Test the changes to ensure faster loading and SPA navigation.

## SPA Navigation Steps
1. Analyze current navigation implementation (using <a> tags instead of Next.js Link).
2. Replace all internal <a href> with Next.js <Link> components for client-side routing.
3. Replace window.location.href with useRouter().push() for programmatic navigation.
4. Check for any server-side rendering issues or large bundle sizes.
5. Test navigation to ensure SPA behavior and improved performance.

## Progress
- [x] CSS Step 1: Analyze CSS usage
- [x] CSS Step 2: Remove/minimize Tailwind
- [x] CSS Step 3: Inline critical CSS
- [x] CSS Step 4: Lazy load non-critical CSS
- [x] CSS Step 5: Update next.config.ts
- [x] CSS Step 6: Test and verify
- [x] SPA Step 1: Analyze navigation
- [x] SPA Step 2: Replace <a> with <Link> in NavigationUnit
- [x] SPA Step 3: Replace <a> with <Link> in Blog components
- [x] SPA Step 4: Replace window.location.href in landing page
- [ ] SPA Step 5: Check bundle size and optimize if needed
- [ ] SPA Step 6: Test and verify SPA navigation
