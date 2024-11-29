// components/Button.js
import { ButtonHTMLAttributes, ReactNode } from "react";
import { CiSearch } from "react-icons/ci";
import React from "react";
import Typography from "../Typography";
import clsx from "clsx";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "outline";
  className?: string;
}

const ButtonNoLink = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, size = "medium", variant = "primary", className,  ...rest }, ref) => {
    // Define classes based on the variant prop
    const variantClasses = {
      primary: "bg-button text-white hover:bg-primary-dark focus:bg-primary-dark",
      outline: "text-[#407BFF] hover:text-white focus:text-white",
    }
    // Define classes based on the size prop
    const sizeClasses = {
      small: "px-6 py-1", // Small button styles
      medium: "px-8 py-2", // Medium button styles
      large: "px-10 py-3", // Large button styles
    };

    // Define typography variants based on the size
    const typographyVariant: {
      [key in "small" | "medium" | "large"]: "bs" | "bm" | "bl";
    } = {
      small: "bs", // Small button text variant
      medium: "bm", // Medium button text variant
      large: "bl", // Large button text variant
    };
    return (
        <button
          ref={ref}
          className={clsx(`border-2 border-[#407BFF] w-fit rounded-md ${sizeClasses[size]} ${variantClasses[variant]} ${className}`
          )}
          {...rest}
        >
          <Typography
            as="span"
            variant={typographyVariant[size]}
            weight="medium"
            className={`${variant === "outline" ? "text-[#407BFF]" : "text-white"}`}
          >
            {children}
          </Typography>
        </button>
    );
  }
);

ButtonNoLink.displayName = 'ButtonNoLink';

export default ButtonNoLink;
