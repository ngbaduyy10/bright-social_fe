"use client";

import CommonButton from "@/components/atoms/CommonButton";

export default function NotFound() {
  return (
    <div className="min-h-[700px] rounded-lg flex-center flex-col px-4 pb-20">
      <div className="flex flex-col items-center text-center max-w-2xl relative z-10">
        <div className="mb-6">
          <p className="text-8xl md:text-9xl font-extrabold text-primary">
            404
          </p>
        </div>

        <div className="mb-8">
          <p className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
            Page Not Found
          </p>
          <p className="text-muted-foreground text-base md:text-lg mb-2">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <p className="text-muted-foreground text-sm md:text-base">
            It might have been moved or deleted.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <CommonButton href="/" className="px-8 py-6 text-base">
            Go Home
          </CommonButton>
          <CommonButton onClick={() => window.history.back()} className="px-8 py-6 text-base bg-transparent border border-primary text-primary hover:bg-primary hover:text-white">
            Go Back
          </CommonButton>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20" />
        </div>
      </div>
    </div>
  );
}

