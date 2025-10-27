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
import { useModal } from "@/hooks/useModal";
import ShareModal from "../Modal/ShareModal";

marked.setOptions({ async: false });

const BlogDetail: React.FC<{ metadata: BlogItemProps }> = ({ metadata }) => {
    const { t: t_blog } = useTranslation('blog');
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

    const { openModal } = useModal();

    const handleShare = () => {
        openModal({
            element: <ShareModal title={metadata.title} url={window.location.href} />,
            props: {
                title: `${t_common('share')} ${t_common('blog')}`,
                sizeMode: 600,
                bgDark: true,
                contentText: metadata.title,
            },
        });
    };

    return (
        <div>
            <SEOhead meta={meta} />
            <div style={{
                backgroundColor: 'var(--Schemes-Surface-Tint)',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)',
            }}>
                <TextTitleSmall color="var(--Schemes-On-Primary)">
                    {/* TODO: search by category page */}
                    <span style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/blog" }}>{t_common('blog-page')}</span> / <span style={{ cursor: 'pointer' }} onClick={() => { }}>{metadata.category}</span> / {metadata.title}
                </TextTitleSmall>
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
                        onClick={handleShare}
                    />
                </div>
                {metadata.coverImage && (
                    <LazyImage
                        src={metadata.coverImage}
                        alt={t_blog('coverImageAlt') + metadata.title}
                        aspectRatio='21/9'
                    />
                )}
                <ContainerWithLoading loadingState={isLoading} errMessage={error}>
                    <div
                        className={styles.markdownContent}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </ContainerWithLoading>

                <DivFlexRow style={{
                    justifyContent: 'flex-end',
                    gap: 'var(--Spacing-Spacing-XS, 8px)',
                }}>
                    <Button
                        label={t_common('share')}
                        children={t_common('share')}
                        leadingIcon="share_filled"
                        onClick={handleShare}
                    />

                    <Button
                        label={t_common('report')}
                        colorMode="Error"
                        children={`${t_common('report')} ${t_common('blog')}`}
                        leadingIcon="flag_2_filled"
                        onClick={() => (window.location.href = `mailto:teaz.khuonganhkiet@gmail.com?subject=REPORT-${metadata.title}&body=${window.location.href}`)}
                    />
                </DivFlexRow>
            </section>
        </div>
    );
};

export default BlogDetail;