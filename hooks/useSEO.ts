"use client"

import { useEffect } from "react";

export interface MetaData {
    title?: string;
    description?: string;
    image?: string;
    date?: string;
    keywords?: string[];
    author?: string;
}

/**
 * Custom hook: cập nhật metadata cho <head>
 */
export const useSEO = (meta?: MetaData) => {
    useEffect(() => {
        if (!meta) return;

        const appTitle = "The Insight Arc";
        const fullTitle = meta.title ? `${meta.title} | ${appTitle}` : appTitle;
        document.title = fullTitle;

        const setTag = (attr: string, key: string, value?: string) => {
            if (!value) return;
            let tag = document.querySelector(`meta[${attr}="${key}"]`);
            if (!tag) {
                tag = document.createElement("meta");
                tag.setAttribute(attr, key);
                document.head.appendChild(tag);
            }
            tag.setAttribute("content", value);
        };

        // Cập nhật cơ bản
        setTag("name", "description", meta.description);
        setTag("property", "og:title", fullTitle);
        setTag("property", "og:description", meta.description);
        setTag("property", "og:image", meta.image);
        setTag("property", "article:published_time", meta.date);
        setTag("name", "twitter:card", "summary_large_image");

        // Optional
        if (meta.keywords?.length) {
            setTag("name", "keywords", meta.keywords.join(", "));
        }
        if (meta.author) {
            setTag("name", "author", meta.author);
        }

        // Cleanup optional — có thể xoá nếu không cần
        return () => {
            // Không xoá meta khi unmount, tránh flicker giữa các route
        };
    }, [meta]);
};
