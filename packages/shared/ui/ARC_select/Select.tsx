"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import "./styles/select.css";
import { ARC_Button as Button } from "@/packages/shared/ui/ARC_button";
import { ARC_Chip as Chip } from "@/packages/shared/ui/ARC_chip";

export interface ARC_SelectOption {
  value: string;
  label: string;
}

export interface ARC_SelectProps {
  options: ARC_SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  variant?: "Outlined" | "Filled";
  colorMode?: "Primary" | "Secondary" | "Tertiary" | "Default";
  borderRadius?: "none" | "default" | "rounded" | number;
  className?: string;
  style?: React.CSSProperties;
  leadingIcon?: React.ReactNode | string;
  name?: string; // Standard form field name binding
}

const ARC_SelectDefault: React.FC<ARC_SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select option...",
  label,
  disabled = false,
  variant = "Outlined",
  colorMode = "Primary",
  borderRadius = "default",
  className = "",
  style = {},
  leadingIcon,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(
    value ?? defaultValue ?? ""
  );
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === internalValue);
  }, [options, internalValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calculatePlacement = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = Math.min(240, options.length * 38 + 8); // Estimated real height
      return spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? "top" : "bottom";
    }
    return "bottom";
  };

  const handleSelect = (val: string) => {
    if (disabled) return;
    setInternalValue(val);
    setIsOpen(false);
    if (onChange) {
      onChange(val);
    }
  };

  const toggleDropdown = () => {
    if (disabled) return;
    if (!isOpen) {
      setPlacement(calculatePlacement());
    }
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) setPlacement(calculatePlacement());
      setIsOpen(true);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const borderRadiusClass = useMemo(() => {
    if (typeof borderRadius === "number") return "";
    return `radius-${borderRadius}`;
  }, [borderRadius]);

  const chevronIcon = (
    <div className={`ui-arc-select-arrow ${isOpen ? "open" : ""}`}>
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 1.5L6 6.5L11 1.5" />
      </svg>
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className={`ui-arc-select-wrapper ${className}`}
      style={style}
      onKeyDown={handleKeyDown}
    >
      {label && <label className="ui-arc-select-label">{label}</label>}

      {name && (
        <input type="hidden" name={name} value={internalValue} />
      )}

      <Button
        styleMode={variant === "Filled" ? "Filled" : "Outlined"}
        colorMode={colorMode}
        borderRadius={borderRadius}
        disabled={disabled}
        onClick={toggleDropdown}
        leadingIcon={leadingIcon}
        trailingIcon={chevronIcon}
        children={selectedOption ? selectedOption.label : placeholder}
        style={{ width: "100%", justifyContent: "space-between" }}
      />

      {isOpen && (
        <div
          className={`ui-arc-select-dropdown position-${placement} ${borderRadiusClass}`}
          style={typeof borderRadius === "number" ? { borderRadius: Math.min(12, borderRadius) } : {}}
        >
          {options.map((option) => {
            const isSelected = option.value === internalValue;
            return (
              <div key={option.value} className="ui-arc-select-option-wrapper">
                <Chip
                  children={option.label}
                  isSelected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  styleMode="Text"
                  colorMode={isSelected ? "Primary" : "Default"}
                  style={{ width: "100%", justifyContent: "flex-start" }}
                  textStyle={{ textAlign: 'left' }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ARC_SelectNoSSR = dynamic(() => Promise.resolve(ARC_SelectDefault), {
  ssr: false,
});

export const ARC_Select = React.memo(ARC_SelectNoSSR);
