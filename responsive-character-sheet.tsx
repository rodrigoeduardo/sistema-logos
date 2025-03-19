"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function ResponsiveCharacterSheet() {
  // Initialize state for all form fields
  const [stats, setStats] = useState({
    // Existência
    vitalidadeAtual: 0,
    vitalidadeTotal: 0,
    regVitAtual: 0,
    regVitTotal: 0,
    estaminaAtual: 0,
    estaminaTotal: 0,
    regEstAtual: 0,
    regEstTotal: 0,
    manaAtual: 0,
    manaTotal: 0,
    regManAtual: 0,
    regManTotal: 0,

    // Defesas
    fortitudeAtual: 0,
    fortitudeBon: 0,
    fortitudePen: 0,
    fortitudeTotal: 0,
    vontadeAtual: 0,
    vontadeBon: 0,
    vontadePen: 0,
    vontadeTotal: 0,
    reflexosAtual: 0,
    reflexosBon: 0,
    reflexosPen: 0,
    reflexosTotal: 0,
    fragilidadeAtual: 0,
    fragilidadeBon: 0,
    fragilidadePen: 0,
    fragilidadeTotal: 0,

    // Atributos
    forcaAtual: 0,
    forcaExpGastos: 0,
    constituicaoAtual: 0,
    constituicaoExpGastos: 0,
    destrezaAtual: 0,
    destrezaExpGastos: 0,
    percepcaoAtual: 0,
    percepcaoExpGastos: 0,
    inteligenciaAtual: 0,
    inteligenciaExpGastos: 0,
    sabedoriaAtual: 0,
    sabedoriaExpGastos: 0,
    carismaAtual: 0,
    carismaExpGastos: 0,
  })

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStats((prev) => ({
      ...prev,
      [name]: Number.parseInt(value) || 0,
    }))
  }

  // Input component for number fields
  const NumberInput = ({ name, min = 0, max = 999 }: { name: string; min?: number; max?: number }) => (
    <input
      type="number"
      name={name}
      value={stats[name as keyof typeof stats]}
      onChange={handleChange}
      min={min}
      max={max}
      className="w-12 h-8 text-center border rounded bg-background"
    />
  )

  return (
    <div className="p-2 sm:p-4 max-w-4xl mx-auto bg-white">
      <Card className="p-3 sm:p-6 space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold">Ficha de Personagem</h1>

        {/* Existência */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Existência</h2>

          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-semibold">Vitalidade:</span>
                <NumberInput name="vitalidadeAtual" /> / <NumberInput name="vitalidadeTotal" />
              </div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span>= 6 +</span>
                <div className="flex flex-wrap items-center gap-1">
                  <NumberInput name="vitalidadeRaca" />
                  <span className="text-xs">(Raça)</span> +
                  <NumberInput name="vitalidadeClasse1" />
                  <span className="text-xs">(Classe1)</span> +
                  <NumberInput name="vitalidadeClasse2" />
                  <span className="text-xs">(Classe2)</span> +
                  <NumberInput name="vitalidadePer1" />
                  <span className="text-xs">(Per1)</span> +
                  <NumberInput name="vitalidadePer2" />
                  <span className="text-xs">(Per2)</span> +
                  <NumberInput name="vitalidadeSab1" />
                  <span className="text-xs">(Sab1)</span> +
                  <NumberInput name="vitalidadeSab2" />
                  <span className="text-xs">(Sab2)</span> +
                  <NumberInput name="vitalidadeOutros" />
                  <span className="text-xs">(Outros)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-semibold">Reg. Vit:</span>
                <NumberInput name="regVitAtual" /> / <NumberInput name="regVitTotal" />
              </div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span>= 3 +</span>
                <div className="flex flex-wrap items-center gap-1">
                  <NumberInput name="regVitRaca" />
                  <span className="text-xs">(Raça)</span> +
                  <NumberInput name="regVitClasse1" />
                  <span className="text-xs">(Classe1)</span> +
                  <NumberInput name="regVitClasse2" />
                  <span className="text-xs">(Classe2)</span> +
                  <NumberInput name="regVitPer1" />
                  <span className="text-xs">(Per1)</span> +
                  <NumberInput name="regVitSab1" />
                  <span className="text-xs">(Sab1)</span> +
                  <NumberInput name="regVitSab2" />
                  <span className="text-xs">(Sab2)</span> +
                  <NumberInput name="regVitOutros" />
                  <span className="text-xs">(Outros)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-semibold">Estamina:</span>
                <NumberInput name="estaminaAtual" /> / <NumberInput name="estaminaTotal" />
              </div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span>= 2 +</span>
                <div className="flex flex-wrap items-center gap-1">
                  <NumberInput name="estaminaRaca" />
                  <span className="text-xs">(Raça)</span> +
                  <NumberInput name="estaminaClasse1" />
                  <span className="text-xs">(Classe1)</span> +
                  <NumberInput name="estaminaClasse2" />
                  <span className="text-xs">(Classe2)</span> +
                  <NumberInput name="estaminaSab1" />
                  <span className="text-xs">(Sab1)</span> +
                  <NumberInput name="estaminaOutros" />
                  <span className="text-xs">(Outros)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-semibold">Reg. Est:</span>
                <NumberInput name="regEstAtual" /> / <NumberInput name="regEstTotal" />
              </div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span>= 1 +</span>
                <div className="flex flex-wrap items-center gap-1">
                  <NumberInput name="regEstRaca" />
                  <span className="text-xs">(Raça)</span> +
                  <NumberInput name="regEstClasse1" />
                  <span className="text-xs">(Classe1)</span> +
                  <NumberInput name="regEstClasse2" />
                  <span className="text-xs">(Classe2)</span> +
                  <NumberInput name="regEstSab1" />
                  <span className="text-xs">(Sab1)</span> +
                  <NumberInput name="regEstOutros" />
                  <span className="text-xs">(Outros)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-semibold">Mana:</span>
                <NumberInput name="manaAtual" /> / <NumberInput name="manaTotal" />
              </div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span>= 4 +</span>
                <div className="flex flex-wrap items-center gap-1">
                  <NumberInput name="manaRaca" />
                  <span className="text-xs">(Raça)</span> +
                  <NumberInput name="manaClasse1" />
                  <span className="text-xs">(Classe1)</span> +
                  <NumberInput name="manaClasse2" />
                  <span className="text-xs">(Classe2)</span> +
                  <NumberInput name="manaInt1" />
                  <span className="text-xs">(Int1)</span> +
                  <NumberInput name="manaOutros" />
                  <span className="text-xs">(Outros)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-semibold">Reg. Man:</span>
                <NumberInput name="regManAtual" /> / <NumberInput name="regManTotal" />
              </div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span>= 2 +</span>
                <div className="flex flex-wrap items-center gap-1">
                  <NumberInput name="regManRaca" />
                  <span className="text-xs">(Raça)</span> +
                  <NumberInput name="regManClasse1" />
                  <span className="text-xs">(Classe1)</span> +
                  <NumberInput name="regManClasse2" />
                  <span className="text-xs">(Classe2)</span> +
                  <NumberInput name="regManInt1" />
                  <span className="text-xs">(Int1)</span> +
                  <NumberInput name="regManOutros" />
                  <span className="text-xs">(Outros)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Defesas */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Defesas</h2>

          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-semibold">Fortitude:</span>
                <NumberInput name="fortitudeAtual" />
                (<NumberInput name="fortitudeBon" /> / [-
                <NumberInput name="fortitudePen" />
                ]) / <NumberInput name="fortitudeTotal" />
              </div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span>= 1 +</span>
                <div className="flex flex-wrap items-center gap-1">
                  <NumberInput name="fortitudeRaca" />
                  <span className="text-xs">(Raça)</span> +
                  <NumberInput name="fortitudeClasse1" />
                  <span className="text-xs">(Classe1)</span> +
                  <NumberInput name="fortitudeClasse2" />
                  <span className="text-xs">(Classe2)</span> +
                  <NumberInput name="fortitudeSab1" />
                  <span className="text-xs">(Sab1)</span> +
                  <NumberInput name="fortitudeOutros" />
                  <span className="text-xs">(Outros)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-semibold">Vontade:</span>
                <NumberInput name="vontadeAtual" />
                (<NumberInput name="vontadeBon" /> / [-
                <NumberInput name="vontadePen" />
                ]) / <NumberInput name="vontadeTotal" />
              </div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span>= 1 +</span>
                <div className="flex flex-wrap items-center gap-1">
                  <NumberInput name="vontadeRaca" />
                  <span className="text-xs">(Raça)</span> +
                  <NumberInput name="vontadeClasse1" />
                  <span className="text-xs">(Classe1)</span> +
                  <NumberInput name="vontadeClasse2" />
                  <span className="text-xs">(Classe2)</span> +
                  <NumberInput name="vontadeSab1" />
                  <span className="text-xs">(Sab1)</span> +
                  <NumberInput name="vontadeInt1" />
                  <span className="text-xs">(Int1)</span> +
                  <NumberInput name="vontadeOutros" />
                  <span className="text-xs">(Outros)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-semibold">Reflexos:</span>
                <NumberInput name="reflexosAtual" />
                (<NumberInput name="reflexosBon" /> / [-
                <NumberInput name="reflexosPen" />
                ]) / <NumberInput name="reflexosTotal" />
              </div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span>= 1 +</span>
                <div className="flex flex-wrap items-center gap-1">
                  <NumberInput name="reflexosRaca" />
                  <span className="text-xs">(Raça)</span> +
                  <NumberInput name="reflexosClasse1" />
                  <span className="text-xs">(Classe1)</span> +
                  <NumberInput name="reflexosClasse2" />
                  <span className="text-xs">(Classe2)</span> +
                  <NumberInput name="reflexosPer1" />
                  <span className="text-xs">(Per1)</span> +
                  <NumberInput name="reflexosInt1" />
                  <span className="text-xs">(Int1)</span> +
                  <NumberInput name="reflexosOutros" />
                  <span className="text-xs">(Outros)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-semibold">Fragilidade:</span>
                <NumberInput name="fragilidadeAtual" />
                (<NumberInput name="fragilidadeBon" /> / [-
                <NumberInput name="fragilidadePen" />
                ]) / <NumberInput name="fragilidadeTotal" />
              </div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span>= 1 +</span>
                <div className="flex flex-wrap items-center gap-1">
                  <NumberInput name="fragilidadeRaca" />
                  <span className="text-xs">(Raça)</span> +
                  <NumberInput name="fragilidadeClasse1" />
                  <span className="text-xs">(Classe1)</span> +
                  <NumberInput name="fragilidadeClasse2" />
                  <span className="text-xs">(Classe2)</span> +
                  <NumberInput name="fragilidadePer1" />
                  <span className="text-xs">(Per1)</span> +
                  <NumberInput name="fragilidadePer2" />
                  <span className="text-xs">(Per2)</span> +
                  <NumberInput name="fragilidadeInt1" />
                  <span className="text-xs">(Int1)</span> +
                  <NumberInput name="fragilidadeInt2" />
                  <span className="text-xs">(Int2)</span> +
                  <NumberInput name="fragilidadeSab1" />
                  <span className="text-xs">(Sab1)</span> +
                  <NumberInput name="fragilidadeOutros" />
                  <span className="text-xs">(Outros)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atributos */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Atributos (EXP X7)</h2>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-1">
              <span className="w-24 font-semibold">Força:</span>
              <NumberInput name="forcaAtual" /> / <NumberInput name="forcaExpGastos" />
              <span className="text-xs">(Valor / Exp gastos)</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="w-24 font-semibold">Constituição:</span>
              <NumberInput name="constituicaoAtual" /> / <NumberInput name="constituicaoExpGastos" />
              <span className="text-xs">(Valor / Exp gastos)</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="w-24 font-semibold">Destreza:</span>
              <NumberInput name="destrezaAtual" /> / <NumberInput name="destrezaExpGastos" />
              <span className="text-xs">(Valor / Exp gastos)</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="w-24 font-semibold">Percepção:</span>
              <NumberInput name="percepcaoAtual" /> / <NumberInput name="percepcaoExpGastos" />
              <span className="text-xs">(Valor / Exp gastos)</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="w-24 font-semibold">Inteligência:</span>
              <NumberInput name="inteligenciaAtual" /> / <NumberInput name="inteligenciaExpGastos" />
              <span className="text-xs">(Valor / Exp gastos)</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="w-24 font-semibold">Sabedoria:</span>
              <NumberInput name="sabedoriaAtual" /> / <NumberInput name="sabedoriaExpGastos" />
              <span className="text-xs">(Valor / Exp gastos)</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="w-24 font-semibold">Carisma:</span>
              <NumberInput name="carismaAtual" /> / <NumberInput name="carismaExpGastos" />
              <span className="text-xs">(Valor / Exp gastos)</span>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => console.log(stats)}
          >
            Salvar Ficha
          </button>
        </div>
      </Card>
    </div>
  )
}

