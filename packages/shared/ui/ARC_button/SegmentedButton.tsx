"use client"

import React, { useCallback } from 'react'
import './styles/segmentedButton.css'
import { DivFlexRowCenter } from '@/packages/shared/ui/ARC_layout';
import Button from './Button';

export interface SegmentedButtonProps {
    dataList?: { label?: string; value: string; icon?: string | React.ReactNode }[];
    preSelected?: string | null;
    onChange?: (value: string) => void;
    className?: string;
    containerStyle?: React.CSSProperties;
    itemStyles?: React.CSSProperties;
    disabled?: string[] | 'all' | null;
    iconOnSelected?: string | 'check' | React.ReactNode | null;
    borderOnSelected?: boolean;
    borderRadius?: 'none' | 'default' | 'rounded' | number;
    compactMode?: boolean;
    showTitleWhileHover?: boolean;
}

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
                children={item.label || item.value.replace(' ', '').toLowerCase() || index.toString()}
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
            className={[borderRadiusClass, className, 'ARC-segmented-buttonWrapper', 'colorModeTertiary'].filter(Boolean).join(' ')}
            style={{ ...borderRadiusStyle, ...containerStyle }}
            suppressHydrationWarning
        >
            {dataList.map(renderButton)}
        </DivFlexRowCenter>
    );
};

import dynamic from 'next/dynamic'
const SegmentedButtonNoSSR = dynamic(() => Promise.resolve(SegmentedButton), {
    ssr: false,
});

export default React.memo(SegmentedButtonNoSSR);
