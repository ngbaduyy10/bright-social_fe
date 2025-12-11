import { useRef, useState, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export interface ImageData {
  url: string;
  width: number;
  height: number;
}

interface UseUploadMultipleImagesProps {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  maxImages?: number;
  maxFileSizeMB?: number;
}

const getImageDimensions = (base64: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = base64;
  });
};

export function useUploadMultipleImages({
  images,
  setImages,
  maxImages = 7,
  maxFileSizeMB = 5,
}: UseUploadMultipleImagesProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

  const handleFileSelect = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length === 0) {
      toast.error("Please select valid image files");
      return;
    }

    if (images.length + validFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    validFiles.forEach((file) => {
      if (file.size > maxFileSizeBytes) {
        toast.error(`${file.name} exceeds ${maxFileSizeMB}MB limit`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const url = reader.result as string;
        const { width, height } = await getImageDimensions(url);
        setImages((prev) => [...prev, { url, width, height }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
    // Reset input to allow re-selecting same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    isDragging,
    fileInputRef,
    handleFileInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveImage,
  };
}
