"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; 

interface CommonButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function CommonButton({
  children,
  href,
  onClick,
  className,
}: CommonButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        className={cn(
          "cursor-pointer border border-white hover:bg-white hover:text-primary text-white w-fit transition-colors duration-200",
          className
        )}
        onClick={handleClick}
      >
        {children}
      </Button>
    </motion.div>
  );
}