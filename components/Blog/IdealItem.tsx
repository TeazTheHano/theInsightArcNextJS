"use client"

import React, { useMemo, useCallback } from 'react'
import { DivFlexColumn, DivFlexRow } from '../LayoutDiv/LayoutDiv'
import LazyImage from '../LazyImage/lazyImage'
import { TextBodyLarge, TextBodySmall, TextHeadlineSmall } from '../TextBox/textBox'

import styles from './BlogComponent.module.css'
import type { BlogItemProps } from '../../data/type'
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'


export interface IdealItemProps {
    dataList: BlogItemProps[]
    openAsNewTab?: boolean
    squareRatio?: boolean
    compactMode?: boolean
}

const IdealItem: React.FC<IdealItemProps> = ({
    dataList,
    openAsNewTab,
    squareRatio,
    compactMode,
}) => {

    const { t } = useTranslation('toast')

    const handleTagClick = useCallback((link: string) => {
        window.open(link, '_blank');
    }, []);

    const renderedItems = useMemo(() => {
        if (dataList.length === 0) {
            return <TextBodyLarge children={t('info.noData')} color='var(--Schemes-On-Surface-Variant)' />
        }

        return dataList.map((item, index) => (
            <div
                key={`${item.title}_${index}`}
                aria-label={item.title}
                tabIndex={0}
                style={{ width: '100%' }}
            // add onclick to show in extend mode
            >
                <div className={styles.blog2RowContainer}>
                    <LazyImage
                        src={item.coverImage}
                        aspectRatio={squareRatio ? '1' : item.ratio || '16/9'}
                        className={styles.Blog2RowComponentImage}
                        borderRadius='default'
                    />
                    <DivFlexRow style={{ flex: 1, gap: 'var(--Spacing-Spacing-S, 16ideapx)' }}>
                        <DivFlexColumn className={styles.titleHolder} style={{ flex: 1 }}>
                            <TextHeadlineSmall children={item.title} className={styles.title} maxLines={2} />
                            {
                                !compactMode &&
                                <TextBodySmall
                                    children={item.description}
                                    className={styles.description}
                                    maxLines={3}
                                    color='var(--Schemes-On-Surface-Variant)'
                                />
                            }
                        </DivFlexColumn>

                        <Button
                            children={t('inspiration-outward_arrow')}
                            showTitleWhileHover
                            variantMode='Icon' label={t('inspiration-outward_arrow')} leadingIcon='arrow_outward' onClick={() => handleTagClick(item.link || '')} />
                    </DivFlexRow>
                </div>
            </div>
        ));
    }, [dataList, openAsNewTab, compactMode, handleTagClick, squareRatio, t]);

    return <>{renderedItems}</>;
}

IdealItem.displayName = 'IdealItem';

export const IdealItemGen = React.memo(IdealItem)
