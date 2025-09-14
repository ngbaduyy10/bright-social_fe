import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

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
      render={({ field, fieldState }) => (
        <FormItem className={`gap-1 ${className ?? ""}`}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Input 
                type={type} 
                placeholder={placeholder} 
                {...field}
                className={`
                  transition-all duration-200 ease-in-out
                  focus:ring-2 focus:ring-primary focus:border-primary
                  ${fieldState.error && 'border-red-500 focus:ring-red-500 focus:border-red-500'}
                `}
              />
            </motion.div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}