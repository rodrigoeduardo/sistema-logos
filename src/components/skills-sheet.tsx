"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Dice6 } from "lucide-react";
import { SkillValues } from "./character-sheet";
import {
  SIMPLE_SKILLS,
  COMPLEX_SKILLS_PREREQUISITES,
  COMPLEX_SKILLS_ATTRIBUTES,
  SimpleSkill,
} from "@/constants/skills";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEVEL_DICE } from "@/constants/dice-levels";
import { rollDice, RollResult } from "@/utils/rolls";
import { SkillRoll } from "./SkillRoll";

interface SkillsSheetProps {
  skills: SkillValues;
  setSkills: Dispatch<SetStateAction<SkillValues>>;
  stats: Record<string, number>;
  setStats: Dispatch<
    SetStateAction<{
      [P: string]: number;
    }>
  >;
}

const SKILL_EXP_MULTIPLIER = 1;

type AttributeName =
  | "Força"
  | "Destreza"
  | "Constituição"
  | "Percepção"
  | "Inteligência"
  | "Sabedoria"
  | "Carisma";

// Map of attribute names to their corresponding stats
const ATTRIBUTE_TO_STAT: Record<AttributeName, string> = {
  Força: "forcaAtual",
  Destreza: "destrezaAtual",
  Constituição: "constituicaoAtual",
  Percepção: "percepcaoAtual",
  Inteligência: "inteligenciaAtual",
  Sabedoria: "sabedoriaAtual",
  Carisma: "carismaAtual",
};

