"use client"

import React, { useState, useMemo, useCallback, type ChangeEvent, forwardRef, useEffect } from 'react'
import { DivFlexColumn, DivFlexRowCenter, DivFlexRowSpaceBetweenBaseline } from '@/packages/shared/ui/ARC_layout';

import './styles/textInput.css';
import { IconGen } from '../../../../public/assets/icon/OtherIcon';
import { TextBodyMedium, TextBodySmall } from '@/packages/shared/ui/ARC_typography';
import { Divider } from '@/packages/shared/ui/ARC_layout';

import { useTranslation } from 'react-i18next';
import { ARC_Modal as Dialog } from '@/packages/shared/ui/ARC_modal';
import { ARC_Button } from '../ARC_button';

const Perfect_Typo_length_Sized_Paragraph_Min_4char = 4;
const Perfect_Typo_length_Sized_Paragraph_Short_20_char = 20;
const Perfect_Typo_length_Sized_Paragraph_Med_40_char = 40;
const Perfect_Typo_length_Sized_Paragraph_Long_60_char = 60;

export interface TextFieldProps {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    preValue?: string;
    disabled?: boolean;
    required?: boolean;
    style?: React.CSSProperties;
    className?: string;
    autoFocus?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    readOnly?: boolean;
    title?: string;
    id?: string;
    name?: string;
    autoComplete?: string;
    spellCheck?: boolean;
    inputMode?: 'text' | 'tel' | 'email' | 'url' | 'numeric' | 'decimal' | 'search';
    list?: string;
    size?: number;
    step?: number;
    multiple?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    widthMode?: 'fill' | 'number' | 'fix-perfect-length';
    widthModeNumber?: number;
    perfectLengthSizedParagraph?: 'Short' | 'Med' | 'Long' | 'Min';
    variant?: 'Outlined' | 'Filled';
    compactMode?: boolean;
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary' | 'Default';
    borderRadius?: 'none' | 'default' | 'rounded' | number;
    autoShowClearButton?: boolean;
    errorMessage?: string;
    supportText?: string;
    trailingSupportText?: string;
    trailingIcon?: React.ReactNode | string;
    trailingIconAction?: () => void;
    leadingIcon?: React.ReactNode | string;
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>(({
    label,
    placeholder,
    type = 'text',
    onChange,
    preValue,
    disabled = false,
    required = false,
    style,
    className,
    autoFocus = false,
    maxLength,
    minLength,
    pattern,
    readOnly = false,
    title,
    id,
    name,
    autoComplete,
    spellCheck = false,
    inputMode,
    list,
    size,
    step,
    multiple = false,
    form,
    formAction,
    formEncType,
    formMethod,
    formNoValidate = false,
    formTarget,
    widthMode = 'number',
    widthModeNumber = 300,
    perfectLengthSizedParagraph = 'Short',
    variant = 'Outlined',
    compactMode = false,
    colorMode = 'Default',
    borderRadius = 'default',
    autoShowClearButton = false,
    errorMessage,
    supportText,
    trailingSupportText,
    trailingIcon,
    trailingIconAction,
    leadingIcon,
}, ref) => {
    const { t: t_common } = useTranslation('common')
    const { t: t_toast } = useTranslation('toast')
    const [currentValue, setCurrentValue] = useState<string>(preValue || '');
    const [focused, setFocused] = useState<boolean>(false);

    useEffect(() => {
        if (preValue !== undefined) {
            setCurrentValue(preValue);
        }
    }, [preValue]);

    const isError = !!errorMessage;
    const currentSupportText = useMemo(() => isError ? errorMessage : supportText, [isError, errorMessage, supportText]);

    const showClearButton = useMemo(() => autoShowClearButton && (currentValue.length > 0 || focused) && !disabled && !readOnly, [autoShowClearButton, currentValue.length, focused, disabled, readOnly]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value);
        onChange(e);
    }, [onChange]);

    const handleClear = useCallback(() => {
        setCurrentValue('');
    }, []);

    const componentClassName = useMemo(() => [
        'ARC-textInput-component',
        `ARC-textInput-${variant}`,
        `ARC-textInput-${colorMode}`,
        disabled ? 'ARC-textInput-disabled' : '',
        isError ? 'ARC-textInput-error' : '',
        focused ? 'ARC-textInput-focused' : '',
        readOnly ? 'ARC-textInput-readOnly' : '',
        compactMode ? 'ARC-textInput-compactMode' : '',
        typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
        `ARC-textInput-widthMode-${widthMode}`,
        `ARC-textInput-widthMode-${perfectLengthSizedParagraph}`,
        className || ''
    ].join(' ').trim(), [variant, colorMode, disabled, isError, focused, readOnly, compactMode, borderRadius, widthMode, perfectLengthSizedParagraph, className]);

    const componentStyle = useMemo(() => ({
        ...style,
        ...(widthMode === 'number' ? { width: `${widthModeNumber}px` } : {}),
        ...(typeof borderRadius === 'number' ? { borderRadius: `${borderRadius}px` } : {})
    }), [style, widthMode, widthModeNumber, borderRadius]);

    const inputSize = useMemo(() =>
        widthMode === 'fix-perfect-length' ?
            (perfectLengthSizedParagraph === 'Short' ? Perfect_Typo_length_Sized_Paragraph_Short_20_char :
                perfectLengthSizedParagraph === 'Med' ? Perfect_Typo_length_Sized_Paragraph_Med_40_char :
                    perfectLengthSizedParagraph === 'Long' ? Perfect_Typo_length_Sized_Paragraph_Long_60_char :
                        Perfect_Typo_length_Sized_Paragraph_Min_4char) :
            size
        , [widthMode, perfectLengthSizedParagraph, size]);

