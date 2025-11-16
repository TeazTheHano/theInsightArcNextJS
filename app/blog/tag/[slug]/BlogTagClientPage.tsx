"use client";

import React, { useEffect, useMemo } from "react";
import type { BlogItemProps } from "@/data/type";
import { TextHeadlineLarge } from "@/components/TextBox/textBox";
import { BlogItem2RowGen } from "@/components/Blog/BlogListVariant";
import { useTranslation } from "react-i18next";
import { fetchBlogList } from "@/utils/fetchContent";
import { slugify } from "@/utils/slugify";
import { DivFlexColumn } from "@/components/LayoutDiv/LayoutDiv";

import styles from '@/app/blog/BlogList.module.css'
import useCheckScreenSize from "@/hooks/useCheckScreenSize";

export default function BlogTagClientPage() {
    const { t: t_common } = useTranslation('common')
    const slug: string = window.location.pathname.split("/").pop() || "";
    const displayName = slug ? slug.replace(/-/g, " ").toUpperCase() : "";

    const [blogs, setBlogs] = React.useState<BlogItemProps[]>([]);

    const isInSM = useCheckScreenSize(['sm']);
    const layoutConfig = useMemo(() => ({
        direction: isInSM ? "column" as const : "row" as const,
        trendingThumbSize: isInSM ? 100 as const : 300 as const,
        trendingRatio: isInSM ? '1' : undefined,
    }), [isInSM]);

    useEffect(() => {
        fetchBlogList().then((data) => {
            const filtered = data.filter((item) =>
                item.tags?.some((tag) => slugify(tag) === slug)
            );
            setBlogs(filtered);
        });
    }, [slug])

    return (
        <DivFlexColumn className={styles.inspirationContainer}>
            <TextHeadlineLarge headline="h1">
                {t_common('tags')}: <span style={{ color: "var(--Schemes-Primary)" }}>{displayName}</span>
            </TextHeadlineLarge>

            <BlogItem2RowGen dataList={blogs} thumbSize={600} direction={layoutConfig.direction} />
        </DivFlexColumn>

    );
}