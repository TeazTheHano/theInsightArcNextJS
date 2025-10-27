"use client"

import { DivFlexColumn, DivFlexRow, DivFlexRowSpaceBetweenCenter } from '../LayoutDiv/LayoutDiv'
import { TextBodyMedium, TextTitleLarge, TextTitleMedium, TextTitleSmall } from '../TextBox/textBox'
import TheInsightArcLogo from '../../public/assets/icon/Logo'
import Divider from '../Divider/Divider'
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import styles from './NavigationUnit.module.css'
import ButtonDefault from '../Button/Button'
import TextField from '../TextInput/TextField'
import { type searchEngineOutputProps } from '../../utils/searchEngine'
import { BlogItem2RowGen } from '../Blog/BlogListVariant'
import type { BlogItemProps } from '../../data/type'
import { useSearch } from '../../hooks/useSearch'
import LoadingIndicators from '../Loading Indicators/LoadingIndicators'

const navItemsData = [
    { href: '/landing', key: 'about-us', supText: '01' },
    { href: '/inspiration', key: 'inspiration', supText: '02' },
    { href: '/blog', key: 'blog-page', supText: '03' },
    { href: '/game', key: 'game-page', supText: '04' },
];

const BasicSearchResult: React.FC<{
    data: { dataBaseName: string; result: searchEngineOutputProps }[] | undefined;
}> = ({ data }) => {
    if (!data || data.length === 0) {
        return <TextBodyMedium children='No database' />
    }

    const renderItemGroup = (items: BlogItemProps[], label: string) => {
        if (!items || items.length === 0) {
            return null;
        }
        const { t: t_common } = useTranslation('common');
        return (
            <React.Fragment key={label}>
                <TextTitleMedium>{t_common(label)}</TextTitleMedium>
                <BlogItem2RowGen
                    dataList={items}
                    thumbSize={100}
                    direction="row"
                    hideDescription
                    hideTag
                    smallTitle
                    openAsNewTab
                />
            </React.Fragment>
        );
    };

    return (
        <DivFlexColumn style={{
            overflowY: 'scroll',
            flex: 1,
            gap: 'var(--Spacing-Spacing-XXS)',
            padding: 'var(--Spacing-Spacing-XXS) 0',
            scrollbarWidth: 'none',
            height: 'inherit'
        }}>
            {
                data.map((item) => (
                    <React.Fragment key={item.dataBaseName}>
                        {
                            item.result.author.length
                                || item.result.category.length
                                || item.result.title.length
                                || item.result.tag.length ?
                                <TextTitleLarge>{item.dataBaseName}</TextTitleLarge>
                                : null

                        }
                        {renderItemGroup(item.result.title, 'title')}
                        {renderItemGroup(item.result.category, 'category')}
                        {renderItemGroup(item.result.tag, 'tags')}
                        {renderItemGroup(item.result.author, 'author')}
                    </React.Fragment>
                ))
            }
        </DivFlexColumn >
    );
};



