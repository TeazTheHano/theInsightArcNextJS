'use client'

import { DivFlexColumn } from '@/components/LayoutDiv/LayoutDiv'
import { TextBodyLarge, TextHeadlineLarge } from '@/components/TextBox/textBox'
import { useTranslation } from 'react-i18next'

export default function Game() {
    const { t: t_common } = useTranslation('common')
    const { t: t_toast } = useTranslation('toast')

    return (
        <DivFlexColumn style={{
            gap: 'var(--Spacing-Spacing-M, 24px)',
            padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)'
        }}>
            <TextHeadlineLarge children={t_common('game-page')} />
            <TextBodyLarge>⚠️ {t_toast('info.inDevelopment')} ⚠️</TextBodyLarge>

            <iframe src="https://nebezb.com/floppybird/" width="100%" height="500" className='CM-border-radius-mode-default' style={{border:'none'}}></iframe>

        </DivFlexColumn>

    )
}
