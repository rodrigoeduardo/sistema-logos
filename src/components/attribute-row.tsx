"use client"

import type { ChangeEvent } from "react"
import { StatInput } from "./stat-input"

interface AttributeRowProps {
  title: string
  stats: Record<string, number>
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  currentName: string
  expName: string
}

export function AttributeRow({ title, stats, onChange, currentName, expName }: AttributeRowProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold min-w-24">{title}:</span>
      <div className="flex items-center gap-1">
        <StatInput name={currentName} value={stats[currentName]} onChange={onChange} label="Valor" />
        <span>/</span>
        <StatInput name={expName} value={stats[expName]} onChange={onChange} label="Exp gastos" />
      </div>
    </div>
  )
}

