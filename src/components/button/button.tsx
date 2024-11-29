// components/Button.js
import { ReactNode } from "react";
import Typography from "../Typography";

interface ButtonProps {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
  href?: string;
  bgColor?: string;
  onClick?: () => void;
  textColor?: string;
}

export default function Button({
  href,
  className,
  children,
  size = "medium",
  bgColor = "bg-button",
  textColor = "text-white",
}: ButtonProps) {
  const sizeClasses = {
    small: "px-6 py-1",
    medium: "px-8 py-2",
    large: "px-10 py-3",
  };

  const typographyVariant: {
    [key in "small" | "medium" | "large"]: "bs" | "bm" | "bl";
  } = {
    small: "bs",
    medium: "bm",
    large: "bl",
  };

  return (
    <a href={href} className="group">
      <button className={`w-fit ${bgColor} rounded-md ${sizeClasses[size]} ${className}`}>
        <Typography
          as="span"
          variant={typographyVariant[size]}
          weight="medium"
          className={`${textColor}`}
        >
          {children}
        </Typography>
      </button>
    </a>
  );
}
