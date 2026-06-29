"use client"

import React, { useEffect, useCallback } from "react";
import './styles/modal.css'
import { DivFlexColumn, DivFlexRowCenter, DivFlexRowSpaceBetween, DivFlexRow, DivFlexColumnSpaceBetween } from '@/packages/shared/ui/ARC_layout';
import { TextBodyLarge, TextHeadlineMedium, TextTitleLarge } from '@/packages/shared/ui/ARC_typography';
import { ARC_Button as Button } from '@/packages/shared/ui/ARC_button';
import { useTranslation } from "react-i18next";
import useCheckScreenSize from "../../../../hooks/useCheckScreenSize";

export interface ModalProps {
    open?: boolean;
    title?: string;
    subTitle?: string;
    contentText?: string;
    img?: string;
    bgDark?: boolean;
    children?: React.ReactNode;
    verticalActionBar?: boolean;
    primaryAction?: React.ReactNode;
    secondaryAction?: React.ReactNode;
    defaultCloseButton?: 'none' | 'close' | 'cancel-destruction' | 'cancel-normal';
    topLeftCloseButton?: boolean;
    destructive?: boolean;
    sizeMode?: 'fit' | 'fill' | 300 | 600 | 900;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
    onClose?: () => void;
    isTop?: boolean
}

export const Modal: React.FC<ModalProps> = (props) => {
    const { t: t_common } = useTranslation('common');

    const {
        open,
        title,
        subTitle,
        contentText,
        img,
        bgDark,
        children,
        verticalActionBar,
        primaryAction,
        secondaryAction,
        defaultCloseButton = 'close',
        topLeftCloseButton = true,
        destructive,
        sizeMode = 'fit',
        disableBackdropClick,
        disableEscapeKeyDown,
        onClose,
        isTop,
    } = props;

    const isOpen = open ?? true;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || disableEscapeKeyDown || !onClose || !isTop) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, disableEscapeKeyDown, onClose, isTop]);

    const handleBackdropClick = useCallback(() => {
        if (!disableBackdropClick && onClose) {
            onClose();
        }
    }, [disableBackdropClick, onClose]);

    const handleCloseClick = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const ContainerStyle: React.CSSProperties = {
        width: sizeMode === 'fit' ? 'fit-content' : '100%',
        maxWidth: (typeof sizeMode === 'number') ? `${sizeMode}px` : undefined,
    };

    const setActionBarVertical = verticalActionBar || useCheckScreenSize(['sm'])

    if (!isOpen) return null;

    return (
        <DivFlexRowCenter
            className={['ARC-modal-bg', bgDark ? 'ARC-modal-bgDark' : ''].join(' ').trim()}
            onClick={handleBackdropClick}
            aria-hidden={!isTop}
        >
            <DivFlexColumnSpaceBetween
                className={[
                    'ARC-modal-content',
                    `shadow-5`,
                    destructive ? 'ARC-modal-destructive' : '',
                    `CM-border-radius-mode-default`
                ].join(' ').trim()}
                style={ContainerStyle}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <DivFlexRowSpaceBetween>
                    <DivFlexColumn className={'ARC-modal-textPadding'} style={{ justifyContent: 'center' }}>
                        <TextHeadlineMedium children={title} color="currentColor" />
                        {subTitle ? <TextTitleLarge children={subTitle} /> : null}
                    </DivFlexColumn>
                    {topLeftCloseButton && (
                        <Button
                            ariaLabel={t_common('close')}
                            variantMode="Icon"
                            styleMode="Text"
                            colorMode="Default"
                            leadingIcon="cancel_filled"
                            onClick={handleCloseClick}
                        />
                    )}
                </DivFlexRowSpaceBetween>

                {img && <img src={img} alt="modal" style={{ maxWidth: '100%', marginBottom: 'var(--Spacing-Spacing-XS)' }} />}
                {contentText && <TextBodyLarge children={contentText} className={'ARC-modal-textPadding'} />}
                {children}

                <DivFlexRow className={setActionBarVertical ? 'ARC-modal-full' : undefined} style={{ gap: 'var(--Spacing-Spacing-XS)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    {
                        defaultCloseButton === 'none' ?
                            null :
                            <Button
                                children={defaultCloseButton === 'close' ? t_common('close') : t_common('cancel')}
                                styleMode="Outlined"
                                colorMode={defaultCloseButton === 'cancel-destruction' ? 'Error' : 'Default'}
                                onClick={handleCloseClick}
                                showTitleWhileHover
                            />
                    }
                    {(primaryAction || secondaryAction) && (
                        <DivFlexRow style={{ flex: 1, justifyContent: 'flex-end', gap: 'var(--Spacing-Spacing-XS)', flexWrap: 'wrap' }}>
                            {secondaryAction}
                            {primaryAction}
                        </DivFlexRow>
                    )}
                </DivFlexRow>
            </DivFlexColumnSpaceBetween>
        </DivFlexRowCenter>
    );
}

export default React.memo(Modal);
