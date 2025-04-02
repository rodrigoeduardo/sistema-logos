"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { StatRow } from "./stat-row";
import { DefenseRow } from "./defense-row";
import { AttributeRow } from "./attribute-row";
import { StatInput } from "./stat-input";
import SkillsSheet from "./skills-sheet";
import { initialStats } from "@/constants/initial-state";
import {
  ATTRIBUTES_MODIFIERS,
  DEFENSES_MODIFIERS,
} from "@/constants/attributes-and-defenses";
import EditableTitle from "./editable-title";
import CodeRedemption from "./code-redemption";

export type SkillValues = {
  [key: string]: {
    valor: number;
    expGastos: number;
  };
};

const ATTRIBUTE_EXP_MULTIPLIER = 5;

export default function CharacterSheet() {
  const [title, setTitle] = useState("Ficha de Personagem");

  const [stats, setStats] = useState<{ [P: string]: number }>(initialStats);

  const [skills, setSkills] = useState<SkillValues>({});

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
      const expCost =
        ((intValue * (intValue + 1)) / 2) * ATTRIBUTE_EXP_MULTIPLIER;

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

    const attributesXp = attributes.reduce((acc, cur) => acc + cur, 0);
    const skillsXp = Object.values(skills).reduce(
      (acc, cur) => acc + cur.expGastos,
      0
    );

    setStats((prev) => ({
      ...prev,
      expGastos: attributesXp + skillsXp,
    }));
  }, [
    stats.forcaExpGastos,
    stats.constituicaoExpGastos,
    stats.destrezaExpGastos,
    stats.percepcaoExpGastos,
    stats.inteligenciaExpGastos,
    stats.sabedoriaExpGastos,
    stats.carismaExpGastos,
    skills,
  ]);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white">
      <Card className="p-6 space-y-8">
        <div className="flex gap-4">
          <EditableTitle title={title} setTitle={setTitle} />

          <CodeRedemption
            setSkills={setSkills}
            setStats={setStats}
            setTitle={setTitle}
          />
        </div>

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
          <h2 className="text-xl font-bold mb-4">Atributos (EXP X5)</h2>

          <div className="flex flex-wrap gap-8">
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

        {/* Perícias */}
        <SkillsSheet
          skills={skills}
          setSkills={setSkills}
          stats={stats}
          setStats={setStats}
        />

        {/* Existência */}
        <section>
          <h2 className="text-xl font-bold mb-4">Existência</h2>

          <div className="space-y-4">
            <StatRow
              title="Vitalidade"
              stats={stats}
              onChange={handleChange}
              currentName="vitalidadeAtual"
              totalName="vitalidadeTotal"
              baseValue={ATTRIBUTES_MODIFIERS.vitalidade.base}
              modifiers={ATTRIBUTES_MODIFIERS.vitalidade.modifiers}
            />

            <StatRow
              title="Reg. Vit"
              stats={stats}
              onChange={handleChange}
              currentName="regVitAtual"
              totalName="regVitTotal"
              baseValue={ATTRIBUTES_MODIFIERS.regeneracaoVitalidade.base}
              modifiers={ATTRIBUTES_MODIFIERS.regeneracaoVitalidade.modifiers}
            />

            <StatRow
              title="Estamina"
              stats={stats}
              onChange={handleChange}
              currentName="estaminaAtual"
              totalName="estaminaTotal"
              baseValue={ATTRIBUTES_MODIFIERS.estamina.base}
              modifiers={ATTRIBUTES_MODIFIERS.estamina.modifiers}
            />

            <StatRow
              title="Reg. Est"
              stats={stats}
              onChange={handleChange}
              currentName="regEstAtual"
              totalName="regEstTotal"
              baseValue={ATTRIBUTES_MODIFIERS.regeneracaoEstamina.base}
              modifiers={ATTRIBUTES_MODIFIERS.regeneracaoEstamina.modifiers}
            />

            <StatRow
              title="Mana"
              stats={stats}
              onChange={handleChange}
              currentName="manaAtual"
              totalName="manaTotal"
              baseValue={ATTRIBUTES_MODIFIERS.mana.base}
              modifiers={ATTRIBUTES_MODIFIERS.mana.modifiers}
            />

            <StatRow
              title="Reg. Man"
              stats={stats}
              onChange={handleChange}
              currentName="regManAtual"
              totalName="regManTotal"
              baseValue={ATTRIBUTES_MODIFIERS.regeneracaoMana.base}
              modifiers={ATTRIBUTES_MODIFIERS.regeneracaoMana.modifiers}
            />
          </div>
        </section>

        {/* Defesas */}
        <section>
          <h2 className="text-xl font-bold mb-4">Defesas</h2>

          <div className="space-y-4">
            <DefenseRow
              title="Fortitude"
              stats={stats}
              onChange={handleChange}
              currentName="fortitudeAtual"
              bonusName="fortitudeBon"
              penaltyName="fortitudePen"
              totalName="fortitudeTotal"
              baseValue={DEFENSES_MODIFIERS.fortitude.base}
              modifiers={DEFENSES_MODIFIERS.fortitude.modifiers}
            />

            <DefenseRow
              title="Vontade"
              stats={stats}
              onChange={handleChange}
              currentName="vontadeAtual"
              bonusName="vontadeBon"
              penaltyName="vontadePen"
              totalName="vontadeTotal"
              baseValue={DEFENSES_MODIFIERS.vontade.base}
              modifiers={DEFENSES_MODIFIERS.vontade.modifiers}
            />

            <DefenseRow
              title="Reflexos"
              stats={stats}
              onChange={handleChange}
              currentName="reflexosAtual"
              bonusName="reflexosBon"
              penaltyName="reflexosPen"
              totalName="reflexosTotal"
              baseValue={DEFENSES_MODIFIERS.reflexos.base}
              modifiers={DEFENSES_MODIFIERS.reflexos.modifiers}
            />

            <DefenseRow
              title="Fragilidade"
              stats={stats}
              onChange={handleChange}
              currentName="fragilidadeAtual"
              bonusName="fragilidadeBon"
              penaltyName="fragilidadePen"
              totalName="fragilidadeTotal"
              baseValue={DEFENSES_MODIFIERS.fragilidade.base}
              modifiers={DEFENSES_MODIFIERS.fragilidade.modifiers}
            />
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 cursor-pointer"
            onClick={() => {
              console.log(stats, skills);
              window.print();
            }}
          >
            Imprimir
          </button>

          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(
                JSON.stringify({ title, stats, skills })
              );
            }}
          >
            Copiar Código
          </button>
        </div>
      </Card>
    </div>
  );
}
