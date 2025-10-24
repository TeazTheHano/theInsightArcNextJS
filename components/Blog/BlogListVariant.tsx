import React, { useMemo, useCallback } from 'react'
import { DivFlexColumn, DivFlexColumnSpaceBetween, DivFlexRow } from '../LayoutDiv/LayoutDiv'
import LazyImage from '../LazyImage/lazyImage'
import { TextBodyLarge, TextBodyMedium, TextBodySmall, TextHeadlineSmall, TextLabelSmall, TextTitleMedium } from '../TextBox/textBox'

import styles from './BlogComponent.module.css'
import type { BlogItemProps } from '../../data/type'
import Chip from '../Chip/Chip'
import { useTranslation } from 'react-i18next'
import DateDisplay from '../TimeDisplay/TimeDisplay'

export interface Blog2RowComponentProps {
    dataList: BlogItemProps[]
    openAsNewTab?: boolean
    direction?: 'row' | 'column'
    thumbSize?: 100 | 300 | 600 | 'full'
    ratio?: string
    compactMode?: boolean
    hideDescription?: boolean
    hideTag?: boolean
    smallTitle?: boolean
}

const Blog2RowComponent: React.FC<Blog2RowComponentProps> = ({
    dataList,
    openAsNewTab,
    direction = 'row',
    thumbSize = 'full',
    ratio = '16/9',
    compactMode,
    hideDescription,
    hideTag,
    smallTitle,
}) => {

    const { t } = useTranslation('toast')

    const containerClass = useMemo(() => [
        styles.blog2RowContainer,
        styles[`direction-${direction}`],
        styles[`thumbSize-${thumbSize}`]
    ].filter(Boolean).join(' ').trim(), [direction, thumbSize]);

    const handleTagClick = useCallback((link: string) => {
        window.open(link, '_blank');
    }, []);

    const renderedItems = useMemo(() => {
        if (dataList.length === 0) {
            return <TextBodyLarge children={t('info.noData')} color='var(--Schemes-On-Surface-Variant)' />
        }

        return dataList.map((item, index) => (
            <a
                key={`${item.title}_${index}`}
                href={item.link ? item.link : item.id ? `/blog/${item.id}` : '#'}
                aria-label={item.title}
                tabIndex={0}
                style={{ width: '100%' }}
                target={openAsNewTab ? '_blank' : '_self'}
            >
                <div className={containerClass}>
                    {compactMode ? (
                        <>
                            <LazyImage
                                src={item.coverImage}
                                aspectRatio={ratio}
                                width={200}
                                className={styles.Blog2RowComponentImage}
                                borderRadius='default'
                            />
                            <DivFlexColumnSpaceBetween style={{ flex: 1 }}>
                                <TextTitleMedium children={item.title} className={styles.title} maxLines={3} />
                                <TextLabelSmall children={<DateDisplay date={item.timeStamp} />} color='var(--Schemes-Outline)' />
                            </DivFlexColumnSpaceBetween>
                        </>
                    ) : (
                        <>
                            <LazyImage
                                src={item.coverImage}
                                borderRadius='default'
                                className={styles.Blog2RowComponentImage}
                                width={direction === 'column' ? '100%' : '50%'}
                                height={'100%'}
                                aspectRatio={ratio}
                                maxWidth={thumbSize !== 'full' ? `${thumbSize}px` : undefined}
                            />
                            <DivFlexColumnSpaceBetween style={{ flex: 1 }} className={styles.titleHolder}>
                                <DivFlexColumn className={styles.titleHolder}>
                                    {
                                        smallTitle ?
                                            <TextBodyMedium children={item.title} className={styles.title} maxLines={3} />
                                            : <TextHeadlineSmall children={item.title} className={styles.title} maxLines={3} />
                                    }
                                    {!hideDescription &&
                                        <TextBodySmall
                                            children={item.description}
                                            className={styles.description}
                                            maxLines={3}
                                            color='var(--Schemes-On-Surface-Variant)'
                                        />
                                    }
                                </DivFlexColumn>

                                <DivFlexColumn className={styles.support}>
                                    {item.tags?.length && !hideTag && (
                                        <DivFlexRow className={styles.tags}>
                                            {item.tags.map((e, tagIndex) => (
                                                <Chip
                                                    key={`${e.title}_${tagIndex}`}
                                                    label={e.title}
                                                    children={e.title}
                                                    onClick={() => handleTagClick(e.link)}
                                                    styleMode='FillFixed'
                                                    colorMode='Secondary'
                                                />
                                            ))}
                                        </DivFlexRow>
                                    )}
                                    <TextLabelSmall children={<DateDisplay date={item.timeStamp} />} color='var(--Schemes-Outline)' />
                                </DivFlexColumn>
                            </DivFlexColumnSpaceBetween>
                        </>
                    )}
                </div>
            </a>
        ));
    }, [dataList, openAsNewTab, containerClass, compactMode, ratio, direction, thumbSize, handleTagClick, t]);

    return <>{renderedItems}</>;
}

Blog2RowComponent.displayName = 'Blog2RowComponent';

export const BlogItem2RowGen = React.memo(Blog2RowComponent)

