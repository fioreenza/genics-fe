import Link from "next/link";
import type { ReactNode } from "react";

interface TRouterLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const RouterLink = ({
  href,
  children,
  className,
  ...rest
}: TRouterLinkProps) => {
  return (
    <Link
      href={href}
      className={`hover:text-[#FE974C] ${className || ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default RouterLink;