"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import "./styles/checkbox.css";

export interface ARC_CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "defaultChecked"> {
  /**
   * Controlled checked state. Supports boolean or "indeterminate".
   */
  checked?: boolean | "indeterminate";
  /**
   * Uncontrolled initial checked state. Supports boolean or "indeterminate".
   */
  defaultChecked?: boolean | "indeterminate";
  /**
   * Label content to display next to the checkbox.
   */
  label?: React.ReactNode;
  textStyle?: React.CSSProperties;
  /**
   * Layout position of the label relative to the checkbox.
   * @default "right"
   */
  labelPosition?: "left" | "right";
  /**
   * Support or help text to show below the label.
   */
  supportText?: string;
  /**
   * Visual shape variant: Box (square checkbox) or Radio (circular radio style).
   * @default "Box"
   */
  variant?: "Box" | "Radio";
  /**
   * Sizing/border style mode of the checkbox boundary.
   * @default "Outlined"
   */
  styleMode?: "Outlined" | "Filled";
  /**
   * Manual Figma status override. If omitted, is computed automatically from `checked` and internal state.
   */
  status?: "Selected" | "Unselected" | "Waiting" | "Indeterminate";
  /**
   * Validation error state. Changes color palette to error red.
   * @default false
   */
  error?: boolean;
  /**
   * Manual interaction state layer override (e.g. "Hovered", "Focused", "Pressed") for design previews.
   * By default, CSS hover/focus-visible selectors handle interactive feedback automatically.
   */
  stateMode?: "Enable" | "Hovered" | "Focused" | "Pressed" | "Disabled";
  /**
   * Custom className for the wrapper container.
   */
  className?: string;
  /**
   * Custom React CSS properties for the wrapper container.
   */
  style?: React.CSSProperties;
}

