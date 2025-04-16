"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EditableTitleProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  className?: string;
}

export default function EditableTitle({
  title,
  setTitle,
  className,
}: EditableTitleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className="relative group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "font-bold border-none p-0 h-auto bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
          "transition-all duration-200 !text-2xl",
          !isHovered && !isFocused && "cursor-default",
          isHovered &&
            !isFocused &&
            "cursor-text border-b border-solid border-gray-400",
          isFocused && "border-b border-solid border-gray-600",
          className
        )}
      />
      {!isFocused && !isHovered && (
        <div className="absolute inset-0 pointer-events-none" />
      )}
    </div>
  );
}
