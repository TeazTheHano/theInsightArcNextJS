export const setMetaTags = (meta: {
    title?: string;
    description?: string;
    image?: string;
    date?: string;
}) => {
    if (!meta) return;

    const appTitle = "The Insight Arc";
    const fullTitle = meta.title ? `${meta.title} | ${appTitle}` : appTitle;

    // Set <title>
    document.title = fullTitle;

    // Helper để set hoặc update <meta>
    const setTag = (attr: string, key: string, value: string) => {
        if (!value) return;
        let tag = document.querySelector(`meta[${attr}="${key}"]`);
        if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute(attr, key);
            document.head.appendChild(tag);
        }
        tag.setAttribute("content", value);
    };

    setTag("name", "description", meta.description || "");
    setTag("property", "og:title", fullTitle);
    setTag("property", "og:description", meta.description || "");
    setTag("property", "og:image", meta.image || "");
    setTag("property", "article:published_time", meta.date || "");
    setTag("name", "twitter:card", "summary_large_image");
};
