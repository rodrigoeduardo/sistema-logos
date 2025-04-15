"use client";

import type { ChangeEvent } from "react";

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
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <input
        readOnly={readOnly}
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-12 h-8 text-center border rounded bg-background"
      />
      {label && <span className="text-xs mt-1 text-center">{label}</span>}
    </div>
  );
}
