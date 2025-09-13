import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CustomFormControlProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type: string;
  placeholder?: string;
  className?: string;
};

export default function CustomFormControl<T extends FieldValues>({
  control,
  name,
  label,
  type,
  placeholder,
  className,
}: CustomFormControlProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`gap-1 ${className ?? ""}`}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}