import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageTitle({ title, description, className }: PageTitleProps) {
  return (
    <div className={cn("mb-5", className)}>
      <h1 className="text-[32px] font-bold leading-[1.5]">{title}</h1>
      {description && <p className="text-muted-foreground text-lg leading-tight">{description}</p>}
    </div>
  );
}