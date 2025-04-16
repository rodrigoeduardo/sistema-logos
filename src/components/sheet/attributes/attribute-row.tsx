"use client";

import type { ChangeEvent } from "react";
import { StatInput } from "../stats/stat-input";

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
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold min-w-24">{title}:</span>
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
      </div>
    </div>
  );
}