const NavigationUnit: React.FC = () => {
    const { t: t_common } = useTranslation('common');
    const pathname = usePathname();


    const [logoSubButtonIcon, setLogoSubButtonIcon] = useState('dehaze');

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { searchInput, searchResult, isSearchFocus, performSearch, isLoading } = useSearch()
    const searchContainerRef = useRef<HTMLDivElement>(null)

    const handleNavItemClick = useCallback(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            setLogoSubButtonIcon('dehaze');
        }
    }, [isMenuOpen]);

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
    //                 setSearchFocus(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Dọn dẹp khi unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const navItems = useMemo(() => navItemsData.map(({ href, key, supText }, index) => (
        <Link key={index} href={href}
            aria-label={t_common(key)}
            className={[styles.navMenuItem, pathname.startsWith(href) ? styles.active : null].join(' ')}
            onClick={handleNavItemClick}
            suppressHydrationWarning={true}
        >
            <p className={styles.navMenuItemText} suppressHydrationWarning={true}>
                {t_common(key)}
                {supText && <sup><b className={styles.navMenuItemTextSup}>{supText}</b></sup>}
            </p>
        </Link>
    )), [pathname, handleNavItemClick, t_common]);

    return (
        <>
            <nav className={styles.nav}>
                {/* LOGO row */}
                <DivFlexRowSpaceBetweenCenter className={styles.navLogoContainer}>
                    {/* Logo icon */}
                    <Link href="/" aria-label='Logo'>
                        <DivFlexRow
                            id='NavLogo'
                            className={styles.navLogo}
                        >
                            <TheInsightArcLogo fillColor='var(--Schemes-On-Surface)' />
                        </DivFlexRow>
                    </Link>

                    {/* Logo sub button */}
                    <DivFlexRow>
                        {/* SLOT FOR SEARCH */}
                        <ButtonDefault
                            label={t_common('search')}
                            variantMode='Icon'
                            styleMode='Text'
                            leadingIcon='search'
                            colorMode='Default'
                            onClick={() => {
                                const newState = !isMenuOpen;
                                setIsMenuOpen(newState);
                                setLogoSubButtonIcon(newState ? 'cancel_filled' : 'dehaze');
                            }}
                        />
                        {/* Hamburger menu */}
                        <ButtonDefault
                            label={t_common('nav-menu')}
                            onClick={() => {
                                const newState = !isMenuOpen;
                                setIsMenuOpen(newState);
                                setLogoSubButtonIcon(newState ? 'cancel_filled' : 'dehaze');
                            }}
                            styleMode='Text'
                            variantMode='Icon'
                            leadingIcon={logoSubButtonIcon}
                            className={styles.hideMd}
                        />
                    </DivFlexRow>


                </DivFlexRowSpaceBetweenCenter >
                <Divider />

                {/* Nav Menu */}
                <DivFlexColumn
                    id='NavMenuContainer'
                    className={[
                        styles.navMenuContainer, isMenuOpen ? '' : styles.hideSm,
                    ].join(' ')}>
                    {navItems}
                    {
                        isMenuOpen ?
                            <>
                                <Divider style={{
                                    margin: 'var(--Spacing-Spacing-XS) 0'
                                }} />
                                <TextField
                                    leadingIcon='search'
                                    placeholder={t_common("search")}
                                    widthMode='fill'
                                    onChange={(e) => performSearch(e.target.value)}
                                    compactMode

                                />
                                {
                                    isLoading ?
                                        <LoadingIndicators isLoading={isLoading} />
                                        : searchInput && isSearchFocus ?
                                            <BasicSearchResult data={searchResult} />
                                            : null
                                }
                            </> : null
                    }
                </DivFlexColumn>

                {/* Other in nav */}
                <Divider className={styles.hideMdSm} />
                <DivFlexColumn
                    ref={searchContainerRef}
                    className={[styles.navMenuContainer, styles.hideMdSm].join(' ')}
                    style={{
                        flex: 1,
                        color: 'var(--Schemes-On-Surface-Variant)',
                        overflowY: 'scroll',
                        scrollbarWidth: 'none'
                    }}>
                    {/* SLOT FOR SEARCH BAR */}
                    <TextField
                        leadingIcon='search'
                        placeholder={t_common("search")}
                        widthMode='fill'
                        onChange={(e) => performSearch(e.target.value)}
                        compactMode
                    />
                    {
                        isLoading ?
                            <LoadingIndicators isLoading={isLoading} />
                            : searchInput && isSearchFocus ?
                                <BasicSearchResult data={searchResult} />
                                : null
                    }


                    {/* SLOT FOR TABLE OF CONTENT */}
                </DivFlexColumn>

                {/* Nav bottom */}
                <Divider className={styles.hideMdSm} />
                <DivFlexColumn
                    className={[styles.navMenuContainer, styles.hideMdSm].join(' ')}>
                    <Link href="/test" aria-label={t_common('test-site')} className={styles.navMenuItem}>
                        <TextTitleSmall className={styles.navMenuItemText} color='var(--Schemes-On-Surface-Variant)' children={t_common('test-site')} />
                    </Link>
                    <Link href="/contact" aria-label={t_common('contact-page')} className={styles.navMenuItem}>
                        <TextTitleSmall className={styles.navMenuItemText} color='var(--Schemes-On-Surface-Variant)' children={t_common('contact-page')} />
                    </Link>
                </DivFlexColumn>
            </nav >
            <Divider direction='vertical' className={styles.hideMdSm} />
        </>
    )
}

export default React.memo(NavigationUnit)
