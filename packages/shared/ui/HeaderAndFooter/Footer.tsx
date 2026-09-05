"use client"

import { useCallback, memo } from 'react';

import { useTheme, type Theme } from '@/hooks/useTheme';
import { TextBodyLarge, TextBodySmall, TextHeadlineLarge, TextTitleLarge, TextTitleMedium } from '@/packages/shared/ui/ARC_typography';
import { DivFlexColumn, DivFlexRow, DivFlexRowCenter, DivFlexRowSpaceBetween, DivFlexRowSpaceBetweenCenter } from '@/packages/shared/ui/ARC_layout';
import { useTranslation } from 'react-i18next';
import { ARC_Button, ARC_SegmentedButton as SegmentedButton } from '@/packages/shared/ui/ARC_button';
import { ARC_Select as Select } from '@/packages/shared/ui/ARC_select';
import { Divider } from '@/packages/shared/ui/ARC_layout';
import Link from 'next/link';

const THEME_OPTIONS = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'light-medium-contrast', label: 'Light Medium Contrast' },
    { value: 'light-high-contrast', label: 'Light High Contrast' },
    { value: 'system', label: 'Device Theme' },
];

const LANGUAGE_OPTIONS = [
    { label: 'English', value: 'en-US' },
    { label: 'Tiếng Việt', value: 'vi-VN' },
];

const Footer = memo(() => {
    const { theme, setTheme } = useTheme();
    const { t: t_common, i18n } = useTranslation('common');

    const changeLanguage = useCallback((lng: string) => {
        i18n.changeLanguage(lng);
    }, [i18n]);

    const handleInstagramClick = useCallback(() => {
        window.open('https://www.instagram.com/the_insightarc/', '_blank');
    }, []);

    const handleEmailClick = useCallback(() => {
        window.open('mailto:contact@theinsightarc.id.vn', '_blank');
    }, []);

    const handleThemeChange = useCallback((value: string) => {
        setTheme(value as Theme);
    }, [setTheme]);

    return (
        <footer
            style={{
                display: 'flex',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-XL, 48px) var(--Spacing-Spacing-M, 24px)',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 'var(--Spacing-Spacing-M, 24px)',
                alignSelf: 'stretch',
                backgroundColor: 'var(--Schemes-Surface-Variant)',
            }}
        >
            <DivFlexColumn style={{ gap: 'var(--Spacing-Spacing-XXS, 8px)' }}>
                <TextHeadlineLarge
                    children='The insightArc'
                    color='var(--Schemes-On-Surface-Variant, #434843)'
                />
                <TextBodySmall>
                    {t_common('footer-item-1')}<br />{t_common('footer-item-2')}
                </TextBodySmall>
            </DivFlexColumn>

            <DivFlexRow style={{ flexWrap: 'wrap', columnGap: 'var(--Spacing-Spacing-XXL, 32px)', rowGap: 'var(--Spacing-Spacing-M, 24px)' }}>

                <DivFlexColumn>
                    <ARC_Button
                        children='@the_insightarc'
                        ariaLabel='Contact us on instagram: @the_insightarc'
                        styleMode='Text'
                        colorMode='Primary'
                        leadingIcon='instagram'
                        onClick={handleInstagramClick}
                    />
                    <ARC_Button
                        children='contact@theinsightarc.id.vn'
                        ariaLabel='Contact us via email: contact@theinsightarc.id.vn'
                        styleMode='Text'
                        colorMode='Primary'
                        leadingIcon='mail'
                        onClick={handleEmailClick}
                    />
                </DivFlexColumn>

                <DivFlexColumn style={{ textDecoration: 'none', gap: 'var(--Spacing-Spacing-XXS, 8px)'}}>
                    <Link style={{ textDecoration: 'none' }} href="/progressPage" color='var(--Schemes-Tertiary)'>
                        <TextTitleMedium children={t_common('progress-page')} color='var(--Schemes-Tertiary)' />
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="/term" color='var(--Schemes-Tertiary)'>
                        <TextTitleMedium children={t_common('term-page')} color='var(--Schemes-Tertiary)' />
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="/contact" color='var(--Schemes-Tertiary)'>
                        <TextTitleMedium children={t_common('contact-page')} color='var(--Schemes-Tertiary)' />
                    </Link>

                </DivFlexColumn>
            </DivFlexRow>

            {/* Language & Themes */}
            <DivFlexColumn style={{ gap: 'var(--Spacing-Spacing-XXS, 8px)', alignSelf: 'flex-end' }}>
                <SegmentedButton
                    dataList={LANGUAGE_OPTIONS}
                    onChange={changeLanguage}
                    preSelected={i18n.language}
                    iconOnSelected='check'
                    compactMode
                />

                <Select
                    name="themeSet"
                    value={theme}
                    onChange={handleThemeChange}
                    options={THEME_OPTIONS}
                    label={t_common('theme')}
                    variant='Outlined'
                    colorMode='Primary'
                />

            </DivFlexColumn >
        </footer >
    );
});

Footer.displayName = 'Footer';

export default Footer;
