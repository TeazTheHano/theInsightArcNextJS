'use client'

import { DivFlexColumn } from '@/components/LayoutDiv/LayoutDiv'
import { TextBodyLarge, TextHeadlineLarge, TextTitleLarge, TextTitleSmall } from '@/components/TextBox/textBox'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Termdata from '@/public/locales/en-US/term.json'
import useCheckScreenSize from '@/hooks/useCheckScreenSize'
import LoadingIndicators from '@/components/Loading Indicators/LoadingIndicators'

export default function page() {
    const { t: t_term } = useTranslation('term')
    const isInSM = useCheckScreenSize(['sm']);
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        // Simulate content loading - in a real app this might be an API call
        const loadContent = async () => {
            // Small delay to show loading state
            await new Promise(resolve => setTimeout(resolve, 100));
            setIsContentLoaded(true);
        };

        loadContent();
    }, []);

    function renderText() {
        return (
            Termdata.content.map((item: any, index: number) => {
                return (
                    <React.Fragment key={index}>
                        <TextTitleLarge children={t_term(`content.${index}.title`)} />
                        <TextBodyLarge children={t_term(`content.${index}.content`)} />
                        <ul>
                            {item['sub-content']?.map((_: any, subIndex: number) => (
                                <li
                                    key={subIndex}
                                    style={{ color: 'var(--Schemes-On-Surface)' }}
                                >
                                    <TextBodyLarge
                                        children={t_term(
                                            `content.${index}.sub-content.${subIndex}`
                                        )}
                                    />
                                </li>
                            ))}
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

            {!isContentLoaded ? (
                <LoadingIndicators isLoading={!isContentLoaded} />
            ) : (
                <DivFlexColumn style={{
                    gap: 'var(--Spacing-Spacing-M, 24px)',
                    padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)'
                }}>
                    <TextHeadlineLarge children={t_term('title')} color='var(--Schemes-Tertiary)' />
                    {renderText()}
                </DivFlexColumn>
            )}
        </>
    )
}
