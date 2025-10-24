"use client"

import React, { useEffect, useState } from "react";
import { marked } from "marked";
import type { BlogItemProps } from "../../data/type";
import DateDisplay from "../TimeDisplay/TimeDisplay";
import LazyImage from "../LazyImage/lazyImage";
import { useTranslation } from "react-i18next";
import { TextBodyMedium, TextHeadlineLarge, TextLabelSmall, TextTitleSmall } from "../TextBox/textBox";
import { DivFlexColumn, DivFlexRow } from "../LayoutDiv/LayoutDiv";

import styles from './BlogComponent.module.css';
import Button from "../Button/Button";
import mermaid from "mermaid";
import { fetchBlogContent } from "../../utils/fetchContent";
import { SEOhead } from "./SEOhead";
import useCheckScreenSize from "../../hooks/useCheckScreenSize";
import ContainerWithLoading from "../ContainerWithLoading/ContainerWithLoading";

marked.setOptions({ async: false });

const BlogDetail: React.FC<{ metadata: BlogItemProps }> = ({ metadata }) => {
    const { t } = useTranslation('blog');
    const { t: t_common } = useTranslation('common');
    const isInSM = useCheckScreenSize(['md', 'sm']);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('')

    const [html, setHtml] = useState("");
    const [meta, setMeta] = useState<any>(null);

    // Sau khi HTML được set => render Mermaid
    useEffect(() => {
        // Khởi tạo Mermaid
        mermaid.initialize({ startOnLoad: false, theme: "neutral" });

        // Dò tất cả code block có class "language-mermaid"
        const mermaidBlocks = document.querySelectorAll("code.language-mermaid");
        mermaidBlocks.forEach((block, i) => {
            const code = block.textContent || "";
            const container = document.createElement("div");
            container.classList.add("mermaid");
            container.textContent = code;

            block.parentElement?.replaceWith(container);

            // Render từng sơ đồ
            mermaid.render(`mermaid-${i}`, code).then(({ svg }) => {
                container.innerHTML = svg;
            });
        });
    }, [html, isInSM]);

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const res = await fetchBlogContent(metadata.id);
                const parsedHtml = marked.parse(res.content) as string;
                setHtml(parsedHtml);
                setIsLoading(false);
                setMeta(res.meta);
            } catch (err) {
                setError(`BlogDetail.tsx - ${err}`);
            }
        };
        fetchMarkdown();
    }, [metadata.id]);

    return (
        <div>
            <SEOhead meta={meta} />
            <div style={{
                backgroundColor: 'var(--Schemes-Surface-Tint)',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)',
            }}>
                <TextTitleSmall color="var(--Schemes-On-Primary)" children='Viết và Bàn luận > Category 1 > Giới hạn của công nghệ, du lịch tại chỗ và du lịch từ xa' />
            </div>
            <section className={styles.readingContainer}>
                <div className={styles.readingHeader}>
                    <DivFlexColumn style={{ gap: `var(--Spacing-Spacing-XS, 12px)`, flex: 1 }}>
                        <TextHeadlineLarge children={metadata.title} headline="h1" className={styles.title} />
                        <TextBodyMedium children={metadata.description} color="var(--Schemes-On-Surface-Variant)" className={styles.description} />
                        <DivFlexRow className={styles.authorRow}>
                            <TextLabelSmall>{t_common('author')}: {metadata.author}</TextLabelSmall>
                            <TextLabelSmall children={<DateDisplay date={metadata.timeStamp} />} />
                        </DivFlexRow>
                    </DivFlexColumn>
                    <Button
                        label={t_common('share')}
                        children={t_common('share')}
                        leadingIcon="share_filled"
                        variantMode={isInSM ? 'Default' : 'Icon'}
                    />
                </div>
                {metadata.coverImage && (
                    <LazyImage
                        src={metadata.coverImage}
                        alt={t('coverImageAlt') + metadata.title}
                        aspectRatio='21/9'
                    />
                )}
                <ContainerWithLoading loadingState={isLoading} errMessage={error}>
                    <div
                        className={styles.markdownContent}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </ContainerWithLoading>
            </section>
        </div>
    );
};

export default BlogDetail;