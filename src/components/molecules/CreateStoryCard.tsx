"use client"

import { Plus } from 'lucide-react'
import CommonButton from '../atoms/CommonButton'
import { useState } from 'react';
import CreateStoryModal from '../organisms/CreateStoryModal';

export default function CreateStoryCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div 
        className="w-[130px] h-[180px] rounded-xl border-2 border-dashed border-gray-300 flex-center flex-col p-2 cursor-pointer flex-shrink-0"
        onClick={() => setOpen(true)}
      >
        <CommonButton className="w-16 h-16 rounded-full mb-4 shadow-lg">
          <Plus className="w-8 h-8 text-white stroke-[3]" />
        </CommonButton>
        
        <p className="font-medium text-sm text-center">
          Create Story
        </p>
      </div>
      
      <CreateStoryModal open={open} onOpenChange={setOpen} />
    </>
  )
}