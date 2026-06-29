"use client"

import React, { useMemo, useCallback } from 'react'
import './styles/chip.css'
import { IconGen } from '../../../../public/assets/icon/OtherIcon';
import { TextBodyMedium } from '@/packages/shared/ui/ARC_typography';

export interface ChipProps {
    onClick?: () => void;
    children?: React.ReactNode;
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    showTitleWhileHover?: boolean;
    toggle?: boolean;
    isSelected?: boolean;
    isShowBadgeOnSelect?: boolean;
    styleMode?: 'Filled' | 'FillFixed' | 'Outlined' | 'Text' | 'Elevated';
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary' | 'Default';
    leadingIcon?: React.ReactNode | string;
    trailingIcon?: React.ReactNode | string;
    borderRadius?: 'none' | 'default' | 'rounded' | number;
    textClassName?: string;
    textStyle?: React.CSSProperties;
}

const Chip: React.FC<ChipProps> = ({
    onClick,
    children,
    ariaLabel,
    className = '',
    style = {},
    disabled = false,
    colorMode = 'Primary',
    styleMode = 'Filled',
    leadingIcon,
    trailingIcon,
    borderRadius = 'rounded',
    showTitleWhileHover = false,
    toggle = false,
    isSelected = false,
    isShowBadgeOnSelect = false,
    textClassName = '',
    textStyle = {},
}) => {

    const [selectedState, setSelectedState] = React.useState(isSelected)

    const buttonClass = useMemo(() => {
        return [
            'ARC-chip-layoutButtonWrapper',
            typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            `typography-system-medium`,
            disabled ? 'ARC-chip-disabled' : '',
            `colorMode${colorMode}`,
            `styleMode${styleMode}`,
            selectedState ? 'ARC-chip-selected' : '',
            className
        ].filter(Boolean).join(' ').trim()
    }, [styleMode, colorMode, borderRadius, className, disabled, selectedState]);

    const handleClick = useCallback(() => {
        onClick && onClick()
        if (toggle) setSelectedState(prev => !prev)
    }, [onClick, toggle])

    const resolvedAriaLabel = ariaLabel ?? (typeof children === 'string' ? children : undefined);
    const titleAttr = showTitleWhileHover ? resolvedAriaLabel : undefined;

    return (
        <button
            aria-label={resolvedAriaLabel}
            onClick={handleClick}
            className={buttonClass}
            disabled={disabled}
            style={{
                borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : undefined,
                ...style,
            }}
            title={titleAttr}
        >
            <div className={[
                'ARC-chip-stateLayer',
                typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            ].filter(Boolean).join(' ')}></div>

            {selectedState && isShowBadgeOnSelect ?
                <div className={'ARC-chip-badge'} />
                : null
            }

            {leadingIcon ? (
                typeof leadingIcon === 'string'
                    ? <IconGen className={`ARC-leadingIcon ARC-chip-layoutIcon`} svgName={leadingIcon} aria-hidden="true" />
                    : <span className={`ARC-leadingIcon ARC-chip-layoutIcon`} aria-hidden="true">{leadingIcon}</span>
            ) : null}

            {children ? (
                typeof children === 'string'
                    ? <TextBodyMedium children={children} color='currentColor' className={['ARC-chip-layoutLabel', textClassName].filter(Boolean).join(' ').trim()} style={textStyle} />
                    : children
            ) : null}

            {trailingIcon ? (
                typeof trailingIcon === 'string'
                    ? <IconGen className={'ARC-chip-layoutIcon'} svgName={trailingIcon} aria-hidden="true" />
                    : <span className={'ARC-chip-layoutIcon'} aria-hidden="true">{trailingIcon}</span>
            ) : null}
        </button >
    );
};

export default React.memo(Chip);
