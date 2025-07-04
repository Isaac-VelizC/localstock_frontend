import type {  ReactNode, ButtonHTMLAttributes } from 'react'
import { forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "cb";
  variant?:
    | "primary"
    | "outline"
    | "danger"
    | "success"
    | "warning"
    | "ghost"
    | "link"
    | "edit"
    | "delete";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  backgroundColor?: string; // Custom background color
  textColor?: string; // Custom text color
  borderColor?: string; // Custom border color
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "md",
      variant = "primary",
      startIcon,
      endIcon,
      className = "",
      disabled = false,
      backgroundColor,
      textColor,
      borderColor,
      ...rest
    },
    ref
  ) => {
    const sizeClasses: Record<string, string> = {
      cb: "px-2 py-2 text-sm rounded-md mb-1",
      xs: "px-2 py-1 text-xs rounded-md",
      sm: "px-4 py-2 text-sm rounded-md",
      md: "px-5 py-3 text-base rounded-lg",
      lg: "px-6 py-3.5 text-lg rounded-lg",
      xl: "px-7 py-4 text-xl rounded-xl",
    };

    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantClasses: Record<string, string> = {
      primary:
        "bg-brand-600 text-white shadow-md hover:bg-brand-700 focus:ring-brand-500 disabled:bg-brand-300 disabled:cursor-not-allowed",
      outline:
        "bg-transparent text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-transparent dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-white/10 disabled:text-gray-400 disabled:ring-gray-200 disabled:cursor-not-allowed",
      danger:
        "bg-red-600 text-white shadow-md hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed",
      success:
        "bg-green-600 text-white shadow-md hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed",
      warning:
        "bg-yellow-500 text-black shadow-md hover:bg-yellow-600 focus:ring-yellow-400 disabled:bg-yellow-300 disabled:cursor-not-allowed",
      ghost:
        "bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 disabled:text-gray-400 disabled:cursor-not-allowed",
      link:
        "bg-transparent text-brand-600 underline hover:text-brand-800 focus:ring-brand-500 disabled:text-brand-300 disabled:cursor-not-allowed",
      edit:
        "inline-flex items-center bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
      delete:
        "inline-flex items-center bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500",
    };

    return (
      <button
        ref={ref}
        type="button"
        className={`${baseClasses} ${className} ${sizeClasses[size]} ${
          variantClasses[variant]
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
          borderColor: borderColor,
          ...(variant === "outline" && borderColor
            ? { borderWidth: "1px", borderStyle: "solid" }
            : {}),
        }}
        disabled={disabled}
        aria-disabled={disabled}
        {...rest}
      >
        {startIcon && <span className="flex items-center">{startIcon}</span>}
        {children}
        {endIcon && <span className="flex items-center">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

