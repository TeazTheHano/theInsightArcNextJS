"use client"

import ButtonDefault from '../Button/Button'
import { useTheme, type Theme } from '../../hooks/useTheme'
import { TextBodySmall, TextHeadlineLarge, TextHeadlineSmall, TextTitleLarge } from '../TextBox/textBox'
import { DivFlexColumn, DivFlexRowSpaceBetweenBaseline } from '../LayoutDiv/LayoutDiv'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'
import SegmentedButton from '../Button/SegmentedButton'
import Divider from '../Divider/Divider'
import Button from '../Button/Button'

export default function Footer() {

    const { theme, setTheme } = useTheme()
    const { t } = useTranslation('common');

    // const changeLanguage = (lng: string) => {
    //     i18n.changeLanguage(lng);
    // };

    return (
        <footer
            style={{
                display: 'flex',
                padding: 'var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-M, 24px) var(--Spacing-Spacing-XL, 48px) var(--Spacing-Spacing-M, 24px)',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 'var(--Spacing-Spacing-M, 24px)',
                alignSelf: 'stretch',
            }}>
            <DivFlexColumn
                style={{ gap: 'var(--Spacing-Spacing-XXS, 8px)', }}
            >
                <TextHeadlineLarge children='The insightArc - Khuong Anh Kiet' color='var(--Schemes-On-Surface-Variant, #434843)' />
                <TextBodySmall>
                    {t('footer-item-1')}<br />{t('footer-item-2')}
                </TextBodySmall>
            </DivFlexColumn>

            <DivFlexColumn>
                <ButtonDefault
                    children='@the_insightarc'
                    label='Contact us on instagram: @the_insightarc'
                    styleMode='Text'
                    colorMode='Primary'
                    leadingIcon={'instagram'}
                    onClick={() => {
                        window.open('https://www.instagram.com/the_insightarc/', '_blank')
                    }}
                />
                <ButtonDefault
                    children='teaz.khuonganhkiet@gmail.com'
                    label='Contact us via email: teaz.khuonganhkiet@gmail.com'
                    styleMode='Text'
                    colorMode='Primary'
                    leadingIcon={'mail'}
                    onClick={() => {
                        window.open('mailto:teaz.khuonganhkiet@gmail.com', '_blank')
                    }}
                />
            </DivFlexColumn>

            {/* change themes */}

            <Divider />

            <DivFlexRowSpaceBetweenBaseline style={{ width: '100%' }}>
                <TextTitleLarge children={t('language')} />
                <SegmentedButton
                    dataList={[
                        { label: 'English', value: 'en' },
                        { label: 'Tiếng Việt', value: 'vi' },
                    ]}
                    onChange={(value: string) => {
                        // changeLanguage(value)
                    }}
                    // preSelected={i18n.language}
                    iconOnSelected='check'
                />
            </DivFlexRowSpaceBetweenBaseline>

            <DivFlexRowSpaceBetweenBaseline style={{ width: '100%' }}>
                <TextTitleLarge children={t('theme')} />
                <select
                    name="themeSet"
                    value={theme}
                    onChange={(e) => {
                        setTheme(e.target.value as Theme)
                    }}
                    style={{
                        padding: 'var(--Spacing-Spacing-XS)',
                        backgroundColor: 'var(--Schemes-Surface-Variant)',
                        color: 'var(--Schemes-On-Surface)',
                    }}
                    className='CM-border-radius-mode-default'
                >
                    <option value={'light'}>Light</option>
                    <option value={'dark'}>Dark</option>
                    <option value={'light-medium-contrast'}>Light Medium Contrast</option>
                    <option value={'light-high-contrast'}>Light High Contrast</option>
                    <option value={'system'}>System</option>
                </select>
            </DivFlexRowSpaceBetweenBaseline>

            <Divider />
            <TextHeadlineSmall children='DEV Mode' />
            <Button
                label="clear cache"
                children="Clear Cache"
                styleMode='Outlined'
                colorMode='Error'
                onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }}
            />


        </footer >
    )
}
