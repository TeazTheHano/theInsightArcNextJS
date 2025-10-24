import React, { useMemo } from "react";
import fabStyle from "../Button/FAB.module.css"
import { IconGen } from "../../public/assets/icon/OtherIcon";
import { TextHeadlineSmall } from "../TextBox/textBox";

interface FABProps {
    icon: string | React.ReactNode;
    label?: string;
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
    label = '',
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
            fabStyle.layoutButtonWrapper,
            fabStyle[`variantMode${variantMode}`],
            disabled ? fabStyle.disabled : '',
            `CM-border-radius-mode-${borderRadius}`,
            `colorMode${colorMode}`,
            `styleMode${styleMode}`,
            className,
        ].join(' ').trim()
    }, [variantMode, colorMode, className, disabled]);

    return (
        <button
            aria-label={label}
            onClick={onClick}
            onMouseDown={mouseDownFnc}
            onMouseUp={mouseUpFnc}
            onMouseEnter={mouseEnterFnc}
            onMouseLeave={mouseLeaveFnc}
            className={buttonClass}
            disabled={disabled}
            type={type}
            style={{
                ...style,
            }}
            autoFocus={autoFocus}
        >
            <div className={[
                fabStyle.stateLayer,
                `CM-border-radius-mode-${borderRadius}`
            ].join(' ')}></div>
            {typeof icon === 'string' ? <IconGen className={fabStyle.layoutIcon} svgName={icon} fillMode/> : <span className={fabStyle.layoutIcon}>{icon}</span>}
            {variantMode === 'Full-FAB' && label && (
                <TextHeadlineSmall className={fabStyle.layoutLabel} color="currentColor">{label}</TextHeadlineSmall>
            )}
        </button>
    )
}

export default React.memo(FAB);