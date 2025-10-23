"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormControl from "./CustomFormControl";
import CommonButton from "../atoms/CommonButton";
import { Send } from "lucide-react";

export interface MessageFormData {
  message: string;
}

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export default function MessageInput({ 
  onSendMessage, 
}: MessageInputProps) {
  const form = useForm<MessageFormData>({
    defaultValues: {
      message: "",
    },
  });

  const message = form.watch("message");

  const handleSubmit = () => {
    onSendMessage(message);
    form.resetField("message");
  };

  return (
    <div className="bg-white p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center gap-2">
          <div className="flex-1">
            <CustomFormControl
              control={form.control}
              name="message"
              type="text"
              placeholder="Type your message..."
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
