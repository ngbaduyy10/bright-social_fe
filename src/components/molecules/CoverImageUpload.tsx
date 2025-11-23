import { useUploadImage } from "@/hooks/useUploadImage";
import { Image as ImageIcon, Camera, X } from "lucide-react";
import Image from "next/image";
import CommonButton from "@/components/atoms/CommonButton";

interface CoverImageUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

export default function CoverImageUpload({ image, setImage }: CoverImageUploadProps) {
  const {
    fileInputRef, 
    handleFileInputChange, 
    handleRemoveImage 
  } = useUploadImage({ setImage });

  return (
    <>
      <label className="text-sm font-medium leading-none">
        Cover Image
      </label>
      <div className="relative w-full h-80 rounded-xl overflow-hidden bg-background">
        {image ? (
          <Image
            src={image}
            alt="Cover"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
            <ImageIcon className="w-12 h-12" />
            <p className="text-sm">No cover image</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <CommonButton
            type="button"
            onClick={handleRemoveImage}
            className="h-9 px-4 flex items-center gap-2 bg-secondary text-primary rounded-lg text-sm"
          >
            <X className="w-4 h-4" />
            Remove
          </CommonButton>

          <CommonButton
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-9 px-4 flex items-center gap-2 rounded-lg text-sm"
          >
            <Camera className="w-4 h-4" />
            {image ? "Change" : "Upload"}
          </CommonButton>
        </div>
      </div>
    </>
  );
}