    const labelText = useMemo(() => `${label || ''} ${required ? '*' : ''}`.trim(), [label, required]);

    return (
        <DivFlexColumn
            ref={ref}
            className={componentClassName}
            style={componentStyle}
        >
            <div className={[
                'ARC-textInput-stateLayer',
                typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            ].filter(Boolean).join(' ')}></div>

            {variant === 'Outlined' && !compactMode && label && (
                <div style={{
                    flex: 1,
                    position: 'relative',
                }}>
                    <TextBodyMedium children='a' style={{ opacity: 0 }} />
                    <label
                        htmlFor={id}
                        className={'ARC-textInput-label'}
                        style={{
                            position: 'absolute',
                            paddingLeft: 'var(--Spacing-Spacing-XS)',
                            bottom: 0,
                        }}
                    >
                        <TextBodyMedium children={labelText} color='currentColor' />
                    </label>
                </div>
            )}

            <DivFlexRowCenter
                className={[
                    'ARC-textInput-main',
                    typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
                ].filter(Boolean).join(' ')}
            >
                {leadingIcon ? typeof leadingIcon === 'string' ? <IconGen className={'ARC-textInput-leadingIcon'} svgName={leadingIcon} /> : <span className={[`ARC-leadingIcon`, 'ARC-textInput-icon'].join(' ')}>{leadingIcon}</span> : null}

                <DivFlexColumn className={'ARC-textInput-inputRow'}>
                    {variant === 'Filled'
                        && label
                        && (placeholder || currentValue)
                        && (
                            <label
                                htmlFor={id}
                                className={'ARC-textInput-label'}
                            >
                                <TextBodyMedium children={labelText} color='currentColor' />
                            </label>
                        )}
                    <div>
                        <DivFlexRowSpaceBetweenBaseline >

                            {label
                                && (compactMode || variant == 'Filled')
                                && !(placeholder || currentValue)
                                && (
                                    <label
                                        htmlFor={id}
                                        className={['ARC-textInput-label', 'ARC-textInput-labelCompactMode'].join(' ')}
                                    >
                                        <TextBodyMedium children={labelText} color='currentColor' />
                                    </label>
                                )}

                            <input
                                name={name}
                                type={type}
                                value={currentValue}
                                onChange={handleChange}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setTimeout(() => { setFocused(false) }, 200)}
                                disabled={disabled}
                                required={required}
                                autoFocus={autoFocus}
                                maxLength={maxLength}
                                minLength={minLength}
                                pattern={pattern}
                                placeholder={placeholder}
                                readOnly={readOnly}
                                title={title}
                                autoComplete={autoComplete}
                                spellCheck={spellCheck}
                                inputMode={inputMode}
                                list={list}
                                size={inputSize}
                                step={step}
                                multiple={multiple}
                                form={form}
                                formAction={formAction}
                                formEncType={formEncType}
                                formMethod={formMethod}
                                formNoValidate={formNoValidate}
                                formTarget={formTarget}
                                className={['ARC-textInput-inputField', 'ARC-textInput-filledInput', isError ? 'ARC-textInput-error' : ''].join(' ').trim()}
                            />

                            {trailingSupportText && <TextBodySmall children={trailingSupportText} />}
                        </DivFlexRowSpaceBetweenBaseline>
                    </div>
                </DivFlexColumn>

                <DivFlexRowCenter>
                    {showClearButton && (
                        <ARC_Button
                            ariaLabel={t_common('clear')}
                            variantMode='Icon'
                            leadingIcon='cancel'
                            styleMode='Text'
                            colorMode='Default'
                            onClick={handleClear}
                        />
                    )}
                    {trailingIcon && trailingIconAction && (
                        <ARC_Button
                            ariaLabel='action'
                            variantMode='Icon'
                            styleMode='Text'
                            colorMode='Primary'
                            leadingIcon={trailingIcon}
                            onClick={trailingIconAction}
                        />
                    )}
                    {isError &&
                        <ARC_Button
                            ariaLabel={errorMessage || 'error'}
                            variantMode='Icon'
                            styleMode='Text'
                            colorMode='Error'
                            leadingIcon='error_filled'
                            onClick={() => {
                                if (errorMessage) {
                                    <Dialog open={true} title={t_toast('error.formInvalid')} />
                                }
                            }
                            }
                        />
                    }

                    <div className={'ARC-textInput-iconHeightKeeper'} />
                </DivFlexRowCenter>

            </DivFlexRowCenter>

            {
                currentSupportText
                && variant == 'Filled'
                && !compactMode
                && (
                    <>
                        <div style={{ position: 'relative', }}>
                            <Divider
                                thickness={focused ? 4 : 1}
                                borderRadius={'rounded'}
                                className={'ARC-textInput-divider'}
                            />
                        </div>
                        <div className={'ARC-textInput-supportText'} style={{ padding: 'var(--Spacing-Spacing-XXXS, 4px) var(--Spacing-Spacing-M, 24px) 0 var(--Spacing-Spacing-M, 24px)' }}>
                            <TextBodySmall color={isError ? 'var(--Schemes-Error)' : 'var(--Schemes-On-Surface-Variant)'} children={currentSupportText} />
                        </div>
                    </>
                )
            }

            {
                currentSupportText
                && variant == 'Outlined'
                && !compactMode
                && (
                    <div className={'ARC-textInput-supportText'} style={{ padding: 'var(--Spacing-Spacing-XXXS, 4px) var(--Spacing-Spacing-M, 24px) 0 var(--Spacing-Spacing-XS, 12px)' }}>
                        <TextBodySmall color={isError ? 'var(--Schemes-Error)' : 'var(--Schemes-On-Surface-Variant)'} children={currentSupportText} />
                    </div>
                )
            }
        </DivFlexColumn >
    )
})

export default React.memo(TextField);
