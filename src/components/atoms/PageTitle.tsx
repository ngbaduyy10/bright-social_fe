interface PageTitleProps {
  title: string;
  description?: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="mb-5">
      <h1 className="text-[32px] font-bold leading-[1.5]">{title}</h1>
      {description && <p className="text-muted-foreground text-lg leading-tight">{description}</p>}
    </div>
  );
}