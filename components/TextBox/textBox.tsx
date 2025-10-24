import React from 'react'

// Text Box component used as designed in Figma

interface TextBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: string | React.ReactNode;
    className?: string;
    color?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    maxLines?: number; // Limit number of lines, if exceeded will show "..."
    headline?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const clampStyle = (maxLines?: number): React.CSSProperties => {
    if (maxLines && maxLines > 0) {
        return {
            display: '-webkit-box',
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };
    }
    return {};
};

const textVariants = {
    'display-small': {
        fontFamily: 'var(--Display-Family)',
        fontSize: 'var(--Display-Font-Size)',
        fontWeight: 'var(--Display-Weight)',
        lineHeight: 'var(--Display-Line-height)',
        letterSpacing: 'var(--Display-Letter-spacing)',
    },
    'display-medium': {
        fontFamily: 'var(--Display-Family)',
        fontSize: 'var(--Display-Font-Size)',
        fontWeight: 'var(--Display-Weight)',
        lineHeight: 'var(--Display-Line-height)',
        letterSpacing: 'var(--Display-Letter-spacing)',
    },
    'display-large': {
        fontFamily: 'var(--Display-Family)',
        fontSize: 'var(--Display-Font-Size)',
        fontWeight: 'var(--Display-Weight)',
        lineHeight: 'var(--Display-Line-height)',
        letterSpacing: 'var(--Display-Letter-spacing)',
    },
    'headline-small': {
        fontFamily: 'var(--Headline-Family)',
        fontSize: 'var(--Headline-Font-Size)',
        fontWeight: 'var(--Headline-Weight)',
        lineHeight: 'var(--Headline-Line-height)',
        letterSpacing: 'var(--Headline-Letter-spacing)',
    },
    'headline-medium': {
        fontFamily: 'var(--Headline-Family)',
        fontSize: 'var(--Headline-Font-Size)',
        fontWeight: 'var(--Headline-Weight)',
        lineHeight: 'var(--Headline-Line-height)',
        letterSpacing: 'var(--Headline-Letter-spacing)',
    },
    'headline-large': {
        fontFamily: 'var(--Headline-Family)',
        fontSize: 'var(--Headline-Font-Size)',
        fontWeight: 'var(--Headline-Weight)',
        lineHeight: 'var(--Headline-Line-height)',
        letterSpacing: 'var(--Headline-Letter-spacing)',
    },
    'label-small': {
        fontFamily: 'var(--Label-Family)',
        fontSize: 'var(--Label-Font-Size)',
        fontWeight: 'var(--Label-Weight)',
        lineHeight: 'var(--Label-Line-height)',
        letterSpacing: 'var(--Label-Letter-spacing)',
    },
    'label-medium': {
        fontFamily: 'var(--Label-Family)',
        fontSize: 'var(--Label-Font-Size)',
        fontWeight: 'var(--Label-Weight)',
        lineHeight: 'var(--Label-Line-height)',
        letterSpacing: 'var(--Label-Letter-spacing)',
    },
    'label-large': {
        fontFamily: 'var(--Label-Family)',
        fontSize: 'var(--Label-Font-Size)',
        fontWeight: 'var(--Label-Weight)',
        lineHeight: 'var(--Label-Line-height)',
        letterSpacing: 'var(--Label-Letter-spacing)',
    },
    'body-small': {
        fontFamily: 'var(--Body-Family)',
        fontSize: 'var(--Body-Font-Size)',
        fontWeight: 'var(--Body-Weight)',
        lineHeight: 'var(--Body-Line-height)',
        letterSpacing: 'var(--Body-Letter-spacing)',
    },
    'body-medium': {
        fontFamily: 'var(--Body-Family)',
        fontSize: 'var(--Body-Font-Size)',
        fontWeight: 'var(--Body-Weight)',
        lineHeight: 'var(--Body-Line-height)',
        letterSpacing: 'var(--Body-Letter-spacing)',
    },
    'body-large': {
        fontFamily: 'var(--Body-Family)',
        fontSize: 'var(--Body-Font-Size)',
        fontWeight: 'var(--Body-Weight)',
        lineHeight: 'var(--Body-Line-height)',
        letterSpacing: 'var(--Body-Letter-spacing)',
    },
    'title-small': {
        fontFamily: 'var(--Title-Family)',
        fontSize: 'var(--Title-Font-Size)',
        fontWeight: 'var(--Title-Weight)',
        lineHeight: 'var(--Title-Line-height)',
        letterSpacing: 'var(--Title-Letter-spacing)',
    },
    'title-medium': {
        fontFamily: 'var(--Title-Family)',
        fontSize: 'var(--Title-Font-Size)',
        fontWeight: 'var(--Title-Weight)',
        lineHeight: 'var(--Title-Line-height)',
        letterSpacing: 'var(--Title-Letter-spacing)',
    },
    'title-large': {
        fontFamily: 'var(--Title-Family)',
        fontSize: 'var(--Title-Font-Size)',
        fontWeight: 'var(--Title-Weight)',
        lineHeight: 'var(--Title-Line-height)',
        letterSpacing: 'var(--Title-Letter-spacing)',
    },
};

