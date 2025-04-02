"use client";

import { useEffect, type ChangeEvent } from "react";
import { StatInput } from "./stat-input";
import { getStatLabel } from "@/utils/stats";

interface StatRowProps {
  title: string;
  baseValue: number;
  stats: Record<string, number>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currentName: string;
  totalName: string;
  modifiers: Array<{
    name: string;
    mod?: number;
    label?: string;
  }>;
}

export function StatRow({
  title,
  baseValue,
  stats,
  onChange,
  currentName,
  totalName,
  modifiers,
}: StatRowProps) {
  useEffect(() => {
    const total =
      baseValue +
      modifiers.reduce((acc, cur) => acc + (cur.mod ?? 1) * stats[cur.name], 0);
    stats[totalName] = total;
    stats[currentName] = total;
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
                  value={stats[mod.name] * (mod.mod ?? 1)}
                  onChange={onChange}
                  label={mod.label ?? getStatLabel(mod.name, mod.mod)}
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
