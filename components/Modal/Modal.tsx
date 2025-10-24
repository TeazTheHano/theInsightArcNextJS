"use client"

import React, { useEffect, useCallback } from "react";
import styles from './Modal.module.css'
import { DivFlexColumn, DivFlexRowCenter, DivFlexRowSpaceBetween, DivFlexRow, DivFlexColumnSpaceBetween } from "../LayoutDiv/LayoutDiv";
import { TextBodyLarge, TextTitleLarge, TextTitleSmall } from "../TextBox/textBox";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import useCheckScreenSize from "../../hooks/useCheckScreenSize";

/**
 * Giao diện props cho component Modal.
 * Modal là một hộp thoại nổi lên để hiển thị thông tin hoặc yêu cầu tương tác từ người dùng.
 */
export interface ModalProps {
    /** Có hiển thị modal hay không. Nếu undefined, mặc định là true (dành cho ModalProvider). */
    open?: boolean;
    /** Tiêu đề chính của modal. */
    title?: string;
    /** Tiêu đề phụ của modal. */
    subTitle?: string;
    /** Văn bản nội dung chính của modal. */
    contentText?: string;
    /** Đường dẫn hình ảnh để hiển thị trong modal. */
    img?: string;
    /** Có nền tối cho modal không. */
    bgDark?: boolean;
    /** Các phần tử con React để render bên trong modal. */
    children?: React.ReactNode;
    /** Có hiển thị thanh hành động theo chiều dọc không. */
    verticalActionBar?: boolean;
    /** Hành động chính (ví dụ: nút OK). */
    primaryAction?: React.ReactNode;
    /** Hành động phụ (ví dụ: nút Cancel). */
    secondaryAction?: React.ReactNode;
    /** Loại nút đóng mặc định: 'none' (không có), 'close' (đóng), 'cancel-destruction' (hủy hủy hoại), 'cancel-normal' (hủy bình thường). Mặc định là 'close'. */
    defaultCloseButton?: 'none' | 'close' | 'cancel-destruction' | 'cancel-normal';
    /** Có hiển thị nút đóng ở góc trên trái không. Mặc định là true. */
    topLeftCloseButton?: boolean;
    /** Có phải modal hủy hoại (destructive) không, ảnh hưởng đến styling. */
    destructive?: boolean;
    /** Kích thước modal: 'fit' (vừa nội dung), 'fill' (đầy chiều rộng), hoặc số pixel (300, 600, 900). Mặc định là 'fit'. */
    sizeMode?: 'fit' | 'fill' | 300 | 600 | 900;
    /** Có vô hiệu hóa việc đóng modal khi click vào backdrop không. */
    disableBackdropClick?: boolean;
    /** Có vô hiệu hóa việc đóng modal khi nhấn phím Escape không. */
    disableEscapeKeyDown?: boolean;
    /** Hàm callback khi modal được đóng. */
    onClose?: () => void;
    isTop?: boolean
}

function Modal(props: ModalProps) {
    const { t } = useTranslation('common');

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

    // Nếu Modal được render bởi ModalProvider, có thể bỏ qua prop `open`.
    // Xử lý `undefined` như là mở (provider chỉ render modal đang hoạt động).
    const isOpen = open ?? true;

    // Quản lý overflow của body khi modal mở
    // Ngăn chặn cuộn trang khi modal hiển thị
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Dọn dẹp khi unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Xử lý phím Escape để đóng modal
    useEffect(() => {
        if (!isOpen || disableEscapeKeyDown || !onClose || !isTop) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, disableEscapeKeyDown, onClose]);

    // Xử lý click vào backdrop để đóng modal
    const handleBackdropClick = useCallback(() => {
        if (!disableBackdropClick && onClose) {
            onClose();
        }
    }, [disableBackdropClick, onClose]);

    // Xử lý click vào nút đóng
    const handleCloseClick = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    // Tính toán style cho container modal dựa trên sizeMode
    const ContainerStyle: React.CSSProperties = {
        width: sizeMode === 'fit' ? 'fit-content' : '100%',
        maxWidth: (typeof sizeMode === 'number') ? `${sizeMode}px` : undefined,
    };

    // Xác định xem thanh hành động có hiển thị dọc không (dựa trên verticalActionBar hoặc kích thước màn hình nhỏ)
    const setActionBarVertical = verticalActionBar || useCheckScreenSize(['sm'])

    // Nếu modal không mở, không render gì
    if (!isOpen) return null;

    return (
        <DivFlexRowCenter
            className={[styles.modalBG, bgDark ? styles.bgDark : ''].join(' ').trim()}
            onClick={handleBackdropClick}
            aria-hidden={!isTop}
        >
            <DivFlexColumnSpaceBetween
                className={[
                    styles.modalContent,
                    `shadow-5`,
                    destructive ? styles.destructive : '',
                    `CM-border-radius-mode-default`
                ].join(' ').trim()}
                style={ContainerStyle}
                onClick={(e) => e.stopPropagation()} // Ngăn chặn click backdrop khi click bên trong modal
                role="dialog"
                aria-modal="true"
            >
                {/* Phần header của modal */}
                <DivFlexRowSpaceBetween>
                    <DivFlexColumn className={styles.textPadding} style={{ justifyContent: 'center' }}>
                        <TextTitleLarge children={title} color="currentColor" />
                        {subTitle ? <TextTitleSmall children={subTitle} /> : null}
                    </DivFlexColumn>
                    {topLeftCloseButton && (
                        <Button
                            label={t('close')}
                            variantMode="Icon"
                            styleMode="Text"
                            colorMode="Default"
                            leadingIcon="cancel_filled"
                            onClick={handleCloseClick}
                        />
                    )}
                </DivFlexRowSpaceBetween>

                {/* Phần nội dung của modal */}
                {img && <img src={img} alt="modal" style={{ maxWidth: '100%', marginBottom: 'var(--Spacing-Spacing-XS)' }} />}
                {contentText && <TextBodyLarge children={contentText} className={styles.textPadding} />}
                {children}

                {/* Phần hành động của modal */}
                <DivFlexRow className={setActionBarVertical ? styles.full : undefined} style={{ gap: 'var(--Spacing-Spacing-XS)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    {
                        defaultCloseButton === 'none' ?
                            null :
                            <Button
                                label={defaultCloseButton === 'close' ? t('close') : t('cancel')}
                                children={defaultCloseButton === 'close' ? t('close') : t('cancel')}
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
