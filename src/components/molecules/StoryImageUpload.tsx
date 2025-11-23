"use client"

import { X, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadImage } from "@/hooks/useUploadImage";

interface StoryImageUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

export default function StoryImageUpload({ image, setImage }: StoryImageUploadProps) {
  const {
    isDragging, 
    fileInputRef, 
    handleFileInputChange, 
    handleDragOver, 
    handleDragLeave, 
    handleDrop, 
    handleRemoveImage 
  } = useUploadImage({ setImage });

  return (
    <div className={
      cn("rounded-xl min-h-[460px] p-6 flex-center bg-white transition-all", 
      isDragging && "ring-3 ring-primary ring-offset-2 bg-secondary")
    }>
      {image ? (
        <div className="relative w-full h-full">
          <img
            src={image}
            alt="Selected"
            className="w-full h-full object-contain rounded-lg"
          />
          <div 
            className="absolute top-2 right-2 h-8 w-8 flex-center bg-black/50 text-white rounded-full hover:bg-black/70 cursor-pointer" 
            onClick={handleRemoveImage}
          >
            <X className="w-4 h-4 stroke-[3]" />
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-2 text-primary rounded-lg"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CloudUpload className="w-16 h-16" />
          <p className="text-center font-medium">
            Drag and Drop an asset here
          </p>
          <p className="text-center">Or</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary text-white hover:bg-primary "
          >
            Browse
          </Button>
        </div>
      )}
    </div>
  );
}