/**
 * Generic Text component for typography system.
 *
 * @param variant - The typography variant, e.g. 'display-small', 'headline-medium', etc.
 * @param props - Other props including children, className, color, style, onClick, maxLines.
 */
export const Text: React.FC<TextBoxProps & { variant: keyof typeof textVariants }> = ({
    variant,
    children,
    className,
    color = 'var(--Schemes-On-Surface, #000)',
    style = {},
    onClick,
    maxLines,
    headline,
    ...rest
}) => {
    const variantStyles = textVariants[variant] || {};
    const size = variant.split('-')[1]; // small, medium, large
    const headlineStyle = {
        margin: 0,
        padding: 0,
        font: 'inherit',
        color: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        textAlign: 'inherit' as const,
    }
    return (
        <div className={`typography-system-${size}`}>
            <div
                className={`typography-system-${size} ${className ?? ''}`}
                style={{
                    color,
                    ...variantStyles,
                    ...clampStyle(maxLines),
                    ...style,
                }}
                onClick={onClick}
                {...rest}
            >
                {headline ? React.createElement(headline, {style: headlineStyle}, children) : children}
            </div>
        </div>
    );
};

// Backward compatibility exports
export const TextDisplaySmall: React.FC<TextBoxProps> = (props) => <Text variant="display-small" {...props} />;
export const TextDisplayMedium: React.FC<TextBoxProps> = (props) => <Text variant="display-medium" {...props} />;
export const TextDisplayLarge: React.FC<TextBoxProps> = (props) => <Text variant="display-large" {...props} />;
export const TextHeadlineSmall: React.FC<TextBoxProps> = (props) => <Text variant="headline-small" {...props} />;
export const TextHeadlineMedium: React.FC<TextBoxProps> = (props) => <Text variant="headline-medium" {...props} />;
export const TextHeadlineLarge: React.FC<TextBoxProps> = (props) => <Text variant="headline-large" {...props} />;
export const TextLabelSmall: React.FC<TextBoxProps> = (props) => <Text variant="label-small" {...props} />;
export const TextLabelMedium: React.FC<TextBoxProps> = (props) => <Text variant="label-medium" {...props} />;
export const TextLabelLarge: React.FC<TextBoxProps> = (props) => <Text variant="label-large" {...props} />;
export const TextBodySmall: React.FC<TextBoxProps> = (props) => <Text variant="body-small" {...props} />;
export const TextBodyMedium: React.FC<TextBoxProps> = (props) => <Text variant="body-medium" {...props} />;
export const TextBodyLarge: React.FC<TextBoxProps> = (props) => <Text variant="body-large" {...props} />;
export const TextTitleSmall: React.FC<TextBoxProps> = (props) => <Text variant="title-small" {...props} />;
export const TextTitleMedium: React.FC<TextBoxProps> = (props) => <Text variant="title-medium" {...props} />;
export const TextTitleLarge: React.FC<TextBoxProps> = (props) => <Text variant="title-large" {...props} />;
