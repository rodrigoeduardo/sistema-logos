"use client";

import { Dispatch, SetStateAction, useEffect, type ChangeEvent } from "react";
import { StatInput } from "../stats/stat-input";
import { getStatLabel } from "@/utils/stats";
import { StatModifier } from "@/app/types/stats";

interface StatRowProps {
  title: string;
  baseValue: number;
  basicStats: Record<string, number>;
  stats: Record<string, number>;
  setStats: Dispatch<
    SetStateAction<{
      [P: string]: number;
    }>
  >;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currentName: string;
  totalName: string;
  modifiers: Array<StatModifier>;
}

export function StatRow({
  title,
  baseValue,
  basicStats,
  stats,
  setStats,
  onChange,
  currentName,
  totalName,
  modifiers,
}: StatRowProps) {
  useEffect(() => {
    const total =
      baseValue +
      modifiers.reduce(
        (acc, cur) => acc + (cur.mod ?? 1) * basicStats[cur.name],
        0
      );

    setStats((prev) => ({
      ...prev,
      [currentName]: total,
      [totalName]: total,
    }));
  }, [baseValue, currentName, modifiers, setStats, basicStats, totalName]);

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
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 ml-2">
          <span className="text-sm">= {baseValue} +</span>
          <div className="flex flex-wrap items-center gap-2">
            {modifiers.map((mod) => {
              const name = mod.custom
                ? mod.name + "Custom"
                : title + mod.name + mod.mod;

              return (
                <div
                  key={title + mod.name + mod.mod}
                  className="flex items-center gap-1"
                >
                  <StatInput
                    name={name}
                    value={basicStats[mod.name] * (mod.mod ?? 1)}
                    onChange={onChange}
                    label={mod.label ?? getStatLabel(mod.name, mod.mod)}
                    readOnly={!mod.custom}
                  />
                  {mod.name !== modifiers[modifiers.length - 1].name && (
                    <span>+</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
