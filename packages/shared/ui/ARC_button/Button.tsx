"use client"

import React, { useMemo, forwardRef } from 'react'
import './styles/button.css'
import { IconGen } from '../../../../public/assets/icon/OtherIcon';

/**
 * Props for the Button component.
 */
export interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    autoFocus?: boolean;
    showTitleWhileHover?: boolean;
    type?: 'button' | 'submit' | 'reset';
    styleMode?: 'Filled' | 'FillFixed' | 'Outlined' | 'Text' | 'Elevated';
    variantMode?: 'Default' | 'Icon' | 'IconRatio1W' | 'IconRatio1H' | 'Extreme';
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary' | 'Default' | 'Error' | 'Destructive';
    scale?: `0_75` | `1` | `1_5` | `2`;
    leadingIcon?: React.ReactNode | string;
    trailingIcon?: React.ReactNode | string;
    borderRadius?: 'none' | 'default' | 'rounded' | number;
    mouseDownFnc?: () => void;
    mouseUpFnc?: () => void;
    mouseEnterFnc?: () => void;
    mouseLeaveFnc?: () => void;
    otherTitle?: string;
    textClassName?: string;
    textStyle?: React.CSSProperties;
}

/**
 * A customizable button component with various styling modes, icons, and interaction handlers.
 * Supports Material Design-inspired themes and scales.
 */
const ButtonDefault = forwardRef<HTMLButtonElement, ButtonProps>(({
    onClick,
    children,
    ariaLabel,
    className = '',
    style = {},
    disabled,
    colorMode = 'Primary',
    type = 'button',
    variantMode = 'Default',
    styleMode = 'Filled',
    scale = '1',
    leadingIcon,
    trailingIcon,
    borderRadius = 'rounded',
    autoFocus,
    showTitleWhileHover,
    otherTitle,
    mouseDownFnc,
    mouseUpFnc,
    mouseEnterFnc,
    mouseLeaveFnc,
    textClassName = '',
    textStyle = {},
}, ref) => {

    // Memoize the button class to avoid recomputation on every render
    const buttonClass = useMemo(() => {
        return [
            'ARC-layoutButtonWrapper',
            `ARC-variantMode${variantMode}`,
            `ARC-scaleFactor${scale}`,
            typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            `typography-system-medium`,
            disabled ? 'ARC-disabled' : '',
            `colorMode${colorMode}`,
            `styleMode${styleMode}`,
            className
        ].filter(Boolean).join(' ').trim();
    }, [styleMode, variantMode, colorMode, scale, borderRadius, className, disabled]);

    // Accessible name logic:
    const resolvedAriaLabel = ariaLabel ?? (typeof children === 'string' ? children : undefined);

    // Decide visible text: children is the single source of truth for text.
    const visibleText = children;

    return (
        <button
            suppressHydrationWarning
            ref={ref}
            aria-label={resolvedAriaLabel}
            onClick={onClick}
            onMouseDown={mouseDownFnc}
            onMouseUp={mouseUpFnc}
            onMouseEnter={mouseEnterFnc}
            onMouseLeave={mouseLeaveFnc}
            className={buttonClass}
            disabled={disabled}
            type={type}
            style={{
                borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : undefined,
                ...style,
            }}
            autoFocus={autoFocus}
            title={showTitleWhileHover ? otherTitle || resolvedAriaLabel : undefined}
        >
            <div className={[
                'ARC-stateLayer',
                typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            ].filter(Boolean).join(' ')}></div>

            {/* Leading icon */}
            {leadingIcon ? (
                typeof leadingIcon === 'string'
                    ? <IconGen className={`ARC-leadingIcon ARC-layoutIcon`} svgName={leadingIcon} aria-hidden="true" />
                    : <span className={`ARC-leadingIcon ARC-layoutIcon`} aria-hidden="true">{leadingIcon}</span>
            ) : null}

            {/* Visible label / children */}
            {visibleText ? (
                <span className={[`ARC-layoutLabel typography-system-medium`, textClassName].filter(Boolean).join(' ').trim()} style={textStyle}>
                    {visibleText}
                </span>
            ) : null}

            {/* Trailing icon */}
            {trailingIcon ? (
                typeof trailingIcon === 'string'
                    ? <IconGen className={`ARC-layoutIcon`} svgName={trailingIcon} aria-hidden="true" />
                    : <span className={`ARC-layoutIcon`} aria-hidden="true">{trailingIcon}</span>
            ) : null}
        </button >
    );
})

import dynamic from 'next/dynamic'
const ButtonNoSSR = dynamic(() => Promise.resolve(ButtonDefault), {
    ssr: false,
});

export const Button = React.memo(ButtonNoSSR);
export default Button;
