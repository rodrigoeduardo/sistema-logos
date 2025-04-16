"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type MomentType = "A" | "B";

interface MomentTrackerProps {
  initialMoment?: MomentType;
  initialPosition?: number;
}

export default function MomentTracker({
  initialMoment = "A",
  initialPosition = 0,
}: MomentTrackerProps) {
  const [currentMoment, setCurrentMoment] = useState<MomentType>(initialMoment);
  const [position, setPosition] = useState(initialPosition);
  const [inputValue, setInputValue] = useState("");

  const handleIncrement = () => {
    const currentValue = parseInt(inputValue) || 0;
    setInputValue((currentValue + 1).toString());
  };

  const handleDecrement = () => {
    const currentValue = parseInt(inputValue) || 0;
    setInputValue((currentValue - 1).toString());
  };

  const handleApply = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    let newPosition = position + value;
    let newMoment = currentMoment;

    // Calculate total moments from current position
    const totalMoments = position + value;

    // Calculate how many times we've passed through 10 moments
    const fullCycles = Math.floor(totalMoments / 10);

    // If we have an odd number of full cycles, switch moments
    if (fullCycles % 2 === 1) {
      newMoment = currentMoment === "A" ? "B" : "A";
    }

    // Calculate the final position
    newPosition = totalMoments % 10;

    setPosition(newPosition);
    setCurrentMoment(newMoment);
    setInputValue("");
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">Marcador de Momentos</h2>

      <div className="flex flex-col gap-4 p-4 border rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Momento {currentMoment}</span>
          <span className="text-2xl font-bold">{position}</span>
        </div>

        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-8 flex-1 border rounded transition-colors",
                index < position
                  ? currentMoment === "A"
                    ? "bg-blue-500"
                    : "bg-purple-500"
                  : "bg-gray-100"
              )}
            />
          ))}
        </div>

        <div className="flex gap-2 justify-end">
          <Button onClick={handleDecrement} variant="outline" size="icon">
            -
          </Button>

          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="0"
            className="w-16 text-center"
          />

          <Button onClick={handleIncrement} variant="outline" size="icon">
            +
          </Button>

          <Button onClick={handleApply} className="min-w-[80px]">
            Aplicar
          </Button>
        </div>
      </div>
    </div>
  );
}
