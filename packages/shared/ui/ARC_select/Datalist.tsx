"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import "./styles/select.css";
import TextField from "@/packages/shared/ui/ARC_text_input/TextField";
import { ARC_Chip as Chip } from "@/packages/shared/ui/ARC_chip";

export interface ARC_DatalistOption {
  value: string;
  label: string;
}

export interface ARC_DatalistProps {
  options: ARC_DatalistOption[];
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

const ARC_DatalistDefault: React.FC<ARC_DatalistProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Type or select...",
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
  const [inputValue, setInputValue] = useState<string>(
    value ?? defaultValue ?? ""
  );
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const displayValue = useMemo(() => {
    const matched = options.find((opt) => opt.value === inputValue);
    return matched ? matched.label : inputValue;
  }, [options, inputValue]);

  const filteredOptions = useMemo(() => {
    if (!inputValue.trim()) return options;

    const isSelectedValue = options.some((opt) => opt.value === inputValue);
    if (isSelectedValue) return options;

    const query = inputValue.toLowerCase().trim();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.value.toLowerCase().includes(query)
    );
  }, [options, inputValue]);

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
      // Datalist uses filteredOptions, but at the moment of opening, we can estimate based on current filteredOptions
      const dropdownHeight = Math.min(240, filteredOptions.length * 38 + 8); 
      return spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? "top" : "bottom";
    }
    return "bottom";
  };

  const handleSelect = (val: string) => {
    if (disabled) return;
    setInputValue(val);
    setIsOpen(false);
    if (onChange) {
      onChange(val);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const val = e.target.value;
    setInputValue(val);
    if (!isOpen) setPlacement(calculatePlacement());
    setIsOpen(true);
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
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setPlacement(calculatePlacement());
      setIsOpen(true);
    }
  };

  const borderRadiusClass = useMemo(() => {
    if (typeof borderRadius === "number") return "";
    return `radius-${borderRadius}`;
  }, [borderRadius]);

  const chevronIcon = (
    <div className={`ui-arc-select-arrow ${isOpen ? "open" : ""}`} style={{ cursor: "pointer", pointerEvents: "none" }}>
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
      onClick={() => {
        if (!disabled && !isOpen) {
          setPlacement(calculatePlacement());
          setIsOpen(true);
        }
      }}
    >
      <TextField
        name={name}
        preValue={displayValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        label={label}
        disabled={disabled}
        variant={variant}
        colorMode={colorMode}
        borderRadius={borderRadius}
        leadingIcon={leadingIcon}
        trailingIcon={chevronIcon}
        trailingIconAction={toggleDropdown}
        widthMode="fill"
      />

      {isOpen && filteredOptions.length > 0 && (
        <div
          className={`ui-arc-select-dropdown position-${placement} ${borderRadiusClass}`}
          style={typeof borderRadius === "number" ? { borderRadius: Math.min(12, borderRadius) } : {}}
        >
          {filteredOptions.map((option) => {
            const isSelected = option.value === inputValue;
            return (
              <div key={option.value} className="ui-arc-select-option-wrapper">
                <Chip
                  children={option.label}
                  isSelected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  styleMode="Text"
                  colorMode={isSelected ? "Primary" : "Default"}
                  style={{ width: "100%", justifyContent: "flex-start" }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ARC_DatalistNoSSR = dynamic(() => Promise.resolve(ARC_DatalistDefault), {
  ssr: false,
});

export const ARC_Datalist = React.memo(ARC_DatalistNoSSR);
