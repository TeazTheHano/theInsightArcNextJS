# Fix Turbopack Build Errors

## Sass Deprecation Warnings
- [ ] Update styles/index.scss to use @use instead of @import and adjust @extend statements

## CSS Module Purity Errors
- [ ] Update app/rootLayout.module.css to wrap "main" in :global()
- [ ] Update components/Blog/BlogComponent.module.css to wrap "*", "iframe", "video" in :global()
- [ ] Update components/Button/Button.module.css to wrap complex selectors in :global()
- [ ] Update components/NavigationUnit/NavigationUnit.module.css to wrap "nav" in :global()

## Testing
- [ ] Run build to verify errors are resolved