export default function SkillsSheet({
  skills,
  setSkills,
  stats,
}: SkillsSheetProps) {
  // State for the new skill form
  const [newSkill, setNewSkill] = useState<string>("");
  const [lastRollResult, setLastRollResult] = useState<RollResult | null>(null);

  // Handle rolling dice for a skill
  const handleRollSkill = (skill: string, value: number) => {
    let effectiveLevel = value;

    // For complex skills, add the attribute value
    if (!SIMPLE_SKILLS.includes(skill as SimpleSkill)) {
      const attribute = COMPLEX_SKILLS_ATTRIBUTES[skill];
      if (attribute) {
        const attributeStat = ATTRIBUTE_TO_STAT[attribute as AttributeName];
        if (attributeStat) {
          const attributeValue = stats[attributeStat] ?? 0;
          effectiveLevel += attributeValue;
        }
      }
    }

    const diceNotation = LEVEL_DICE[effectiveLevel];
    if (!diceNotation) {
      alert(
        `Nível ${effectiveLevel} não possui configuração de dados definida`
      );
      return;
    }

    rollDice(diceNotation, skill, value, stats, (result: RollResult) => {
      setLastRollResult(result);
      const attributeInfo = !SIMPLE_SKILLS.includes(skill as SimpleSkill)
        ? ` + ${COMPLEX_SKILLS_ATTRIBUTES[skill]} (${
            stats[
              ATTRIBUTE_TO_STAT[
                COMPLEX_SKILLS_ATTRIBUTES[skill] as AttributeName
              ]
            ] ?? 0
          })`
        : "";
      console.log(
        `Rolagem de ${skill} (Nível ${value}${attributeInfo} = ${effectiveLevel}) [${diceNotation.join(
          "+"
        )}]:`,
        result
      );
    });
  };

  // Calculate maximum allowed value for a complex skill based on prerequisites
  const getMaxComplexSkillValue = (skillName: string): number => {
    const prerequisites = COMPLEX_SKILLS_PREREQUISITES[skillName];
    if (!prerequisites) return 0;

    let maxValue = 0;
    for (const [simpleSkill, minValue] of Object.entries(prerequisites)) {
      const simpleSkillValue = skills[simpleSkill]?.valor ?? 0;
      if (simpleSkillValue < minValue) return 0;
      maxValue += simpleSkillValue;
    }
    return maxValue;
  };

  // Check if a skill can be added
  const canAddSkill = (skillName: string): boolean => {
    // Simple skills can always be added
    if (SIMPLE_SKILLS.includes(skillName as SimpleSkill)) return true;

    // Complex skills need at least 1 point in any prerequisite
    const prerequisites = COMPLEX_SKILLS_PREREQUISITES[skillName];
    if (!prerequisites) return false;

    // Check if any prerequisite has at least 1 point
    return Object.keys(prerequisites).some((simpleSkill) => {
      const simpleSkillValue = skills[simpleSkill]?.valor ?? 0;
      return simpleSkillValue >= 1;
    });
  };

  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill && !skills[newSkill] && canAddSkill(newSkill)) {
      setSkills({
        ...skills,
        [newSkill]: {
          valor: 0,
          expGastos: 0,
        },
      });

      // Reset form field
      setNewSkill("");
    }
  };

  // Handle updating an existing skill
  const handleUpdateSkill = (skill: string, value: string) => {
    if (value === "") return;

    const intValue = Number.parseInt(value);

    // For complex skills, check if the value is within allowed range
    if (COMPLEX_SKILLS_PREREQUISITES[skill]) {
      // Check if any prerequisite has at least 1 point
      const hasPrerequisite = Object.keys(
        COMPLEX_SKILLS_PREREQUISITES[skill]
      ).some((simpleSkill) => {
        const simpleSkillValue = skills[simpleSkill]?.valor ?? 0;
        return simpleSkillValue >= 1;
      });

      if (!hasPrerequisite) {
        alert(
          `Você precisa ter pelo menos 1 ponto em uma das perícias simples necessárias para ${skill}`
        );
        return;
      }

      // Allow at least level 1 if prerequisites are met
      if (intValue > 1) {
        alert(
          `Você só pode ter nível 1 em ${skill} até ter mais pontos nas perícias simples necessárias`
        );
        return;
      }
    }

    const skillObj = skills[skill];
    const prevExpValue = skillObj.expGastos;
    const expLeft = stats["expTotais"] - stats["expGastos"] + prevExpValue;
    const expCost = ((intValue * (intValue + 1)) / 2) * SKILL_EXP_MULTIPLIER;

    if (expCost > expLeft) {
      alert(
        "Você não possui experiência suficiente para comprar este nível de perícia"
      );
      return;
    }

    setSkills({
      ...skills,
      [skill]: {
        ...skills[skill],
        valor: Number(value),
        expGastos: expCost,
      },
    });
  };

  // Handle deleting a skill
  const handleDeleteSkill = (skillToDelete: string) => {
    // Don't allow deleting simple skills if they are prerequisites for any complex skills in use
    if (SIMPLE_SKILLS.includes(skillToDelete as SimpleSkill)) {
      for (const [complexSkill, prerequisites] of Object.entries(
        COMPLEX_SKILLS_PREREQUISITES
      )) {
        if (
          skills[complexSkill] &&
          prerequisites[skillToDelete as SimpleSkill]
        ) {
          alert(
            `Não é possível excluir ${skillToDelete} pois é pré-requisito para ${complexSkill}`
          );
          return;
        }
      }
    }

    // Create a copy of the current skills
    const updatedSkills = { ...skills };

    // Delete the specified skill
    delete updatedSkills[skillToDelete];

    // Update state with the new skills object
    setSkills(updatedSkills);
  };

  // Group skills by type
  const simpleSkills = Object.entries(skills).filter(([skill]) =>
    SIMPLE_SKILLS.includes(skill as SimpleSkill)
  );
  const complexSkills = Object.entries(skills).filter(
    ([skill]) => !SIMPLE_SKILLS.includes(skill as SimpleSkill)
  );

  // Get available skills (not already added)
  const availableSimpleSkills = SIMPLE_SKILLS.filter((skill) => !skills[skill]);
  const availableComplexSkills = Object.keys(
    COMPLEX_SKILLS_PREREQUISITES
  ).filter((skill) => !skills[skill] && canAddSkill(skill));

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Perícias (EXP X1)</h2>

      {lastRollResult && (
        <div className="mb-4 p-4 border rounded-lg bg-gray-50">
          <SkillRoll result={lastRollResult} />
        </div>
      )}

      <div className="flex flex-col gap-8">
        {/* Simple Skills */}
        <div>
          <h3 className="font-medium mb-4">Perícias Simples</h3>
          <div className="flex flex-col gap-4">
            {simpleSkills.length === 0 && (
              <span className="text-muted-foreground text-sm">
                Nenhuma perícia simples obtida.
              </span>
            )}
            {simpleSkills.map(([skill, values]) => (
              <div key={skill} className="flex items-center gap-2">
                <Label className="w-28 text-right">{skill}:</Label>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-16"
                    type="number"
                    value={values.valor}
                    onChange={(e) => handleUpdateSkill(skill, e.target.value)}
                  />
                  <span>/</span>
                  <Input
                    className="w-20"
                    type="number"
                    value={values.expGastos}
                    readOnly
                  />
                </div>
                <div className="flex flex-col text-xs text-muted-foreground">
                  <span>Valor</span>
                  <span>Exp gastos</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                  onClick={() => handleDeleteSkill(skill)}
                  title="Excluir perícia"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Excluir {skill}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-100"
                  onClick={() => handleRollSkill(skill, values.valor)}
                  title={`Rolar dados (${
                    LEVEL_DICE[values.valor] || "Nível inválido"
                  })`}
                >
                  <Dice6 className="h-4 w-4" />
                  <span className="sr-only">Rolar dados para {skill}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Complex Skills */}
        <div>
          <h3 className="font-medium mb-4">Perícias Complexas</h3>
          <div className="flex flex-col gap-4">
            {complexSkills.length === 0 && (
              <span className="text-muted-foreground text-sm">
                Nenhuma perícia complexa obtida.
              </span>
            )}
            {complexSkills.map(([skill, values]) => (
              <div key={skill} className="flex items-center gap-2">
                <Label className="w-28 text-right">{skill}:</Label>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-16"
                    type="number"
                    value={values.valor}
                    onChange={(e) => handleUpdateSkill(skill, e.target.value)}
                  />
                  <span>/</span>
                  <Input
                    className="w-20"
                    type="number"
                    value={values.expGastos}
                    readOnly
                  />
                </div>
                <div className="flex flex-col text-xs text-muted-foreground">
                  <span>Valor</span>
                  <span>Exp gastos</span>
                </div>
                <div className="flex flex-col text-xs text-muted-foreground ml-2">
                  <span>Max: {getMaxComplexSkillValue(skill)}</span>
                  <span>
                    Req:{" "}
                    {Object.entries(COMPLEX_SKILLS_PREREQUISITES[skill] || {})
                      .map(([skill, value]) => `${skill}=${value}`)
                      .join(", ")}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                  onClick={() => handleDeleteSkill(skill)}
                  title="Excluir perícia"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Excluir {skill}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-100"
                  onClick={() => handleRollSkill(skill, values.valor)}
                  title={`Rolar dados (${
                    LEVEL_DICE[values.valor] || "Nível inválido"
                  })`}
                >
                  <Dice6 className="h-4 w-4" />
                  <span className="sr-only">Rolar dados para {skill}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          className="mt-2 flex items-center gap-2 w-fit"
          onClick={() => handleRollSkill("Perícia nível 0", 0)}
          title="Rolar dados para perícia nível 0"
        >
          <Dice6 className="h-4 w-4" />
          Perícia nível 0
        </Button>

        {/* Form to add new skill */}
        <div className={Object.keys(skills).length > 0 ? "pt-4 border-t" : ""}>
          <h3 className="font-medium mb-4">Adicionar nova perícia</h3>
          <div className="flex items-end gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-skill">Perícia</Label>
              <Select value={newSkill} onValueChange={setNewSkill}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Selecione uma perícia" />
                </SelectTrigger>
                <SelectContent>
                  {availableSimpleSkills.length > 0 && (
                    <SelectGroup>
                      <SelectLabel>Perícias Simples</SelectLabel>
                      {availableSimpleSkills.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                  {availableComplexSkills.length > 0 && (
                    <SelectGroup>
                      <SelectLabel>Perícias Complexas</SelectLabel>
                      {availableComplexSkills.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAddSkill}
              disabled={!newSkill || skills[newSkill] !== undefined}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
