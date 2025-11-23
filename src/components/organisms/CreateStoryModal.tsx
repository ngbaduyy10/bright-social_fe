"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, AlignLeft, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { storyColors } from "@/utils/constant";
import CommonButton from "@/components/atoms/CommonButton";
import StoryImageUpload from "@/components/molecules/StoryImageUpload";

type StoryMode = "text" | "photo"

interface CreateStoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateStoryModal({
  open,
  onOpenChange,
}: CreateStoryModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>(storyColors[0].value);
  const [storyText, setStoryText] = useState("");
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const [mode, setMode] = useState<StoryMode>("text");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[400px] md:w-[500px] bg-transparent border-none shadow-none p-0"
      >
        <DialogHeader className="w-[400px] md:w-[500px] flex flex-row items-center gap-4">
          <ArrowLeft className="h-6 w-6 text-white cursor-pointer" onClick={() => onOpenChange(false)} />
          <DialogTitle className="flex-1 text-center text-white font-semibold text-2xl">
            Create Story
          </DialogTitle>
        </DialogHeader>

        <div className="w-[400px] md:w-[500px] space-y-3">
          {mode === "text" ? (
            <>
              <div
                className="rounded-xl min-h-[400px] p-6 transition-colors"
                style={{ backgroundColor: selectedColor }}
              >
                <textarea
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full h-full text-lg text-white resize-none outline-none border-none focus:ring-0 placeholder:font-medium"
                  autoFocus
                />
              </div>
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-2 py-1">
                  {storyColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.value)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all flex-shrink-0 cursor-pointer",
                        selectedColor === color.value
                          ? "border-white"
                          : "border-transparent"
                      )}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <StoryImageUpload image={storyImage} setImage={setStoryImage} />
          )}

          <div className="flex items-center gap-3">
            <CommonButton
              onClick={() => setMode("text")}
              className={cn(
                "flex-1 h-12 rounded-lg text-md font-semibold gap-2",
                mode === "text"
                  ? "bg-primary text-white hover:bg-primary"
                  : "bg-secondary text-black hover:bg-secondary"
              )}
            >
              <AlignLeft size={18} className="stroke-[3]" />
              Text
            </CommonButton>
            <CommonButton
              onClick={() => setMode("photo")}
              className={cn(
                "flex-1 h-12 rounded-lg text-md font-semibold gap-2",
                mode === "photo"
                  ? "bg-primary text-white hover:bg-primary"
                  : "bg-secondary text-black hover:bg-secondary"
              )}
            >
              <Upload size={18} className="stroke-[3]" />
              Photo
            </CommonButton>
          </div>

          <CommonButton
            className="w-full h-12 rounded-lg text-md font-semibold bg-white text-black hover:bg-primary hover:text-white"
            disabled={(mode === "text" && !storyText.trim()) || (mode === "photo" && !storyImage)}
          >
            Create
          </CommonButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}