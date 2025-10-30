"use client"

import { useCallback, memo } from 'react';
import ButtonDefault from '../Button/Button';
import { useTheme, type Theme } from '../../hooks/useTheme';
import { TextBodySmall, TextHeadlineLarge, TextTitleLarge } from '../TextBox/textBox';
import { DivFlexColumn, DivFlexRowSpaceBetweenCenter } from '../LayoutDiv/LayoutDiv';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import SegmentedButton from '../Button/SegmentedButton';
import Divider from '../Divider/Divider';

const THEME_OPTIONS = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'light-medium-contrast', label: 'Light Medium Contrast' },
    { value: 'light-high-contrast', label: 'Light High Contrast' },
    { value: 'system', label: 'System' },
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
            }}
        >
            <DivFlexColumn style={{ gap: 'var(--Spacing-Spacing-XXS, 8px)' }}>
                <TextHeadlineLarge
                    children='The insightArc - Khuong Anh Kiet'
                    color='var(--Schemes-On-Surface-Variant, #434843)'
                />
                <TextBodySmall>
                    {t_common('footer-item-1')}<br />{t_common('footer-item-2')}
                </TextBodySmall>
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

            <Divider />

            <DivFlexRowSpaceBetweenCenter style={{ width: '100%' }}>
                <TextTitleLarge children={t_common('language-ui')} />
                <SegmentedButton
                    dataList={LANGUAGE_OPTIONS}
                    onChange={changeLanguage}
                    preSelected={i18n.language}
                    iconOnSelected='check'
                />
            </DivFlexRowSpaceBetweenCenter>

            <DivFlexRowSpaceBetweenCenter style={{ width: '100%' }}>
                <label htmlFor="themeSet">
                    <TextTitleLarge children={t_common('theme')} />
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
            </DivFlexRowSpaceBetweenCenter>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;
