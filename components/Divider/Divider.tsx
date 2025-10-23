import React, { type CSSProperties } from 'react'

interface DividerProps {
    direction?: 'horizontal' | 'vertical',
    color?: string,
    thickness?: number | string,
    length?: number | string,
    className?: string,
    style?: React.CSSProperties,
    borderRadius?: 'none' | 'default' | 'rounded' | number,
    rest?: React.HTMLAttributes<HTMLDivElement>
}

const Divider: React.FC<DividerProps> = ({ direction, color, thickness, length, className, style, borderRadius, ...rest }) => {
    thickness = thickness || 1;
    direction = direction || 'horizontal';


    const styles: CSSProperties = {
        backgroundColor: color || 'var(--Schemes-Outline)',
        height: direction === 'horizontal' ? thickness || 1 : length || 'auto',
        width: direction === 'vertical' ? thickness || 1 : length || '100%',
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        ...style,
    };

    return <div
        className={`Divider-${direction} ${className || ''} ${typeof borderRadius === 'string' ? `CM-border-radius-mode-${borderRadius}` : ''}`}
        style={styles}
        {...rest}
    />;
};

export default Divider;
