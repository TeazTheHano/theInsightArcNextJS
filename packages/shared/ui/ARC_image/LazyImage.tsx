"use client"

import React, { useState, useCallback, useMemo, memo } from 'react';
import Image from 'next/image';
import './styles/LazyImage.css';
import { useTranslation } from 'react-i18next'

// Define the props for the LazyImage component
export interface LazyImageProps extends React.HTMLAttributes<HTMLDivElement> {
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
    disableLazyLoad?: boolean; // If true, disables lazy loading and loads image immediately
    borderRadius?: 'none' | 'default' | 'rounded' | number; // e.g., 'none', 'default', 'rounded', or a number in px
    imgRestProps?: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height' | 'fill' | 'sizes' | 'srcSet' | 'onLoad' | 'onError' | 'loading' | 'placeholder'>; // Other Image attributes
}

const LazyImageComponent: React.FC<LazyImageProps> = ({
    src,
    alt,
    srcSet,
    sizes,
    width,
    height,
    aspectRatio,
    maxWidth,
    maxHeight,
    className = '',
    onErrorIcon = '⚠️',
    errorMessage,
    borderRadius = 'none',
    disableLazyLoad,
    imgRestProps, // Other Image attributes
    ...restProps
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const { t: t_toast } = useTranslation("toast");

    errorMessage = errorMessage || `${t_toast('error.notFound')} / ${t_toast('info.noData')}`; // "Error loading image"

    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
        setError(false);
    }, []);

    const handleImageError = useCallback(() => {
        setIsLoading(false);
        setError(true);
    }, []);

    // --- Logic for handling size and aspect ratio using modern CSS ---
    const wrapperStyles = useMemo((): React.CSSProperties => {
        return {
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            aspectRatio: aspectRatio,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            position: 'relative', // Required for Next.js Image fill
        };
    }, [width, height, aspectRatio, maxWidth, maxHeight]);

    return (
        <div
            className={`ARC-lazyImage-wrapper ${className} ${typeof borderRadius === 'string' ? `CM-border-radius-mode-${borderRadius}` : ''}`}
            style={wrapperStyles} // Áp dụng styles đã tính toán
            {...restProps}
        >
            {error ? (
                <div className="ARC-lazyImage-errorPlaceholder">
                    {onErrorIcon}
                    <p>{errorMessage}</p>
                </div>
            ) : (
                <>
                    {isLoading && (
                        <div className="ARC-lazyImage-placeholder">
                            <div className="ARC-lazyImage-shimmer"></div>
                        </div>
                    )}
                    <Image
                        src={src}
                        sizes={sizes || 'undefined'}
                        alt={alt || ''}
                        fill={true} // Fill the parent container
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`ARC-lazyImage-image ${isLoading ? 'ARC-lazyImage-hidden' : ''}`}
                        loading={disableLazyLoad ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Tiny transparent GIF
                        unoptimized={src.startsWith('/')} // Disable optimization for local images
                        {...imgRestProps} // Truyền các thuộc tính Image còn lại
                    />
                </>
            )}
        </div>
    );
};

LazyImageComponent.displayName = 'LazyImage';

export default memo(LazyImageComponent);
