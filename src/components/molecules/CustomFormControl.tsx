import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface CustomFormControlProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  type: string;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  icon?: React.ElementType;
};

export default function CustomFormControl<T extends FieldValues>({
  control,
  name,
  label,
  type,
  placeholder,
  className,
  classNameInput,
  icon: Icon,
}: CustomFormControlProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={`gap-1 [&_input]:outline-none [&_input]:shadow-none [&_input]:focus-visible:ring-0 ${className ?? ""}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="relative"
            >
              {Icon && (
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 z-10" />
              )}
              <Input 
                type={type} 
                placeholder={placeholder} 
                {...field}
                className={`
                  transition-all duration-200 ease-in-out border-none h-10
                  focus:ring-2 focus:ring-primary focus:border-primary bg-background
                  ${classNameInput ?? ''}
                  ${Icon && 'pl-10'}
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