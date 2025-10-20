"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormControl from "./CustomFormControl";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFormData {
  search: string;
}

interface SearchInputProps {
  className?: string;
  classNameInput?: string;
}

export default function SearchInput({ className, classNameInput }: SearchInputProps) {
  const form = useForm<SearchFormData>({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: SearchFormData) => {
    console.log("Search query:", data.search);
    // Add your search logic here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
        <CustomFormControl
          control={form.control}
          name="search"
          type="text"
          placeholder="Search"
          icon={Search}
          classNameInput={classNameInput}
        />
      </form>
    </Form>
  );
}