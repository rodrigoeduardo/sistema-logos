"use client";

import { useEffect, type ChangeEvent } from "react";
import { StatInput } from "./stat-input";

interface DefenseRowProps {
  title: string;
  baseValue: number;
  stats: Record<string, number>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currentName: string;
  bonusName: string;
  penaltyName: string;
  totalName: string;
  modifiers: Array<{
    name: string;
    mod: number;
    label: string;
  }>;
}

export function DefenseRow({
  title,
  baseValue,
  stats,
  onChange,
  currentName,
  bonusName,
  penaltyName,
  totalName,
  modifiers,
}: DefenseRowProps) {
  useEffect(() => {
    const total =
      baseValue +
      modifiers.reduce((acc, cur) => acc + cur.mod * stats[cur.name], 0);
    stats[totalName] = total;

    if (stats[currentName] == 0) stats[currentName] = total;
  }, [baseValue, currentName, modifiers, stats, totalName]);

  return (
    <div className="flex border-b pb-3 last:border-b-0">
      <span className="font-semibold min-w-24">{title}:</span>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <StatInput
              name={currentName}
              value={stats[currentName]}
              onChange={onChange}
              label="Atual"
            />
            <span>(</span>
            <StatInput
              name={bonusName}
              value={stats[bonusName]}
              onChange={onChange}
              label="Bônus"
            />
            <span>/</span>
            <span>[-</span>
            <StatInput
              name={penaltyName}
              value={stats[penaltyName]}
              onChange={onChange}
              label="Penalidade"
            />
            <span>])</span>
            <span>/</span>
            <StatInput
              name={totalName}
              value={stats[totalName]}
              onChange={onChange}
              label="Total"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 ml-2">
          <span className="text-sm">= {baseValue} +</span>
          <div className="flex flex-wrap items-center gap-2">
            {modifiers.map((mod) => (
              <div
                key={title + mod.name + mod.mod}
                className="flex items-center gap-1"
              >
                <StatInput
                  name={title + mod.name + mod.mod}
                  value={stats[mod.name] * mod.mod}
                  onChange={onChange}
                  label={mod.label}
                />
                {mod.name !== modifiers[modifiers.length - 1].name && (
                  <span>+</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
