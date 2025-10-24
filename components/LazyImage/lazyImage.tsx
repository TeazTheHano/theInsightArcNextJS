"use client"

import React, { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react';
import styles from './LazyImage.module.css';
import { useTranslation } from 'react-i18next'

// A tiny, transparent 1x1 pixel GIF
const BLANK_IMAGE_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Define the props for the LazyImage component
interface LazyImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt?: string;
    srcSet?: string; // For responsive images, e.g. "image-300.jpg 300w, image-600.jpg 600w"
    sizes?: string; // For responsive images, e.g. "(max-width: 600px) 480px, 800px"
    width?: number | string; // Can be a number (px) or a string (e.g., "100%", "300px", "50vw")
    height?: number | string; // Can be a number (px) or a string (e.g., "auto", "200px", "30vh")
    aspectRatio?: string; // e.g., "16/9", "4/3", "1/1" for the CSS `aspect-ratio` property
    maxWidth?: string; // e.g., "100%", "300px", "50vw"
    maxHeight?: string; // e.g., "auto", "200px", "30vh"
    className?: string;
    onErrorIcon?: React.ReactNode;
    errorMessage?: string;
    rootMargin?: string;
    disableLazyLoad?: boolean; // If true, disables lazy loading and loads image immediately
    borderRadius?: 'none' | 'default' | 'rounded' | number; // e.g., 'none', 'default', 'rounded', or a number in px
    imgRestProps?: React.ImgHTMLAttributes<HTMLImageElement>; // Other img attributes
}

const LazyImageComponent: React.FC<LazyImageProps> = ({
    src,
    alt,
    srcSet,
    sizes,
    width, // Mặc định là 100% chiều rộng
    height,
    aspectRatio,
    maxWidth,
    maxHeight,
    className = '',
    onErrorIcon = '⚠️',
    errorMessage,
    rootMargin = '0px 0px 100px 0px',
    borderRadius = 'none',
    disableLazyLoad,
    imgRestProps, // Other img attributes
    ...restProps
}) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string>(BLANK_IMAGE_SRC);

    const { t } = useTranslation("toast");

    errorMessage = errorMessage || `${t('error.notFound')} / ${t('info.noData')}`; // "Error loading image"

    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
        setError(false);
    }, []);

    const handleImageError = useCallback(() => {
        setIsLoading(false);
        setError(true);
    }, []);

    useEffect(() => {
        let observer: IntersectionObserver | null = null;

        if (imgRef.current) {
            if ('IntersectionObserver' in window) {
                observer = new IntersectionObserver((entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setImageSrc(src);
                            obs.unobserve(entry.target);
                        }
                    });
                }, { rootMargin });

                observer.observe(imgRef.current);
            } else {
                setImageSrc(src);
            }
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [src, rootMargin]);

    // --- Logic for handling size and aspect ratio using modern CSS ---
    const wrapperStyles = useMemo((): React.CSSProperties => {
        return {
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            aspectRatio: aspectRatio,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
        };
    }, [width, height, aspectRatio, maxWidth, maxHeight]);

    return (
        <div
            className={`${styles.lazyImageWrapper} ${className} ${`CM-border-radius-mode-${borderRadius || 'none'}`}`}
            style={wrapperStyles} // Áp dụng styles đã tính toán
            {...restProps}
        >
            {error ? (
                <div className={styles.errorPlaceholder}>
                    {onErrorIcon}
                    <p>{errorMessage}</p>
                </div>
            ) : (
                <>
                    {isLoading && (
                        <div className={styles.placeholder}>
                            <div className={styles.shimmer}></div>
                        </div>
                    )}
                    <img
                        ref={imgRef}
                        src={imageSrc}
                        srcSet={srcSet}
                        sizes={sizes}
                        alt={alt}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`${styles.image} ${isLoading ? styles.hidden : ''}`}
                        loading={disableLazyLoad ? 'eager' : 'lazy'}
                        width={'100%'}
                        height={'100%'}
                        {...imgRestProps} // Truyền các thuộc tính img còn lại
                    />
                </>
            )}
        </div>
    );
};

LazyImageComponent.displayName = 'LazyImage';

/**
 * @param param0 Lazy load images with placeholder, error handling, and responsive support.
 * @returns A React component that lazy loads images with a placeholder and error handling.
 * @param src The image source URL.
 * @param alt The alt text for the image.
 * @param srcSet Optional srcSet for responsive images.
 * @param sizes Optional sizes attribute for responsive images.
 * @param width The width of the image (number in px or string like '100%').
 * @param height The height of the image (number in px or string like 'auto').
 * @param aspectRatio The aspect ratio of the image (e.g., '16/9', '4/3', '1/1').
 * @param maxWidth The maximum width of the image (string like '100%', '300px').
 * @param maxHeight The maximum height of the image (string like 'auto', '200px').
 * @param className Additional CSS classes for the wrapper div.
 * @param onErrorIcon Icon or element to display on error.
 * @param errorMessage Message to display on error.
 * @param rootMargin Margin around the root for IntersectionObserver.
 * @param disableLazyLoad If true, disables lazy loading and loads image immediately.
 * @param borderRadius Border radius style: 'none', 'default', 'rounded', or a number in px.
 * @param restProps Other HTML div attributes.
 */
export default memo(LazyImageComponent);