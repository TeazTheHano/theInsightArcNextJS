'use client'

import { DivFlexColumn } from '@/components/LayoutDiv/LayoutDiv'
import { TextBodyLarge, TextHeadlineLarge } from '@/components/TextBox/textBox'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function page() {
    const { t: t_common } = useTranslation('common')
    const { t: t_toast } = useTranslation('toast')
    return (
        <DivFlexColumn style={{
            gap: 'var(--Spacing-Spacing-M, 24px)',
            padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)'
        }}>
            <TextHeadlineLarge children={t_common('term-page')} />
            <TextBodyLarge>⚠️ {t_toast('info.noData')} ⚠️</TextBodyLarge>
        </DivFlexColumn>
    )
}
