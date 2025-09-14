import { cn } from "@/lib/utils";

interface LightningIconProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function LightningIcon({ 
  className, 
  size = "md" 
}: LightningIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };

  return (
    <svg 
      className={cn(sizeClasses[size], className)} 
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );
}
