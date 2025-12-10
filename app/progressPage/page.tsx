'use client'

import { DivFlexColumn } from '@/components/LayoutDiv/LayoutDiv'
import { TextBodyLarge, TextHeadlineLarge, TextTitleSmall } from '@/components/TextBox/textBox'
import useCheckScreenSize from '@/hooks/useCheckScreenSize'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function page() {
    const { t: t_common } = useTranslation('common')
    const { t: t_toast } = useTranslation('toast')
    const isInSM = useCheckScreenSize(['sm']);

    return (
        <>
            {/* temp */}
            {isInSM ?
                null :
                <div style={{
                    backgroundColor: 'var(--Schemes-Surface-Variant)',
                    padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)',
                }}>
                    <TextTitleSmall color="var(--Schemes-Surface-Variant)" children='In Development' aria-hidden />
                </div>
            }
            <DivFlexColumn style={{
                gap: 'var(--Spacing-Spacing-M, 24px)',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)'
            }}>
                <TextHeadlineLarge children={t_common('progress-page')} />
                <TextBodyLarge>
                    VI: <br />
                    Toàn bộ dự án đang được tái cấu trúc theo hướng Domain-driven design (DDD), Kiến trúc Layer để code sạch, dễ bảo trì trong tương lai.
                </TextBodyLarge>
                <TextBodyLarge>
                    EN: <br />
                    The project is now under maintaintence: changing to Domain-driven design (DDD), Layer architecture to clean the code for better performance and adaption for future.
                </TextBodyLarge>
            </DivFlexColumn>
        </>
    )
}
