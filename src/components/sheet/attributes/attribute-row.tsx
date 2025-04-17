"use client";

import type { ChangeEvent } from "react";
import { StatInput } from "../stats/stat-input";
import { Button } from "../../ui/button";
import { Dice6 } from "lucide-react";
import { LEVEL_DICE } from "@/constants/dice-levels";
import { rollDice } from "@/utils/rolls";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AttributeRowProps {
  title: string;
  basicStats: Record<string, number>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currentName: string;
  expName: string;
}

export function AttributeRow({
  title,
  basicStats,
  onChange,
  currentName,
  expName,
}: AttributeRowProps) {
  const abbreviatedTitle = title.slice(0, 3).toUpperCase();

  const handleRoll = () => {
    const attributeLevel = basicStats[currentName];
    const diceNotation = LEVEL_DICE[attributeLevel];

    rollDice(diceNotation, title, attributeLevel, basicStats, (result) => {
      console.log(result);
    });
  };

  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg bg-card">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="font-semibold cursor-help">
              {abbreviatedTitle}:
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex items-center gap-1">
        <StatInput
          name={currentName}
          value={basicStats[currentName]}
          onChange={onChange}
          label="Valor"
          min={0}
        />
        <span>/</span>
        <StatInput
          name={expName}
          value={basicStats[expName]}
          onChange={onChange}
          label="Exp gastos"
          readOnly
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleRoll}
          className="ml-2"
          title={`Rolar ${title}`}
        >
          <Dice6 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
