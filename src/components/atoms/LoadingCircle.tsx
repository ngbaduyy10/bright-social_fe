import { LoaderCircle } from "lucide-react";

interface LoadingCircleProps {
  loading: boolean;
  text: string;
}

export default function LoadingCircle({ loading, text } : LoadingCircleProps) {
  return (
    <>
      {loading ? (
        <div className="animate-spin flex-center">
          <LoaderCircle/>
        </div>
      ) : text}
    </>
  )
}