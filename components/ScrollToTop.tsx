"use client";

import { usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ScrollToTopProps {
  children: ReactNode;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
