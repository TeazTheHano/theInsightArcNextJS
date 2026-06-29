"use client"

import React, { useMemo } from "react";
import "./styles/fab.css";
import { IconGen } from "../../../../public/assets/icon/OtherIcon";
import { TextHeadlineSmall } from '@/packages/shared/ui/ARC_typography';

export interface FABProps {
    icon: string | React.ReactNode;
    ariaLabel?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    autoFocus?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variantMode?: 'sFAB' | 'mFAB' | 'FAB' | 'Full-FAB';
    styleMode?: 'Filled' | 'FillFixed';
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary' | 'Default';
    borderRadius?: 'none' | 'default';
    mouseDownFnc?: () => void;
    mouseUpFnc?: () => void;
    mouseEnterFnc?: () => void;
    mouseLeaveFnc?: () => void;
}

const FAB: React.FC<FABProps> = ({
    icon = 'edit',
    ariaLabel = '',
    children,
    onClick,
    className = '',
    style,
    disabled = false,
    colorMode = 'Primary',
    styleMode = 'Filled',
    type = 'button',
    variantMode = 'FAB',
    autoFocus = false,
    borderRadius = 'default',
    mouseDownFnc,
    mouseUpFnc,
    mouseEnterFnc,
    mouseLeaveFnc,
}) => {

    const buttonClass = useMemo(() => {
        return [
            'ARC-fab-layoutButtonWrapper',
            `ARC-fab-variantMode${variantMode}`,
            disabled ? 'ARC-fab-disabled' : '',
            `CM-border-radius-mode-${borderRadius}`,
            `colorMode${colorMode}`,
            `styleMode${styleMode}`,
            className,
        ].filter(Boolean).join(' ').trim()
    }, [variantMode, colorMode, className, disabled]);

    return (
        <button
            aria-label={ariaLabel}
            onClick={onClick}
            onMouseDown={mouseDownFnc}
            onMouseUp={mouseUpFnc}
            onMouseEnter={mouseEnterFnc}
            onMouseLeave={mouseLeaveFnc}
            className={buttonClass}
            disabled={disabled}
            type={type}
            style={style}
            autoFocus={autoFocus}
        >
            <div className={[
                'ARC-fab-stateLayer',
                `CM-border-radius-mode-${borderRadius}`
            ].filter(Boolean).join(' ')}></div>
            {typeof icon === 'string' ? <IconGen className={'ARC-fab-layoutIcon'} svgName={icon} fillMode/> : <span className={'ARC-fab-layoutIcon'}>{icon}</span>}
            {variantMode === 'Full-FAB' && children && (
                <TextHeadlineSmall className={'ARC-fab-layoutLabel'} color="currentColor">{children}</TextHeadlineSmall>
            )}
        </button>
    )
}

export default React.memo(FAB);
