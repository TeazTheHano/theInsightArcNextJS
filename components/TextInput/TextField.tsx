import React, { useState, useMemo, useCallback, type ChangeEvent, forwardRef } from 'react'
import { DivFlexColumn, DivFlexRowCenter, DivFlexRowSpaceBetweenBaseline } from '../LayoutDiv/LayoutDiv';

import TextFieldStyle from './TextField.module.css';
import { IconGen } from '../../public/assets/icon/OtherIcon';
import { TextBodyMedium, TextBodySmall } from '../TextBox/textBox';
import Divider from '../Divider/Divider';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import Dialog from '../Modal/Modal';

const Perfect_Typo_length_Sized_Paragraph_Min_4char = 4;
const Perfect_Typo_length_Sized_Paragraph_Short_20_char = 20;
const Perfect_Typo_length_Sized_Paragraph_Med_40_char = 40;
const Perfect_Typo_length_Sized_Paragraph_Long_60_char = 60;

/**
 * Props for the TextField component.
 */
export interface TextFieldProps {
    /** The label text for the input field. */
    label?: string;
    /** Placeholder text shown when the input is empty. */
    placeholder?: string;
    /** Input type, defaults to 'text'. */
    type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';
    /** Callback fired when the input value changes. */
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** Initial value for the input field. */
    preValue?: string;
    /** Whether the input is disabled. */
    disabled?: boolean;
    /** Whether the input is required. */
    required?: boolean;
    /** Custom styles for the component. */
    style?: React.CSSProperties;
    /** Additional CSS class names. */
    className?: string;
    /** Whether the input should autofocus on mount. */
    autoFocus?: boolean;
    /** Maximum length of the input value. */
    maxLength?: number;
    /** Minimum length of the input value. */
    minLength?: number;
    /** Pattern for input validation. */
    pattern?: string;
    /** Whether the input is read-only. */
    readOnly?: boolean;
    /** Title attribute for the input. */
    title?: string;
    /** ID for the input element. */
    id?: string;
    /** Name attribute for the input. */
    name?: string;
    /** Autocomplete attribute. */
    autoComplete?: string;
    /** Whether spell checking is enabled. */
    spellCheck?: boolean;
    /** Input mode for virtual keyboards. */
    inputMode?: 'text' | 'tel' | 'email' | 'url' | 'numeric' | 'decimal' | 'search';
    /** Datalist ID for suggestions. */
    list?: string;
    /** Size attribute for the input. */
    size?: number;
    /** Step attribute for number inputs. */
    step?: number;
    /** Whether multiple values are allowed. */
    multiple?: boolean;
    /** Form ID the input belongs to. */
    form?: string;
    /** Form action URL. */
    formAction?: string;
    /** Form encoding type. */
    formEncType?: string;
    /** Form method. */
    formMethod?: string;
    /** Whether form validation is disabled. */
    formNoValidate?: boolean;
    /** Form target. */
    formTarget?: string;
    /** Width mode: 'fill' for full width, 'number' for fixed width, 'fix-perfect-length' for predefined sizes. */
    widthMode?: 'fill' | 'number' | 'fix-perfect-length';
    /** Fixed width value when widthMode is 'number'. */
    widthModeNumber?: number;
    /** Predefined size for 'fix-perfect-length' mode. */
    perfectLengthSizedParagraph?: 'Short' | 'Med' | 'Long' | 'Min';
    /** Visual variant: 'Outlined' or 'Filled'. */
    variant?: 'Outlined' | 'Filled';
    /** Whether to use compact mode. */
    compactMode?: boolean;
    /** Color theme. */
    colorMode?: 'Primary' | 'Secondary' | 'Tertiary' | 'Default';
    /** Border radius style. */
    borderRadius?: 'none' | 'default' | 'rounded' | number;
    /** Whether to show clear button automatically. */
    autoShowClearButton?: boolean;
    /** Error message to display. */
    errorMessage?: string;
    /** Support text below the input. */
    supportText?: string;
    /** Trailing support text inside the input. */
    trailingSupportText?: string;
    /** Trailing icon or icon name. */
    trailingIcon?: React.ReactNode | string;
    /** Action for trailing icon click. */
    trailingIconAction?: () => void;
    /** Leading icon or icon name. */
    leadingIcon?: React.ReactNode | string;
}

