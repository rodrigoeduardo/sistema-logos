"use client";

import type { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatInputProps {
  name: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  readOnly?: boolean;
  min?: number;
  max?: number;
  className?: string;
}

export function StatInput({
  name,
  value,
  onChange,
  label,
  readOnly,
  min = 0,
  max = 999,
  className = "",
}: StatInputProps) {
  const handleIncrement = () => {
    if (value < max) {
      const input = document.createElement("input");
      input.type = "number";
      input.name = name;
      input.value = String(value + 1);
      const event = {
        target: input,
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      const input = document.createElement("input");
      input.type = "number";
      input.name = name;
      input.value = String(value - 1);
      const event = {
        target: input,
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={className}>
            <Input
              readOnly={readOnly}
              type="number"
              name={name}
              value={value}
              onChange={onChange}
              min={min}
              max={max}
              className={cn(
                "w-10 h-8 px-2 text-right [appearance:textfield]",
                "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                {
                  "bg-gray-100/50": readOnly,
                }
              )}
            />
          </div>
        </TooltipTrigger>
        {!readOnly && (
          <TooltipContent className="flex flex-col items-center gap-2">
            {label && <span className="text-sm">{label}</span>}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={handleDecrement}
                disabled={value <= min}
                className="h-6 w-6"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm">{value}</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={handleIncrement}
                disabled={value >= max}
                className="h-6 w-6"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </TooltipContent>
        )}
        {readOnly && label && (
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
