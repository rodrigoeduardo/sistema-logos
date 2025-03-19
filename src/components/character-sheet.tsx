"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { StatRow } from "./stat-row";
import { DefenseRow } from "./defense-row";
import { AttributeRow } from "./attribute-row";
import { StatInput } from "./stat-input";

export default function CharacterSheet() {
  // Initialize state for all form fields
  const [stats, setStats] = useState<{ [P: string]: number }>({
    expGastos: 0,
    expTotais: 0,
    // Existência
    vitalidadeAtual: 0,
    vitalidadeTotal: 0,
    vitalidadeRaca: 0,
    vitalidadeClasse1: 0,
    vitalidadeClasse2: 0,
    vitalidadePer1: 0,
    vitalidadePer2: 0,
    vitalidadeSab1: 0,
    vitalidadeSab2: 0,
    vitalidadeOutros: 0,

    regVitAtual: 0,
    regVitTotal: 0,
    regVitRaca: 0,
    regVitClasse1: 0,
    regVitClasse2: 0,
    regVitPer1: 0,
    regVitSab1: 0,
    regVitSab2: 0,
    regVitOutros: 0,

    estaminaAtual: 0,
    estaminaTotal: 0,
    estaminaRaca: 0,
    estaminaClasse1: 0,
    estaminaClasse2: 0,
    estaminaSab1: 0,
    estaminaOutros: 0,

    regEstAtual: 0,
    regEstTotal: 0,
    regEstRaca: 0,
    regEstClasse1: 0,
    regEstClasse2: 0,
    regEstSab1: 0,
    regEstOutros: 0,

    manaAtual: 0,
    manaTotal: 0,
    manaRaca: 0,
    manaClasse1: 0,
    manaClasse2: 0,
    manaInt1: 0,
    manaOutros: 0,

    regManAtual: 0,
    regManTotal: 0,
    regManRaca: 0,
    regManClasse1: 0,
    regManClasse2: 0,
    regManInt1: 0,
    regManOutros: 0,

    // Defesas
    fortitudeAtual: 0,
    fortitudeBon: 0,
    fortitudePen: 0,
    fortitudeTotal: 0,
    fortitudeRaca: 0,
    fortitudeClasse1: 0,
    fortitudeClasse2: 0,
    fortitudeSab1: 0,
    fortitudeOutros: 0,

    vontadeAtual: 0,
    vontadeBon: 0,
    vontadePen: 0,
    vontadeTotal: 0,
    vontadeRaca: 0,
    vontadeClasse1: 0,
    vontadeClasse2: 0,
    vontadeSab1: 0,
    vontadeInt1: 0,
    vontadeOutros: 0,

    reflexosAtual: 0,
    reflexosBon: 0,
    reflexosPen: 0,
    reflexosTotal: 0,
    reflexosRaca: 0,
    reflexosClasse1: 0,
    reflexosClasse2: 0,
    reflexosPer1: 0,
    reflexosInt1: 0,
    reflexosOutros: 0,

    fragilidadeAtual: 0,
    fragilidadeBon: 0,
    fragilidadePen: 0,
    fragilidadeTotal: 0,
    fragilidadeRaca: 0,
    fragilidadeClasse1: 0,
    fragilidadeClasse2: 0,
    fragilidadePer1: 0,
    fragilidadePer2: 0,
    fragilidadeInt1: 0,
    fragilidadeInt2: 0,
    fragilidadeSab1: 0,
    fragilidadeOutros: 0,

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
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const intValue = Number.parseInt(value);

    if (
      name === "forcaAtual" ||
      name === "constituicaoAtual" ||
      name === "destrezaAtual" ||
      name === "percepcaoAtual" ||
      name === "inteligenciaAtual" ||
      name === "sabedoriaAtual" ||
      name === "carismaAtual"
    ) {
      const expName = `${name.replace("Atual", "ExpGastos")}`;
      const prevExpValue = stats[expName];
      const expLeft = stats["expTotais"] - stats["expGastos"] + prevExpValue;
      const expCost = ((intValue * (intValue + 1)) / 2) * 7;

      if (expCost > expLeft) {
        alert(
          "Você não possui experiência suficiente para comprar este atributo"
        );
        return;
      }

      setStats((prev) => ({
        ...prev,
        [expName]: expCost,
      }));
    }

    setStats((prev) => ({
      ...prev,
      [name]: intValue ?? 0,
    }));
  };

  useEffect(() => {
    const attributes = [
      stats.forcaExpGastos,
      stats.constituicaoExpGastos,
      stats.destrezaExpGastos,
      stats.percepcaoExpGastos,
      stats.inteligenciaExpGastos,
      stats.sabedoriaExpGastos,
      stats.carismaExpGastos,
    ];

    setStats((prev) => ({
      ...prev,
      expGastos: attributes.reduce((acc, cur) => acc + cur, 0),
    }));
  }, [
    stats.forcaExpGastos,
    stats.constituicaoExpGastos,
    stats.destrezaExpGastos,
    stats.percepcaoExpGastos,
    stats.inteligenciaExpGastos,
    stats.sabedoriaExpGastos,
    stats.carismaExpGastos,
  ]);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white">
      <Card className="p-6 space-y-8">
        <h1 className="text-2xl font-bold" onClick={() => console.log(stats)}>
          Ficha de Personagem
        </h1>

        {/* EXP Total */}
        <div className="flex items-center gap-2">
          <span className="font-semibold min-w-24">Experiência:</span>
          <div className="flex items-center gap-1">
            <StatInput
              name="expGastos"
              value={stats["expGastos"]}
              onChange={handleChange}
              label="Exp gastos"
            />
            <span>/</span>
            <StatInput
              name={"expTotais"}
              value={stats["expTotais"]}
              onChange={handleChange}
              label="Exp totais"
            />
          </div>
        </div>

        {/* Atributos */}
        <section>
          <h2 className="text-xl font-bold mb-4">Atributos (EXP X7)</h2>

          <div className="space-y-4">
            <AttributeRow
              title="Força"
              stats={stats}
              onChange={handleChange}
              currentName="forcaAtual"
              expName="forcaExpGastos"
            />

            <AttributeRow
              title="Constituição"
              stats={stats}
              onChange={handleChange}
              currentName="constituicaoAtual"
              expName="constituicaoExpGastos"
            />

            <AttributeRow
              title="Destreza"
              stats={stats}
              onChange={handleChange}
              currentName="destrezaAtual"
              expName="destrezaExpGastos"
            />

            <AttributeRow
              title="Percepção"
              stats={stats}
              onChange={handleChange}
              currentName="percepcaoAtual"
              expName="percepcaoExpGastos"
            />

            <AttributeRow
              title="Inteligência"
              stats={stats}
              onChange={handleChange}
              currentName="inteligenciaAtual"
              expName="inteligenciaExpGastos"
            />

            <AttributeRow
              title="Sabedoria"
              stats={stats}
              onChange={handleChange}
              currentName="sabedoriaAtual"
              expName="sabedoriaExpGastos"
            />

            <AttributeRow
              title="Carisma"
              stats={stats}
              onChange={handleChange}
              currentName="carismaAtual"
              expName="carismaExpGastos"
            />
          </div>
        </section>

        {/* Existência */}
        <section>
          <h2 className="text-xl font-bold mb-4">Existência</h2>

          <div className="space-y-4">
            <StatRow
              title="Vitalidade"
              baseValue={6}
              stats={stats}
              onChange={handleChange}
              currentName="vitalidadeAtual"
              totalName="vitalidadeTotal"
              modifiers={[
                { name: "vitalidadeRaca", label: "Raça" },
                { name: "vitalidadeClasse1", label: "Classe1" },
                { name: "vitalidadeClasse2", label: "Classe2" },
                { name: "vitalidadePer1", label: "Per1" },
                { name: "vitalidadePer2", label: "Per2" },
                { name: "vitalidadeSab1", label: "Sab1" },
                { name: "vitalidadeSab2", label: "Sab2" },
                { name: "vitalidadeOutros", label: "Outros" },
              ]}
            />

            <StatRow
              title="Reg. Vit"
              baseValue={3}
              stats={stats}
              onChange={handleChange}
              currentName="regVitAtual"
              totalName="regVitTotal"
              modifiers={[
                { name: "regVitRaca", label: "Raça" },
                { name: "regVitClasse1", label: "Classe1" },
                { name: "regVitClasse2", label: "Classe2" },
                { name: "regVitPer1", label: "Per1" },
                { name: "regVitSab1", label: "Sab1" },
                { name: "regVitSab2", label: "Sab2" },
                { name: "regVitOutros", label: "Outros" },
              ]}
            />

            <StatRow
              title="Estamina"
              baseValue={2}
              stats={stats}
              onChange={handleChange}
              currentName="estaminaAtual"
              totalName="estaminaTotal"
              modifiers={[
                { name: "estaminaRaca", label: "Raça" },
                { name: "estaminaClasse1", label: "Classe1" },
                { name: "estaminaClasse2", label: "Classe2" },
                { name: "estaminaSab1", label: "Sab1" },
                { name: "estaminaOutros", label: "Outros" },
              ]}
            />

            <StatRow
              title="Reg. Est"
              baseValue={1}
              stats={stats}
              onChange={handleChange}
              currentName="regEstAtual"
              totalName="regEstTotal"
              modifiers={[
                { name: "regEstRaca", label: "Raça" },
                { name: "regEstClasse1", label: "Classe1" },
                { name: "regEstClasse2", label: "Classe2" },
                { name: "regEstSab1", label: "Sab1" },
                { name: "regEstOutros", label: "Outros" },
              ]}
            />

            <StatRow
              title="Mana"
              baseValue={4}
              stats={stats}
              onChange={handleChange}
              currentName="manaAtual"
              totalName="manaTotal"
              modifiers={[
                { name: "manaRaca", label: "Raça" },
                { name: "manaClasse1", label: "Classe1" },
                { name: "manaClasse2", label: "Classe2" },
                { name: "manaInt1", label: "Int1" },
                { name: "manaOutros", label: "Outros" },
              ]}
            />

            <StatRow
              title="Reg. Man"
              baseValue={2}
              stats={stats}
              onChange={handleChange}
              currentName="regManAtual"
              totalName="regManTotal"
              modifiers={[
                { name: "regManRaca", label: "Raça" },
                { name: "regManClasse1", label: "Classe1" },
                { name: "regManClasse2", label: "Classe2" },
                { name: "regManInt1", label: "Int1" },
                { name: "regManOutros", label: "Outros" },
              ]}
            />
          </div>
        </section>

        {/* Defesas */}
        <section>
          <h2 className="text-xl font-bold mb-4">Defesas</h2>

          <div className="space-y-4">
            <DefenseRow
              title="Fortitude"
              baseValue={1}
              stats={stats}
              onChange={handleChange}
              currentName="fortitudeAtual"
              bonusName="fortitudeBon"
              penaltyName="fortitudePen"
              totalName="fortitudeTotal"
              modifiers={[
                { name: "fortitudeRaca", label: "Raça" },
                { name: "fortitudeClasse1", label: "Classe1" },
                { name: "fortitudeClasse2", label: "Classe2" },
                { name: "fortitudeSab1", label: "Sab1" },
                { name: "fortitudeOutros", label: "Outros" },
              ]}
            />

            <DefenseRow
              title="Vontade"
              baseValue={1}
              stats={stats}
              onChange={handleChange}
              currentName="vontadeAtual"
              bonusName="vontadeBon"
              penaltyName="vontadePen"
              totalName="vontadeTotal"
              modifiers={[
                { name: "vontadeRaca", label: "Raça" },
                { name: "vontadeClasse1", label: "Classe1" },
                { name: "vontadeClasse2", label: "Classe2" },
                { name: "vontadeSab1", label: "Sab1" },
                { name: "vontadeInt1", label: "Int1" },
                { name: "vontadeOutros", label: "Outros" },
              ]}
            />

            <DefenseRow
              title="Reflexos"
              baseValue={1}
              stats={stats}
              onChange={handleChange}
              currentName="reflexosAtual"
              bonusName="reflexosBon"
              penaltyName="reflexosPen"
              totalName="reflexosTotal"
              modifiers={[
                { name: "reflexosRaca", label: "Raça" },
                { name: "reflexosClasse1", label: "Classe1" },
                { name: "reflexosClasse2", label: "Classe2" },
                { name: "reflexosPer1", label: "Per1" },
                { name: "reflexosInt1", label: "Int1" },
                { name: "reflexosOutros", label: "Outros" },
              ]}
            />

            <DefenseRow
              title="Fragilidade"
              baseValue={1}
              stats={stats}
              onChange={handleChange}
              currentName="fragilidadeAtual"
              bonusName="fragilidadeBon"
              penaltyName="fragilidadePen"
              totalName="fragilidadeTotal"
              modifiers={[
                { name: "fragilidadeRaca", label: "Raça" },
                { name: "fragilidadeClasse1", label: "Classe1" },
                { name: "fragilidadeClasse2", label: "Classe2" },
                { name: "fragilidadePer1", label: "Per1" },
                { name: "fragilidadePer2", label: "Per2" },
                { name: "fragilidadeInt1", label: "Int1" },
                { name: "fragilidadeInt2", label: "Int2" },
                { name: "fragilidadeSab1", label: "Sab1" },
                { name: "fragilidadeOutros", label: "Outros" },
              ]}
            />
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 cursor-pointer"
            onClick={() => {
              console.log(stats);
              window.print();
            }}
          >
            Salvar Ficha
          </button>
        </div>
      </Card>
    </div>
  );
}
