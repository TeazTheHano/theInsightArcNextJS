"use client"

import React, { useEffect } from "react";
import type { BlogDetailContract } from '../../application/contracts/blog.contract';
import DateDisplay from '@/packages/shared/ui/TimeDisplay/TimeDisplay';
import { ARC_LazyImage as LazyImage } from '@/packages/shared/ui/ARC_image';
import { useTranslation } from "react-i18next";
import {  TextBodyLarge, TextBodyMedium, TextHeadlineLarge, TextLabelSmall, TextTitleSmall  } from '@/packages/shared/ui/ARC_typography';
import {  DivFlexColumn, DivFlexRow, DivFlexRowCenter  } from '@/packages/shared/ui/ARC_layout';

import styles from './BlogComponent.module.css';
import { ARC_Button as Button } from '@/packages/shared/ui/ARC_button';
import mermaid from "mermaid";

import { SEOhead } from "./SEOhead";
import useCheckScreenSize from '@/hooks/useCheckScreenSize';
import { ARC_ContainerWithLoading as ContainerWithLoading } from '@/packages/shared/ui/ARC_loading';
import { useModal } from "@/hooks/useModal";
import ShareModal from '@/packages/shared/ui/ARC_modal/ShareModal';
import { ARC_Chip as Chip } from '@/packages/shared/ui/ARC_chip';
import { slugify } from "@/utils/slugify";

const BlogDetail: React.FC<{ data: BlogDetailContract }> = ({ data }) => {
    const { meta: metadata, htmlContent } = data;
    const { t: t_blog } = useTranslation('blog');
    const { t: t_common } = useTranslation('common');
    const isInSM = useCheckScreenSize(['md', 'sm']);

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
    }, [htmlContent, isInSM]);



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
            <SEOhead meta={metadata} />
            <div style={{
                backgroundColor: 'var(--Schemes-Surface-Tint)',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)',
            }}>
                <TextTitleSmall color="var(--Schemes-On-Primary)">
                    {/* TODO: search by category page */}
                    <span style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/blog" }}>{t_common('blog-page')}</span> / <span style={{ cursor: 'pointer' }} onClick={() => { }}>{metadata.categoryName}</span> / {metadata.title}
                </TextTitleSmall>
            </div>
            <section className={styles.readingContainer}>
                <div className={styles.readingHeader}>
                    <DivFlexColumn style={{ gap: `var(--Spacing-Spacing-XS, 12px)`, flex: 1 }}>
                        <TextHeadlineLarge children={metadata.title} headline="h1" className={styles.title} />
                        <TextBodyMedium children={metadata.description} color="var(--Schemes-On-Surface-Variant)" className={styles.description} />
                        <DivFlexRow className={styles.authorRow}>
                            <DivFlexRowCenter style={{ gap: 'var(--Spacing-Spacing-XXS' }}>
                                <TextLabelSmall children={t_common('tags') + ':'} />
                                {metadata.tags?.map((e: string, tagIndex: number) => (
                                    <Chip
                                        key={`${slugify(e)}_${tagIndex}`}
                                        
                                        children={e}
                                        onClick={() => { window.location.href = `/blog/tag/${slugify(e)}` }}
                                        styleMode='FillFixed'
                                        colorMode='Tertiary'
                                    />
                                ))}
                            </DivFlexRowCenter>
                            <TextLabelSmall>{t_common('author')}: {metadata.authorName}</TextLabelSmall>
                            <TextLabelSmall children={metadata.displayDate} />

                        </DivFlexRow>
                    </DivFlexColumn>
                    <Button
                        
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
                <div
                    className={[styles.markdownContent, 'typography-system-large'].join(' ')}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />

                <DivFlexRow style={{
                    justifyContent: 'flex-end',
                    gap: 'var(--Spacing-Spacing-XS, 8px)',
                }}>
                    <Button
                        
                        children={t_common('share')}
                        leadingIcon="share_filled"
                        onClick={handleShare}
                    />

                    <Button
                        ariaLabel={t_common('report')}
                        variantMode="Icon"
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