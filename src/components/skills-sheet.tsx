"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { SkillValues } from "./character-sheet";

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

export default function SkillsSheet({
  skills,
  setSkills,
  stats,
}: SkillsSheetProps) {
  // State for the new skill form
  const [newSkill, setNewSkill] = useState<string>("");

  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill && !skills[newSkill]) {
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
    // Create a copy of the current skills
    const updatedSkills = { ...skills };

    // Delete the specified skill
    delete updatedSkills[skillToDelete];

    // Update state with the new skills object
    setSkills(updatedSkills);
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Perícias (EXP X1)</h2>

      <div className="flex flex-col gap-4">
        {/* Display existing skills */}
        {Object.entries(skills).map(([skill, values]) => (
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
          </div>
        ))}

        {/* Form to add new skill */}
        <div className={Object.keys(skills).length > 0 ? "pt-4 border-t" : ""}>
          <h3 className="font-medium mb-4">Adicionar nova perícia</h3>
          <div className="flex items-end gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-skill">Perícia</Label>
              <Input
                id="new-skill"
                type="text"
                placeholder="Nome da perícia"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
            </div>
            <Button
              onClick={handleAddSkill}
              disabled={!newSkill || skills[newSkill] !== undefined}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Debug: Show current state */}
        {/* {Object.keys(skills).length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-medium mb-2">Estado atual:</h3>
            <pre className="bg-muted p-2 rounded text-xs overflow-auto">
              {JSON.stringify(skills, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </section>
  );
}
