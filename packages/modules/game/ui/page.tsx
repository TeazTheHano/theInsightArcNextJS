'use client'

import {  DivFlexColumn  } from '@/packages/shared/ui/ARC_layout';
import {  TextBodyLarge, TextHeadlineLarge, TextTitleSmall  } from '@/packages/shared/ui/ARC_typography';
import useCheckScreenSize from '@/hooks/useCheckScreenSize'
import { useTranslation } from 'react-i18next'

export default function Game() {
    const { t: t_common } = useTranslation('common')
    const { t: t_toast } = useTranslation('toast')
    const isInSM = useCheckScreenSize(['sm']);

    return (
        <>
            {/* temp */}
            {isInSM ?
                null :
                <div style={{
                    backgroundColor: 'var(--Schemes-Secondary-Container)',
                    padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)',
                }}>
                    <TextTitleSmall color="var(--Schemes-Secondary-Container)" children='In Development' aria-hidden />
                </div>
            }
            <DivFlexColumn style={{
                gap: 'var(--Spacing-Spacing-M, 24px)',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)'
            }}>
                <TextHeadlineLarge children={t_common('game-page')} />
                <TextBodyLarge>⚠️ {t_toast('info.inDevelopment')} ⚠️</TextBodyLarge>

                <iframe src="https://nebezb.com/floppybird/" width="100%" height="500" className='CM-border-radius-mode-default' style={{ border: 'none' }}></iframe>

            </DivFlexColumn>
        </>
    )
}
