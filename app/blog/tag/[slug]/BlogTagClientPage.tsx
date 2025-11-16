"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { BlogItemProps } from "@/data/type";
import { TextHeadlineLarge, TextTitleSmall } from "@/components/TextBox/textBox";
import { BlogItem2RowGen } from "@/components/Blog/BlogListVariant";
import { useTranslation } from "react-i18next";
import { fetchBlogList } from "@/utils/fetchContent";
import { slugify } from "@/utils/slugify";
import { DivFlexColumn, DivFlexRowSpaceBetweenCenter } from "@/components/LayoutDiv/LayoutDiv";
import { useParams } from "next/navigation";

import styles from '@/app/blog/BlogList.module.css'
import useCheckScreenSize from "@/hooks/useCheckScreenSize";
import Button from "@/components/Button/Button";
import { useModal } from "@/hooks/useModal";
import ShareModal from "@/components/Modal/ShareModal";

export default function BlogTagClientPage() {
    const { t: t_common } = useTranslation('common')
    const params = useParams();
    const slug = params.slug as string;
    const displayName = slug ? slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "";
    const [currentUrl, setCurrentUrl] = useState("");

    const [blogs, setBlogs] = React.useState<BlogItemProps[]>([]);

    const isInSM = useCheckScreenSize(['sm']);
    const layoutConfig = useMemo(() => ({
        direction: isInSM ? "column" as const : "row" as const,
        trendingThumbSize: isInSM ? 100 as const : 300 as const,
        trendingRatio: isInSM ? '1' : undefined,
    }), [isInSM]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
        fetchBlogList().then((data) => {
            const filtered = data.filter((item) =>
                item.tags?.some((tag) => slugify(tag) === slug)
            );
            setBlogs(filtered);
        });
    }, [slug])

    const { openModal } = useModal()
    const handleShare = () => {
        openModal({
            element: <ShareModal title={`${t_common('share')} ${t_common('tags')}`} url={currentUrl} />,
            props: {
                title: `${t_common('share')} ${t_common('tags')}`,
                sizeMode: 600,
                bgDark: true,
                contentText: displayName,
            },
        });
    };

    return (
        <>
            <div style={{
                backgroundColor: 'var(--Schemes-Surface-Tint)',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)',
            }}>
                <TextTitleSmall color="var(--Schemes-On-Primary)">
                    {/* TODO: search by category page */}
                    <span style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/blog" }}>{t_common('blog-page')}</span> / {t_common('tags')} / <span style={{ cursor: 'pointer' }} onClick={() => { }}>{displayName}</span>
                </TextTitleSmall>
            </div>
            <DivFlexColumn className={styles.inspirationContainer}>
                <DivFlexRowSpaceBetweenCenter>
                    <TextHeadlineLarge headline="h1">
                        {t_common('tags')}: <span style={{ color: "var(--Schemes-Primary)" }}>{displayName}</span>
                    </TextHeadlineLarge>
                    <Button
                        label={t_common('share')}
                        children={t_common('share')}
                        leadingIcon="share_filled"
                        variantMode={isInSM ? 'Icon' : 'Default'}
                        onClick={handleShare}
                    />
                </DivFlexRowSpaceBetweenCenter>

                <BlogItem2RowGen dataList={blogs} thumbSize={600} direction={layoutConfig.direction} style={{ maxWidth: 1440 }} />
            </DivFlexColumn>
        </>

    );
}