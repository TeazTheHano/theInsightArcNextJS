'use client'

import { DivFlexColumn } from '@/components/LayoutDiv/LayoutDiv'
import { TextBodyLarge, TextHeadlineLarge, TextTitleLarge, TextTitleSmall } from '@/components/TextBox/textBox'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Termdata from '@/public/locales/en-US/term.json'
import useCheckScreenSize from '@/hooks/useCheckScreenSize'

export default function page() {
    const { t: t_term } = useTranslation('term')
    const isInSM = useCheckScreenSize(['sm']);

    function renderText() {
        return (
            Termdata.content.map((item: any, index: number) => {
                return (
                    <React.Fragment key={index}>
                        <TextTitleLarge children={t_term(`content.${index}.title`)} />
                        <TextBodyLarge children={t_term(`content.${index}.content`)} />
                        <ul>
                            {
                                item['sub-content'].map((i: number) => (
                                    <li key={i}>
                                        <TextBodyLarge children={t_term(`content.${index}.sub-content.${i}`)} />
                                    </li>
                                ))
                            }
                        </ul>
                    </React.Fragment>
                )
            })
        )
    }

    return (
        <>
            {/* temp */}
            {isInSM ?
                null :
                <div style={{
                    backgroundColor: 'var(--Schemes-Tertiary)',
                    padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)',
                }}>
                    <TextTitleSmall color="var(--Schemes-Tertiary)" children='In Development' aria-hidden />
                </div>
            }
            <DivFlexColumn style={{
                gap: 'var(--Spacing-Spacing-M, 24px)',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)'
            }}>

                <TextHeadlineLarge children={t_term('title')} color='var(--Schemes-Tertiary)' />
                {renderText()}
            </DivFlexColumn>
        </>
    )
}
