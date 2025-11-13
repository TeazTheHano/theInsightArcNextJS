'use client'

import Button from '@/components/Button/Button';
import { DivFlexColumn, DivFlexRow, DivFlexRowSpaceEvenly } from '@/components/LayoutDiv/LayoutDiv';
import LazyImage from '@/components/LazyImage/lazyImage';
import { TextBodyLarge, TextBodyMedium, TextDisplaySmall, TextHeadlineLarge, TextHeadlineMedium, TextHeadlineSmall, TextTitleLarge, TextTitleSmall } from '@/components/TextBox/textBox';
import { useModal } from '@/hooks/useModal';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Contact() {
    const { t: t_common } = useTranslation('common')
    const { t: t_contact } = useTranslation('contact')
    const { t: t_toast } = useTranslation('toast')

    const { openModal, closeModalById } = useModal();

    return (
        <>
            <div style={{
                backgroundColor: 'var(--Schemes-Tertiary-Container)',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)',
            }}>
                <TextTitleSmall color='var(--Schemes-On-Tertiary-Container)' children={t_common('contact-page')} />
            </div>
            <DivFlexColumn style={{
                gap: 'var(--Spacing-Spacing-M, 24px)',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-S, 16px)'
            }}>

                <DivFlexRowSpaceEvenly style={{
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    width: '100%',
                    gap: 'var(--Spacing-Spacing-M, 24px)',
                }}>
                    <DivFlexColumn>
                        <TextDisplaySmall children={t_contact("teaz.name")} />
                        <TextBodyLarge children={t_contact("teaz.description")} />
                    </DivFlexColumn>

                    <div style={{
                        transition: 'border-radius 0.3s ease, transform 0.3s ease',
                        cursor: 'pointer',
                        borderRadius: '100%',
                        overflow: 'hidden',
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderRadius = '0%';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderRadius = '100%';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <LazyImage src='/photos/teaz.jpeg' width={300} aspectRatio='1' />
                    </div>
                </DivFlexRowSpaceEvenly>


                <DivFlexColumn style={{ maxWidth: '1000px', margin: 'auto', textAlign: 'justify', gap: 'var(--Spacing-Spacing-L)' }}>
                    <TextBodyLarge children={t_contact("teaz.role")} />

                    {/* content */}
                    {
                        ['intro', 'whyICode', 'aboutPlatform', 'vision', 'mission', 'future', 'collaboration'].map((item: string, index) => (
                            <React.Fragment key={index}>
                                <DivFlexColumn style={{ gap: 'var(--Spacing-Spacing-XXXS)' }}>
                                    <TextHeadlineMedium children={t_contact(`teaz.content.${item}.title`)} color='var(--Schemes-Primary)' />
                                    <TextBodyLarge children={t_contact(`teaz.content.${item}.paragraph`)} />
                                </DivFlexColumn>
                            </React.Fragment>
                        ))
                    }

                    <DivFlexColumn style={{ gap: 'var(--Spacing-Spacing-XXXS)' }}>
                        <TextHeadlineMedium children={t_contact("cta.contact")} color='var(--Schemes-Secondary)' />
                        <DivFlexRow style={{
                            flexWrap: 'wrap',
                            gap: 'var(--Spacing-Spacing-S)',
                        }}>
                            <Button styleMode='FillFixed' colorMode='Tertiary'
                                children={t_contact("cta.resume")}
                                onClick={() => window.open(`${t_contact("teaz.ctaLink.resume")}`, '_blank')}
                            />
                            <Button styleMode='Outlined' colorMode='Tertiary'
                                children={`Email: ${t_contact("teaz.ctaLink.email")}`}
                                onClick={() => {
                                    navigator.clipboard.writeText(t_contact("teaz.ctaLink.email"));
                                    openModal({
                                        id: 'contact_copy_modal',
                                        props: {
                                            title: t_toast("success.copied"),
                                            sizeMode: 300,
                                            topLeftCloseButton: false
                                        },
                                    });
                                    setTimeout(() => {
                                        closeModalById('contact_copy_modal')
                                    }, 2000)
                                }}
                            />
                            <Button styleMode='Outlined' colorMode='Tertiary'
                                children={`Phone: ${t_contact("teaz.ctaLink.phone")}`}
                                onClick={() => {
                                    navigator.clipboard.writeText(t_contact("teaz.ctaLink.phone"));
                                    openModal({
                                        id: 'contact_copy_modal',
                                        props: {
                                            title: t_toast("success.copied"),
                                            sizeMode: 300,
                                            topLeftCloseButton: false
                                        },
                                    });
                                    setTimeout(() => {
                                        closeModalById('contact_copy_modal')
                                    }, 2000)
                                }}
                            />
                            <Button styleMode='Outlined' colorMode='Tertiary'
                                children={`LinkedIn`}
                                onClick={() => window.open(`https://${t_contact("teaz.ctaLink.linkedin")}`, '_blank')}
                            />
                            <Button styleMode='Outlined' colorMode='Tertiary'
                                children={`GitHub`}
                                onClick={() => window.open(`https://${t_contact("teaz.ctaLink.github")}`, '_blank')}
                            />

                        </DivFlexRow>
                    </DivFlexColumn>
                </DivFlexColumn>

            </DivFlexColumn>
        </>
    )
}
