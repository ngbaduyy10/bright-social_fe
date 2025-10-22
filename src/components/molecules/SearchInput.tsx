"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormControl from "./CustomFormControl";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export interface SearchFormData {
  keyword: string;
}

interface SearchInputProps {
  className?: string;
  classNameInput?: string;
  onSubmit?: (keyword: string) => void;
  onChange?: (keyword: string) => void;
  clearKeyword?: boolean;
  setClearKeyword?: (clear: boolean) => void;
}

export default function SearchInput({ className, classNameInput, onSubmit, onChange, clearKeyword, setClearKeyword }: SearchInputProps) {
  const form = useForm<SearchFormData>({
    defaultValues: {
      keyword: "",
    },
  });

  const keyword = form.watch("keyword");

  useEffect(() => {
    if (clearKeyword) {
      form.resetField("keyword");
      setClearKeyword?.(false);
    }
  }, [form, clearKeyword, setClearKeyword]);

  useEffect(() => {
    onChange?.(keyword);
  }, [keyword, onChange]);

  const handleSubmit = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    onSubmit?.(keyword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit) } className={cn(className)}>
        <CustomFormControl
          control={form.control}
          name="keyword"
          type="text"
          placeholder="Search"
          icon={Search}
          classNameInput={classNameInput}
        />
      </form>
    </Form>
  );
}