"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormControl from "./CustomFormControl";
import { Search } from "lucide-react";

interface SearchFormData {
  search: string;
}

export default function SearchInput() {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-[350px]">
        <CustomFormControl
          control={form.control}
          name="search"
          type="text"
          placeholder="Search"
          icon={Search}
        />
      </form>
    </Form>
  );
}