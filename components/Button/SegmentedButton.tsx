"use client"

import React, { useCallback } from 'react'
import segmentedButtonStyle from './SegmentedButton.module.css'
import { DivFlexRowCenter } from '../LayoutDiv/LayoutDiv';
import Button from './Button';

/**
 * Props for the SegmentedButton component.
 */
interface SegmentedButtonProps {
    /**
     * Array of button options. Each item includes a label (optional), value (required), and icon (optional).
     * Defaults to a sample list with three options.
     */
    dataList?: { label?: string; value: string; icon?: string | React.ReactNode }[];
    /**
     * Initially selected value. Defaults to null.
     */
    preSelected?: string | null;
    /**
     * Callback function triggered when a button is selected. Receives the selected value.
     */
    onChange?: (value: string) => void;
    /**
     * Additional CSS class names for the container. Defaults to empty string.
     */
    className?: string;
    /**
     * Inline styles for the container. Defaults to undefined.
     */
    containerStyle?: React.CSSProperties;
    /**
     * Inline styles applied to each button item. Defaults to undefined.
     */
    itemStyles?: React.CSSProperties;
    /**
     * Disables specific buttons by value (array of strings), all buttons ('all'), or none (null).
     * Defaults to null.
     */
    disabled?: string[] | 'all' | null;
    /**
     * Icon to display when a button is selected. Can be string, 'check', or ReactNode.
     * Defaults to null.
     */
    iconOnSelected?: string | 'check' | React.ReactNode | null;
    /**
     * Whether to add an inner border on the selected button. Defaults to false.
     */
    borderOnSelected?: boolean;
    /**
     * Border radius: 'none', 'default', 'rounded', or a number in pixels. Defaults to 'rounded'.
     */
    borderRadius?: 'none' | 'default' | 'rounded' | number;
    /**
     * Enables compact mode with reduced padding. Defaults to false.
     */
    compactMode?: boolean;
    showTitleWhileHover?: boolean;
}

/**
 * A segmented button component that displays a row of selectable buttons.
 * Supports icons, selection state, disabling, customizable styling, and compact mode.
 * Uses Material Design-inspired modes for style and color.
 */
const SegmentedButton: React.FC<SegmentedButtonProps> = ({
    dataList = [
        { label: 'Option 1', value: 'option1', icon: 'arrow_outward' },
        { label: 'Option 2', value: 'option2', icon: 'arrow_outward' },
        { label: 'Option 3', value: 'option3', icon: 'arrow_outward' },
    ],
    preSelected,
    onChange,
    className,
    containerStyle,
    itemStyles,
    disabled,
    iconOnSelected,
    borderOnSelected,
    borderRadius = 'rounded',
    compactMode,
    showTitleWhileHover,
}) => {

    const [selectedValue, setSelectedValue] = React.useState(preSelected);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleButtonClick = useCallback((value: string) => {
        if (onChange) {
            onChange(value);
        }
        setSelectedValue(value);
    }, [onChange]);

    const borderRadiusClass = typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '';
    const borderRadiusStyle = typeof borderRadius === 'number' ? { borderRadius: `${borderRadius}px` } : {};

    const renderButton = (item: { label?: string; value: string; icon?: string | React.ReactNode }, index: number) => {
        const isSelected = selectedValue === item.value;
        const isDisabled = disabled === 'all' || disabled?.includes(item.value);

        const buttonStyle = {
            ...(isSelected && borderOnSelected ? {
                boxShadow: `inset 0 0 0 var(--Stroke-Stroke-2) var(--Fill-Fixed-Content)`
            } : {}),
            ...(compactMode ? { padding: 'var(--Spacing-Spacing-XXXS, 4px) var(--Spacing-Spacing-XS, 12px)' } : {}),
            ...itemStyles,
        };

        return (
            <Button
                key={item.value}
                label={item.label || item.value.replace(' ', '').toLowerCase() || index.toString()}
                children={item.label}
                leadingIcon={isSelected ? (iconOnSelected || item.icon) : item.icon}
                onClick={() => handleButtonClick(item.value)}
                colorMode='Tertiary'
                styleMode={isSelected ? "FillFixed" : "Text"}
                style={buttonStyle}
                disabled={isDisabled}
                borderRadius={borderRadius}
                showTitleWhileHover={showTitleWhileHover}
            />
        );
    };

    return (
        <DivFlexRowCenter
            ref={containerRef}
            className={[borderRadiusClass, className, segmentedButtonStyle.buttonWrapper, 'colorModeTertiary'].filter(Boolean).join(' ')}
            style={{ ...borderRadiusStyle, ...containerStyle }}
        >
            {dataList.map(renderButton)}
        </DivFlexRowCenter>
    );
};

export default React.memo(SegmentedButton);
