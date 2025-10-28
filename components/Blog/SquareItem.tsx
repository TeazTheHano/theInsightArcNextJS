"use client"

import React, { useMemo } from 'react'
import { DivFlexColumnSpaceBetween, DivFlexRow } from '../LayoutDiv/LayoutDiv'
import LazyImage from '../LazyImage/lazyImage'
import { IconGen } from '../../public/assets/icon/OtherIcon'
import { TextBodyLarge, TextHeadlineMedium } from '../TextBox/textBox'

import styles from './BlogComponent.module.css'
import type { BlogItemProps } from '../../data/type'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

interface BlogSquareItemProps {
    dataList: BlogItemProps[],
    openAsNewTab?: boolean,
    maxWidth?: number,
    maxHeight?: number,
    ratio?: string
}

const BlogSquareItemComponent: React.FC<BlogSquareItemProps> = ({
    dataList,
    openAsNewTab,
    maxWidth,
    maxHeight,
    ratio = '1',
}) => {

    const { t: t_toast } = useTranslation('toast')

    const linkStyle = useMemo(() => ({
        width: '100%',
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        aspectRatio: ratio
    }), [maxWidth, maxHeight, ratio]);

    const renderedItems = useMemo(() => {
        if (dataList.length === 0) {
            return <TextBodyLarge children={t_toast('info.noData')} color='var(--Schemes-On-Surface-Variant)' />
        }

        return dataList.map((item, index) => (
            <Link
                key={`${item.title}_${index}`}
                href={item.link || `/blog/${item.id}`}
                aria-label={item.title}
                tabIndex={0}
                style={linkStyle}
                target={openAsNewTab ? '_blank' : '_self'}
            >
                <DivFlexColumnSpaceBetween
                    className={`${styles.blogItemContainer} CM-border-radius-mode-default`}
                >
                    <LazyImage
                        src={item.coverImageSquare || item.coverImage}
                        aspectRatio={ratio}
                        width={'100%'}
                        maxHeight={maxHeight ? `${maxHeight}px` : undefined}
                        maxWidth={maxWidth ? `${maxWidth}px` : undefined}
                    />
                    <DivFlexColumnSpaceBetween className={styles.overlay}>
                        <DivFlexRow className={styles.iconRow}>
                            <div className={styles.iconContainer}>
                                <IconGen svgName='arrow_outward' fillColor='var(--Schemes-Primary)' />
                            </div>
                        </DivFlexRow>
                        {item.title ? <span><TextHeadlineMedium className={styles.title} maxLines={4} color='' children={item.title} /></span> : null}
                    </DivFlexColumnSpaceBetween>
                </DivFlexColumnSpaceBetween>
            </Link>
        ));
    }, [dataList, linkStyle, openAsNewTab, ratio, maxWidth, maxHeight, t_toast]);

    return <>{renderedItems}</>;
}

BlogSquareItemComponent.displayName = 'BlogSquareItemComponent';

export const BlogSquareItemGen = React.memo(BlogSquareItemComponent)
