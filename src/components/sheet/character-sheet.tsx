"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { StatRow } from "./stats/stat-row";
import { DefenseRow } from "./defenses/defense-row";
import { AttributeRow } from "./attributes/attribute-row";
import { StatInput } from "./stats/stat-input";
import SkillsSheet from "./skills/skills-sheet";
import { initialBasicStats, initialStats } from "@/constants/initial-state";
import {
  ATTRIBUTES_MODIFIERS,
  DEFENSES_MODIFIERS,
} from "@/constants/attributes-and-defenses";
import EditableTitle from "./misc/editable-title";
import CodeRedemption from "./misc/code-redemption";
import { isBasicStat } from "@/utils/stats";
import { Button } from "../ui/button";
import { Copy, Printer } from "lucide-react";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";

export type SkillValues = {
  [key: string]: {
    valor: number;
    expGastos: number;
  };
};

const ATTRIBUTE_EXP_MULTIPLIER = 5;

export default function CharacterSheet() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const printSheet = useReactToPrint({
    contentRef: sheetRef,
  });

  const [title, setTitle] = useState("Ficha de Personagem");

  const [basicStats, setBasicStats] = useState<{ [P: string]: number }>(
    initialBasicStats
  );
  const [stats, setStats] = useState<{ [P: string]: number }>(initialStats);

  const [skills, setSkills] = useState<SkillValues>({});

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const intValue = Number.parseInt(value);

    if (name === "expTotais" || name === "expGastos") {
      setBasicStats((prev) => ({
        ...prev,
        [name]: intValue,
      }));

      return;
    } else if (isBasicStat(name)) {
      const expName = `${name.replace("Atual", "ExpGastos")}`;
      const prevExpValue = basicStats[expName];
      const expLeft =
        basicStats["expTotais"] - basicStats["expGastos"] + prevExpValue;
      const expCost =
        ((intValue * (intValue + 1)) / 2) * ATTRIBUTE_EXP_MULTIPLIER;

      if (expCost > expLeft) {
        alert(
          "Você não possui experiência suficiente para comprar este atributo"
        );
        return;
      }

      setBasicStats((prev) => ({
        ...prev,
        [name]: intValue,
        [expName]: expCost,
      }));

      return;
    } else if (name.includes("Custom")) {
      const statName = name.replace("Custom", "");

      setBasicStats((prev) => ({
        ...prev,
        [statName]: intValue,
      }));

      return;
    }

    setStats((prev) => ({
      ...prev,
      [name]: intValue ?? 0,
    }));
  };

  useEffect(() => {
    const attributes = [
      basicStats.forcaExpGastos,
      basicStats.constituicaoExpGastos,
      basicStats.destrezaExpGastos,
      basicStats.percepcaoExpGastos,
      basicStats.inteligenciaExpGastos,
      basicStats.sabedoriaExpGastos,
      basicStats.carismaExpGastos,
    ];

    const attributesXp = attributes.reduce((acc, cur) => acc + cur, 0);
    const skillsXp = Object.values(skills).reduce(
      (acc, cur) => acc + cur.expGastos,
      0
    );

    setBasicStats((prev) => ({
      ...prev,
      expGastos: attributesXp + skillsXp,
    }));
  }, [
    skills,
    basicStats.forcaExpGastos,
    basicStats.constituicaoExpGastos,
    basicStats.destrezaExpGastos,
    basicStats.percepcaoExpGastos,
    basicStats.inteligenciaExpGastos,
    basicStats.sabedoriaExpGastos,
    basicStats.carismaExpGastos,
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      JSON.stringify({
        title,
        basicStats,
        stats,
        skills,
        notes:
          (document.getElementById("notes") as HTMLTextAreaElement)?.value ??
          "",
      })
    );

    toast.success("Código da ficha copiado para a área de transferência");
  };

  return (
    <div className="w-screen bg-white" ref={sheetRef}>
      <Card className="p-6">
        <div className="flex gap-2">
          <EditableTitle title={title} setTitle={setTitle} />

          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">EXP:</span>
            <div className="flex items-center gap-1">
              <StatInput
                name="expGastos"
                value={basicStats["expGastos"]}
                onChange={handleChange}
                label="Exp gastos"
                readOnly
              />
              <span>/</span>
              <StatInput
                name={"expTotais"}
                value={basicStats["expTotais"]}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-2 print:hidden">
            <Button variant="outline" size="icon" onClick={() => printSheet()}>
              <Printer />
            </Button>

            <Button variant="outline" size="icon" onClick={handleCopy}>
              <Copy />
            </Button>

            <CodeRedemption
              setSkills={setSkills}
              setBasicStats={setBasicStats}
              setStats={setStats}
              setTitle={setTitle}
            />
          </div>
        </div>

        {/* Atributos */}
        <section>
          <h2 className="text-xl font-bold mb-4">Atributos (EXP X5)</h2>

          <div className="grid grid-cols-4 gap-2">
            <AttributeRow
              title="Força"
              basicStats={basicStats}
              onChange={handleChange}
              currentName="forcaAtual"
              expName="forcaExpGastos"
            />

            <AttributeRow
              title="Constituição"
              basicStats={basicStats}
              onChange={handleChange}
              currentName="constituicaoAtual"
              expName="constituicaoExpGastos"
            />

            <AttributeRow
              title="Destreza"
              basicStats={basicStats}
              onChange={handleChange}
              currentName="destrezaAtual"
              expName="destrezaExpGastos"
            />

            <AttributeRow
              title="Percepção"
              basicStats={basicStats}
              onChange={handleChange}
              currentName="percepcaoAtual"
              expName="percepcaoExpGastos"
            />

            <AttributeRow
              title="Inteligência"
              basicStats={basicStats}
              onChange={handleChange}
              currentName="inteligenciaAtual"
              expName="inteligenciaExpGastos"
            />

            <AttributeRow
              title="Sabedoria"
              basicStats={basicStats}
              onChange={handleChange}
              currentName="sabedoriaAtual"
              expName="sabedoriaExpGastos"
            />

            <AttributeRow
              title="Carisma"
              basicStats={basicStats}
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
          stats={{
            ...basicStats,
            ...stats,
          }}
          setStats={setStats}
        />

        {/* Existência e Defesas */}
        <div className="flex gap-8">
          {/* Existência */}
          <section className="flex-1">
            <h2 className="text-xl font-bold mb-4">Existência</h2>

            <div className="space-y-4">
              <StatRow
                title="Vitalidade"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="vitalidadeAtual"
                totalName="vitalidadeTotal"
                baseValue={ATTRIBUTES_MODIFIERS.vitalidade.base}
                modifiers={ATTRIBUTES_MODIFIERS.vitalidade.modifiers}
              />

              <StatRow
                title="Reg. Vit"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="regVitAtual"
                totalName="regVitTotal"
                baseValue={ATTRIBUTES_MODIFIERS.regeneracaoVitalidade.base}
                modifiers={ATTRIBUTES_MODIFIERS.regeneracaoVitalidade.modifiers}
              />

              <StatRow
                title="Estamina"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="estaminaAtual"
                totalName="estaminaTotal"
                baseValue={ATTRIBUTES_MODIFIERS.estamina.base}
                modifiers={ATTRIBUTES_MODIFIERS.estamina.modifiers}
              />

              <StatRow
                title="Reg. Est"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="regEstAtual"
                totalName="regEstTotal"
                baseValue={ATTRIBUTES_MODIFIERS.regeneracaoEstamina.base}
                modifiers={ATTRIBUTES_MODIFIERS.regeneracaoEstamina.modifiers}
              />

              <StatRow
                title="Mana"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="manaAtual"
                totalName="manaTotal"
                baseValue={ATTRIBUTES_MODIFIERS.mana.base}
                modifiers={ATTRIBUTES_MODIFIERS.mana.modifiers}
              />

              <StatRow
                title="Reg. Man"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="regManAtual"
                totalName="regManTotal"
                baseValue={ATTRIBUTES_MODIFIERS.regeneracaoMana.base}
                modifiers={ATTRIBUTES_MODIFIERS.regeneracaoMana.modifiers}
              />
            </div>
          </section>

          {/* Defesas */}
          <section className="flex-1">
            <h2 className="text-xl font-bold mb-4">Defesas</h2>

            <div className="space-y-4">
              <DefenseRow
                title="Fortitude"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
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
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
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
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
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
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
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
        </div>
      </Card>
    </div>
  );
}