const ARC_CheckboxDefault: React.FC<ARC_CheckboxProps> = ({
  checked,
  defaultChecked,
  onChange,
  label,
  textStyle,
  labelPosition = "right",
  supportText,
  variant = "Box",
  styleMode = "Outlined",
  status,
  error = false,
  stateMode,
  className = "",
  style = {},
  disabled = false,
  name,
  value,
  id,
  tabIndex,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;

  // Uncontrolled state tracker
  const [internalChecked, setInternalChecked] = useState<boolean | "indeterminate">(
    defaultChecked ?? false
  );

  const currentChecked = isControlled ? checked : internalChecked;

  // Compute final status (Selected, Unselected, Indeterminate, Waiting)
  // Figma Spec has "Waiting" status which is treated as a custom loading state.
  const finalStatus: "Selected" | "Unselected" | "Waiting" | "Indeterminate" = useMemo(() => {
    if (status) return status;
    if (currentChecked === "indeterminate") return "Indeterminate";
    if (currentChecked === true) return "Selected";
    return "Unselected";
  }, [status, currentChecked]);

  // Synchronize native input's "indeterminate" DOM property
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = finalStatus === "Indeterminate";
    }
  }, [finalStatus]);

  // Handle native change event toggles
  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    let nextChecked = false;
    if (currentChecked === "indeterminate") {
      nextChecked = true;
    } else {
      nextChecked = !currentChecked;
    }

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    if (onChange) {
      onChange(e);
    }
  };

  // Render SVG Visual Core
  const renderVisualCore = () => {
    if (variant === "Box") {
      switch (finalStatus) {
        case "Selected":
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="16" height="16" rx="3" ry="3" stroke="currentColor" strokeWidth="2" className="ui-arc-checkbox-box-bg" />
              <path d="M7 12L10.5 15.5L17 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="ui-arc-checkbox-box-mark" />
            </svg>
          );
        case "Indeterminate":
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="16" height="16" rx="3" ry="3" stroke="currentColor" strokeWidth="2" className="ui-arc-checkbox-box-bg" />
              <path d="M7 12H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" className="ui-arc-checkbox-box-mark" />
            </svg>
          );
        case "Waiting":
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="16" height="16" rx="3" ry="3" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" fill="none" className="ui-arc-checkbox-box-bg" />
            </svg>
          );
        case "Unselected":
        default:
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="16" height="16" rx="3" ry="3" stroke="currentColor" strokeWidth="2" fill="none" className="ui-arc-checkbox-box-bg" />
            </svg>
          );
      }
    } else {
      // Radio (Circle) Variant
      switch (finalStatus) {
        case "Selected":
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" className="ui-arc-checkbox-radio-outer" />
              <circle cx="12" cy="12" r="4.5" fill="currentColor" className="ui-arc-checkbox-radio-inner" />
            </svg>
          );
        case "Indeterminate":
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" className="ui-arc-checkbox-radio-outer" fill="none" />
              <path d="M12 4A8 8 0 0 0 12 20Z" fill="currentColor" className="ui-arc-checkbox-radio-inner" />
            </svg>
          );
        case "Waiting":
          // Radio waiting is represented by a simple minus line in figma
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          );
        case "Unselected":
        default:
          return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" className="ui-arc-checkbox-radio-outer" />
            </svg>
          );
      }
    }
  };

  // Compile CSS modifiers
  const wrapperClassNames = useMemo(() => {
    return [
      "ui-arc-checkbox-wrapper",
      variant.toLowerCase(), // box | radio
      styleMode.toLowerCase(), // outlined | filled
      finalStatus.toLowerCase(), // selected | unselected | waiting | indeterminate
      disabled || stateMode === "Disabled" ? "disabled" : "",
      error ? "error" : "",
      stateMode ? `state-${stateMode.toLowerCase()}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }, [variant, styleMode, finalStatus, disabled, stateMode, error]);

  const labelContent = (label || supportText) && (
    <div className="ui-arc-checkbox-label-group" >
      {label && <span className="ui-arc-checkbox-label" style={textStyle}>{label}</span>}
      {supportText && <span className="ui-arc-checkbox-support-text" style={textStyle}>{supportText}</span>}
    </div>
  );

  return (
    <div className={`ui-arc-checkbox-container ${className}`} style={style}>
      <label className={wrapperClassNames}>
        {/* Visually hidden but fully keyboard focusable and screen-reader accessible */}
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={finalStatus === "Selected"}
          disabled={disabled || stateMode === "Disabled"}
          onChange={handleNativeChange}
          className="ui-arc-checkbox-native"
          tabIndex={tabIndex}
          {...props}
        />

        {/* Label Position Left */}
        {labelPosition === "left" && labelContent}

        {/* Checkbox Visual Wrapper */}
        <div className="ui-arc-checkbox-button">
          {/* Sizable interactive state layers (hover, focus, click) */}
          <div className="ui-arc-checkbox-state-layer" />

          {/* Svg visual vector core */}
          <div className="ui-arc-checkbox-core">
            {renderVisualCore()}
          </div>
        </div>

        {/* Label Position Right (default) */}
        {labelPosition === "right" && labelContent}
      </label>
    </div>
  );
};

// Hydration and dynamic match warnings bypass
const ARC_CheckboxNoSSR = dynamic(() => Promise.resolve(ARC_CheckboxDefault), {
  ssr: false,
});


/**
   * @param checked,
   * @param defaultChecked,
   * @param onChange,
   * @param label,
   * @param textStyle,
   * @param labelPosition = "right",
   * @param supportText,
   * @param variant = "Box",
   * @param styleMode = "Outlined",
   * @param status,
   * @param error = false,
   * @param stateMode,
   * @param className = "",
   * @param style = {},
   * @param disabled = false,
   * @param name,
   * @param value,
   * @param id,
   * @param tabIndex,
   * @param ...props
   */
export const ARC_Checkbox = React.memo(ARC_CheckboxNoSSR);