// const generateRandomId = () => `textField-${Math.random().toString(36).substr(2, 9)}`;

/**
 * A customizable text input component with various styling and behavior options.
 *
 * @example
 * ```tsx
 * <TextField
 *   label="Username"
 *   placeholder="Enter your username"
 *   onChange={(e) => console.log(e.target.value)}
 *   variant="Outlined"
 *   autoShowClearButton
 * />
 * ```
 *
 * @param props - The props for the TextField component.
 * @param ref - Ref to the root div element.
 * @returns The TextField component.
 */
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
    const { t } = useTranslation('common')
    const { t: t_toast } = useTranslation('toast')
    const [currentValue, setCurrentValue] = useState<string>(preValue || '');
    const [focused, setFocused] = useState<boolean>(false);

    // Memoize effectiveValue to avoid unnecessary recalculations
    // const autoID = useMemo(() => id || generateRandomId(), [id]);

    const isError = !!errorMessage;
    const currentSupportText = useMemo(() => isError ? errorMessage : supportText, [isError, errorMessage, supportText]);

    // Determine if the clear button should be shown
    const showClearButton = useMemo(() => autoShowClearButton && (currentValue.length > 0 || focused) && !disabled && !readOnly, [autoShowClearButton, currentValue.length, focused, disabled, readOnly]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value);
        onChange(e);
    }, [onChange]);

    const handleClear = useCallback(() => {
        setCurrentValue('');
    }, []);

    // Memoize className to avoid recalculating on every render
    const componentClassName = useMemo(() => [
        TextFieldStyle.component,
        TextFieldStyle[variant],
        TextFieldStyle[colorMode],
        disabled ? TextFieldStyle.disabled : '',
        isError ? TextFieldStyle.error : '',
        focused ? TextFieldStyle.focused : '',
        readOnly ? TextFieldStyle.readOnly : '',
        compactMode ? TextFieldStyle.compactMode : '',
        typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
        TextFieldStyle[`widthMode-${widthMode}`],
        TextFieldStyle[`widthMode-${perfectLengthSizedParagraph}`],
        className || ''
    ].join(' '), [variant, colorMode, disabled, isError, focused, readOnly, compactMode, borderRadius, widthMode, perfectLengthSizedParagraph, className]);

    // Memoize style to avoid recreating object on every render
    const componentStyle = useMemo(() => ({
        ...style,
        ...(widthMode === 'number' ? { width: `${widthModeNumber}px` } : {}),
        ...(typeof borderRadius === 'number' ? { borderRadius: `${borderRadius}px` } : {})
    }), [style, widthMode, widthModeNumber, borderRadius]);

    // Memoize input size
    const inputSize = useMemo(() =>
        widthMode === 'fix-perfect-length' ?
            (perfectLengthSizedParagraph === 'Short' ? Perfect_Typo_length_Sized_Paragraph_Short_20_char :
                perfectLengthSizedParagraph === 'Med' ? Perfect_Typo_length_Sized_Paragraph_Med_40_char :
                    perfectLengthSizedParagraph === 'Long' ? Perfect_Typo_length_Sized_Paragraph_Long_60_char :
                        Perfect_Typo_length_Sized_Paragraph_Min_4char) :
            size
        , [widthMode, perfectLengthSizedParagraph, size]);

    // Memoize label text
    const labelText = useMemo(() => `${label || ''} ${required ? '*' : ''}`.trim(), [label, required]);

    return (
        <DivFlexColumn
            ref={ref}
            className={componentClassName}
            style={componentStyle}

        >
            {/* state layer */}
            <div className={[
                TextFieldStyle.stateLayer,
                typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
            ].join(' ')}></div>
            {/* end of state layer */}

            {/* outlined label */}
            {variant === 'Outlined' && !compactMode && label && (
                <div style={{
                    flex: 1,
                    position: 'relative',
                }}>
                    <TextBodyMedium children='a' style={{ opacity: 0 }} />
                    <label
                        htmlFor={id}
                        className={TextFieldStyle.label}
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
            {/* end of outlined label */}

            {/* main */}
            <DivFlexRowCenter
                className={[
                    TextFieldStyle.main,
                    typeof borderRadius !== 'number' ? `CM-border-radius-mode-${borderRadius}` : '',
                ].join(' ').trim()}
            >
                {/* leading icon */}
                {leadingIcon ? typeof leadingIcon === 'string' ? <IconGen className={TextFieldStyle.leadingIcon} svgName={leadingIcon} /> : <span className={[`leadingIcon`, TextFieldStyle.icon].join(' ')}>{leadingIcon}</span> : null}
                {/* end of leading icon */}

                {/* Text */}
                {/* input row */}
                <DivFlexColumn className={TextFieldStyle.inputRow}>
                    {/* filled label */}
                    {variant === 'Filled'
                        && label
                        && (placeholder || currentValue)
                        && (
                            <label
                                htmlFor={id}
                                className={TextFieldStyle.label}
                            >
                                <TextBodyMedium children={labelText} color='currentColor' />
                            </label>
                        )}
                    {/* end of filled label */}
                    <div>
                        <DivFlexRowSpaceBetweenBaseline >

                            {/* compact mode label */}
                            {label
                                && (compactMode || variant == 'Filled')
                                && !(placeholder || currentValue)
                                && (
                                    <label
                                        htmlFor={id}
                                        className={[TextFieldStyle.label, TextFieldStyle.labelCompactMode].join(' ')}
                                    >
                                        <TextBodyMedium children={labelText} color='currentColor' />
                                    </label>
                                )}
                            {/* end of compact mode label */}

                            <input
                                // id={autoID}
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
                                className={[TextFieldStyle.inputField, TextFieldStyle.filledInput, isError ? TextFieldStyle.error : ''].join(' ').trim()}
                            />

                            {trailingSupportText && <TextBodySmall children={trailingSupportText} />}
                        </DivFlexRowSpaceBetweenBaseline>
                        {/* end of input row */}
                    </div>
                </DivFlexColumn>

                {/* trailing items */}
                <DivFlexRowCenter>
                    {showClearButton && (
                        <Button
                            label={t('clear')}
                            variantMode='Icon'
                            leadingIcon='cancel'
                            styleMode='Text'
                            colorMode='Default'
                            onClick={handleClear}
                        />
                    )}
                    {trailingIcon && trailingIconAction && (
                        <Button
                            label='action'
                            variantMode='Icon'
                            styleMode='Text'
                            colorMode='Primary'
                            leadingIcon={trailingIcon}
                            onClick={trailingIconAction}
                        />
                    )}
                    {isError &&
                        <Button
                            label={errorMessage || 'error'}
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

                    <div className={TextFieldStyle.iconHeightKeeper} />
                </DivFlexRowCenter>
                {/* end of trailing items */}

            </DivFlexRowCenter>
            {/* end of main */}

            {/* filled support text */}
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
                                className={TextFieldStyle.divider}
                            />
                        </div>
                        <div className={TextFieldStyle.supportText} style={{ padding: 'var(--Spacing-Spacing-XXXS, 4px) var(--Spacing-Spacing-M, 24px) 0 var(--Spacing-Spacing-M, 24px)' }}>
                            <TextBodySmall color={isError ? 'var(--Schemes-Error)' : 'var(--Schemes-On-Surface-Variant)'} children={currentSupportText} />
                        </div>
                    </>
                )
            }
            {/* end of filled support text */}

            {/* outlined support text */}
            {
                currentSupportText
                && variant == 'Outlined'
                && !compactMode
                && (
                    <div className={TextFieldStyle.supportText} style={{ padding: 'var(--Spacing-Spacing-XXXS, 4px) var(--Spacing-Spacing-M, 24px) 0 var(--Spacing-Spacing-XS, 12px)' }}>
                        <TextBodySmall color={isError ? 'var(--Schemes-Error)' : 'var(--Schemes-On-Surface-Variant)'} children={currentSupportText} />
                    </div>
                )
            }
            {/* end of outlined support text */}
        </DivFlexColumn >
    )
})

/**
 * @returns a input field
 * @param label: 
 */
export default React.memo(TextField);

// TODO: 
// 1. encrypt type input
// 2. datalist support
// 3. better error message display
// 4. ref forwarding
// 5. add e2e test
// 6. add more accessibility features