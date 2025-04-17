"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Dice6 } from "lucide-react";
import { SkillValues } from "../character-sheet";
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
import { DiceRollResult } from "../dice/dice-roll-result";
import { cn } from "@/lib/utils";
import { StatInput } from "../stats/stat-input";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

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
      if (simpleSkillValue < minValue) continue;
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
    if (stats["expTotais"] - stats["expGastos"] < 1) {
      alert("Você não possui experiência suficiente para comprar esta perícia");
      setNewSkill("");
      return;
    }

    if (newSkill && !skills[newSkill] && canAddSkill(newSkill)) {
      setSkills({
        ...skills,
        [newSkill]: {
          valor: 1,
          expGastos: 1,
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

    if (intValue < 0) {
      alert("O valor da perícia não pode ser negativo");
      return;
    }

    // For complex skills, check if the value is within allowed range
    if (COMPLEX_SKILLS_PREREQUISITES[skill]) {
      // Calculate maximum level based on sum of prerequisite levels
      const prerequisites = COMPLEX_SKILLS_PREREQUISITES[skill];
      let maxValue = 0;

      for (const [simpleSkill, minValue] of Object.entries(prerequisites)) {
        const simpleSkillValue = skills[simpleSkill]?.valor ?? 0;
        if (simpleSkillValue < minValue) continue;
        maxValue += simpleSkillValue;
      }

      if (intValue > maxValue) {
        alert(
          `O valor máximo permitido para ${skill} é ${maxValue} (soma dos níveis das perícias simples necessárias)`
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
          <DiceRollResult result={lastRollResult} />
        </div>
      )}

      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          {/* Simple Skills */}
          <div className="flex-1">
            <h3 className="font-medium mb-4">Perícias Simples</h3>
            <div className="flex flex-col gap-4">
              {simpleSkills.length === 0 && (
                <span className="text-muted-foreground text-sm">
                  Nenhuma perícia simples obtida.
                </span>
              )}
              {simpleSkills.map(([skill, values]) => (
                <div key={skill} className="flex items-center gap-2">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Label className="w-28 text-right truncate">
                          {skill}:
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <Label className="text-md font-bold">{skill}</Label>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="flex items-center gap-2">
                    <StatInput
                      name={`${skill}-valor`}
                      value={values.valor}
                      onChange={(e) => handleUpdateSkill(skill, e.target.value)}
                      label="Valor"
                      min={0}
                    />
                    <span>/</span>
                    <StatInput
                      name={`${skill}-exp`}
                      value={values.expGastos}
                      readOnly
                      label="Exp gastos"
                      onChange={() => {}}
                    />
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
          <div className="flex-1">
            <h3 className="font-medium mb-4">Perícias Complexas</h3>
            <div className="flex flex-col gap-4">
              {complexSkills.length === 0 && (
                <span className="text-muted-foreground text-sm">
                  Nenhuma perícia complexa obtida.
                </span>
              )}
              {complexSkills.map(([skill, values]) => (
                <div key={skill} className="flex items-center gap-2">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Label className="w-28 text-right truncate">
                          {skill}:
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex flex-col gap-1">
                          <Label className="text-md font-bold">{skill}</Label>
                          <span className="font-medium">Pré-requisitos:</span>
                          {Object.entries(
                            COMPLEX_SKILLS_PREREQUISITES[skill] || {}
                          ).map(([reqSkill, minValue]) => (
                            <span key={reqSkill}>
                              {reqSkill} ≥ {minValue}
                            </span>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="flex items-center gap-2">
                    <StatInput
                      name={`${skill}-valor`}
                      value={values.valor}
                      onChange={(e) => handleUpdateSkill(skill, e.target.value)}
                      label={`Valor (Max: ${getMaxComplexSkillValue(skill)})`}
                      min={0}
                      max={getMaxComplexSkillValue(skill)}
                    />
                    <span>/</span>
                    <StatInput
                      name={`${skill}-exp`}
                      value={values.expGastos}
                      readOnly
                      label="Exp gastos"
                      onChange={() => {}}
                    />
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
                    title={`Rolar dados`}
                  >
                    <Dice6 className="h-4 w-4" />
                    <span className="sr-only">Rolar dados para {skill}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form to add new skill */}
        <div
          className={cn("print:hidden", {
            "pt-4 border-t": Object.keys(skills).length > 0,
          })}
        >
          <h3 className="font-medium mb-4">Adicionar nova perícia</h3>
          <div className="flex items-end gap-2">
            <div className="flex flex-col gap-2">
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
