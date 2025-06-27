"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { StatRow } from "./stats/stat-row";
import { DefenseRow } from "./defenses/defense-row";
import { AttributeRow } from "./attributes/attribute-row";
import { StatInput } from "./stats/stat-input";
import SkillsSheet from "./skills/skills-sheet";
import { initialBasicStats, initialStats } from "@/constants/initial-state";
import { useGetAttributes, useGetDefenses } from "@/hooks";
import EditableTitle from "./misc/editable-title";
import CodeRedemption from "./misc/code-redemption";
import { isBasicStat } from "@/utils/stats";
import { Button } from "../ui/button";
import { Copy, Printer, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import { FloatingBox } from "../ui/floating-box";

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

  // Fetch data from database
  const { data: attributesModifiers, isLoading: loadingAttributes } =
    useGetAttributes();
  const { data: defensesModifiers, isLoading: loadingDefenses } =
    useGetDefenses();

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

  // Show loading state while fetching data
  if (loadingAttributes || loadingDefenses) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Carregando configurações...</p>
        </div>
      </div>
    );
  }

  // Show error state if data is not available
  if (!attributesModifiers || !defensesModifiers) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500">Erro ao carregar configurações</p>
          <Button onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

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
        <FloatingBox title="Atributos (EXP X5)" titleClassName="text-xl">
          <section>
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
        </FloatingBox>

        {/* Perícias */}
        <FloatingBox title="Perícias (EXP X1)" titleClassName="text-xl">
          <SkillsSheet
            skills={skills}
            setSkills={setSkills}
            stats={{
              ...basicStats,
              ...stats,
            }}
            setStats={setStats}
          />
        </FloatingBox>

        {/* Existência e Defesas */}
        <div className="flex gap-8">
          {/* Existência */}
          <FloatingBox title="Existência" titleClassName="text-xl">
            <div className="space-y-4">
              <StatRow
                title="Vitalidade"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="vitalidadeAtual"
                totalName="vitalidadeTotal"
                baseValue={attributesModifiers.vitalidade?.base || 0}
                modifiers={attributesModifiers.vitalidade?.modifiers || []}
              />

              <StatRow
                title="Reg. Vit"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="regVitAtual"
                totalName="regVitTotal"
                baseValue={attributesModifiers.regeneracaoVitalidade?.base || 0}
                modifiers={
                  attributesModifiers.regeneracaoVitalidade?.modifiers || []
                }
              />

              <StatRow
                title="Estamina"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="estaminaAtual"
                totalName="estaminaTotal"
                baseValue={attributesModifiers.estamina?.base || 0}
                modifiers={attributesModifiers.estamina?.modifiers || []}
              />

              <StatRow
                title="Reg. Est"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="regEstAtual"
                totalName="regEstTotal"
                baseValue={attributesModifiers.regeneracaoEstamina?.base || 0}
                modifiers={
                  attributesModifiers.regeneracaoEstamina?.modifiers || []
                }
              />

              <StatRow
                title="Mana"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="manaAtual"
                totalName="manaTotal"
                baseValue={attributesModifiers.mana?.base || 0}
                modifiers={attributesModifiers.mana?.modifiers || []}
              />

              <StatRow
                title="Reg. Man"
                basicStats={basicStats}
                stats={stats}
                setStats={setStats}
                onChange={handleChange}
                currentName="regManAtual"
                totalName="regManTotal"
                baseValue={attributesModifiers.regeneracaoMana?.base || 0}
                modifiers={attributesModifiers.regeneracaoMana?.modifiers || []}
              />
            </div>
          </FloatingBox>

          {/* Defesas */}
          <FloatingBox title="Defesas" titleClassName="text-xl">
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
                baseValue={defensesModifiers.fortitude?.base || 0}
                modifiers={defensesModifiers.fortitude?.modifiers || []}
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
                baseValue={defensesModifiers.vontade?.base || 0}
                modifiers={defensesModifiers.vontade?.modifiers || []}
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
                baseValue={defensesModifiers.reflexos?.base || 0}
                modifiers={defensesModifiers.reflexos?.modifiers || []}
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
                baseValue={defensesModifiers.fragilidade?.base || 0}
                modifiers={defensesModifiers.fragilidade?.modifiers || []}
              />
            </div>
          </FloatingBox>
        </div>
      </Card>
    </div>
  );
}
