"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormControl from "./CustomFormControl";
import CommonButton from "../atoms/CommonButton";
import { Send } from "lucide-react";

export interface CommentFormData {
  comment: string;
}

interface CommentInputProps {
  onSendComment: (comment: string) => void;
}

export default function CommentInput({ 
  onSendComment, 
}: CommentInputProps) {
  const form = useForm<CommentFormData>({
    defaultValues: {
      comment: "",
    },
  });

  const comment = form.watch("comment");

  const handleSubmit = () => {
    onSendComment(comment);
    form.resetField("comment");
  };

  return (
    <div className="bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center gap-2">
          <div className="flex-1">
            <CustomFormControl
              control={form.control}
              name="comment"
              type="text"
              placeholder="Write a comment..."
              classNameInput="w-full"
            />
          </div>
          
          <CommonButton
            type="submit"
            className="px-4"
          >
            <Send size={16} />
          </CommonButton>
        </form>
      </Form>
    </div>
  );
}
