import { useUploadImage } from "@/hooks/useUploadImage";
import { Camera, RotateCcw, X } from "lucide-react";
import CommonButton from "../atoms/CommonButton";
import DefaultAvatar from "@/static/icons/default_avatar.png";
import Image from "next/image";

interface AvatarUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

export default function AvatarUpload({ image, setImage }: AvatarUploadProps) {
  const {
    isDragging, 
    fileInputRef, 
    handleFileInputChange, 
    handleRemoveImage 
  } = useUploadImage({ setImage });
  
  return (
    <div className="w-full">
      <label className="text-sm font-medium leading-none">
        Avatar
      </label>
      <div className="w-full flex-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-40 h-40 rounded-full bg-background">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image
                src={image || DefaultAvatar}
                alt="Image"
                fill
                className="object-cover"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 h-10 w-10 flex-center bg-primary text-white rounded-full cursor-pointer"
            >
              <Camera className="w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <CommonButton
              type="button"
              className="h-9 px-4 flex items-center gap-2 rounded-lg text-sm w-full"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </CommonButton>

            <CommonButton
              type="button"
              onClick={handleRemoveImage}
              className="h-9 px-4 flex items-center gap-2 bg-secondary text-primary rounded-lg text-sm w-full"
            >
              <X className="w-4 h-4" />
              Remove
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}