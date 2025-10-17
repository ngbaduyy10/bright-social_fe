import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-center min-h-[80vh]">
      <LoaderCircle className="animate-spin w-10 h-10 text-primary" />
    </div>
  );
}

