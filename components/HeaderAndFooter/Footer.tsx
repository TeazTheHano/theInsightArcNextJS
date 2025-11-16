"use client"

import { useCallback, memo } from 'react';
import ButtonDefault from '../Button/Button';
import { useTheme, type Theme } from '../../hooks/useTheme';
import { TextBodyLarge, TextBodySmall, TextHeadlineLarge, TextTitleLarge, TextTitleMedium } from '../TextBox/textBox';
import { DivFlexColumn, DivFlexRow, DivFlexRowCenter, DivFlexRowSpaceBetween, DivFlexRowSpaceBetweenCenter } from '../LayoutDiv/LayoutDiv';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import SegmentedButton from '../Button/SegmentedButton';
import Divider from '../Divider/Divider';
import Link from 'next/link';

const THEME_OPTIONS = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'light-medium-contrast', label: 'Light Medium Contrast' },
    { value: 'light-high-contrast', label: 'Light High Contrast' },
    { value: 'system', label: 'Device Theme' },
] as const;

const LANGUAGE_OPTIONS = [
    { label: 'English', value: 'en-US' },
    { label: 'Tiếng Việt', value: 'vi-VN' },
];

const Footer = memo(() => {
    const { theme, setTheme } = useTheme();
    const { t: t_common } = useTranslation('common');

    const changeLanguage = useCallback((lng: string) => {
        i18n.changeLanguage(lng);
    }, []);

    const handleInstagramClick = useCallback(() => {
        window.open('https://www.instagram.com/the_insightarc/', '_blank');
    }, []);

    const handleEmailClick = useCallback(() => {
        window.open('mailto:teaz.khuonganhkiet@gmail.com', '_blank');
    }, []);

    const handleThemeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value as Theme);
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

                <DivFlexColumn style={{ textDecoration: 'none' }}>
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

                <DivFlexColumn>
                    <ButtonDefault
                        children='@the_insightarc'
                        label='Contact us on instagram: @the_insightarc'
                        styleMode='Text'
                        colorMode='Primary'
                        leadingIcon='instagram'
                        onClick={handleInstagramClick}
                    />
                    <ButtonDefault
                        children='teaz.khuonganhkiet@gmail.com'
                        label='Contact us via email: teaz.khuonganhkiet@gmail.com'
                        styleMode='Text'
                        colorMode='Primary'
                        leadingIcon='mail'
                        onClick={handleEmailClick}
                    />
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

                <label htmlFor="themeSet" style={{ display: 'none' }}>
                    <TextBodySmall children={t_common('theme')} />
                </label>
                <select
                    id="themeSet"
                    name="themeSet"
                    value={theme}
                    onChange={handleThemeChange}
                    style={{
                        padding: 'var(--Spacing-Spacing-XS)',
                        backgroundColor: 'var(--Schemes-Surface-Variant)',
                        color: 'var(--Schemes-On-Surface)',
                    }}
                    className='CM-border-radius-mode-default'
                >
                    {THEME_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

            </DivFlexColumn >
        </footer >
    );
});

Footer.displayName = 'Footer';

export default Footer;
