import { getDice } from "@/lib/dice";
import {
  COMPLEX_SKILLS_ATTRIBUTES,
  SIMPLE_SKILL_ATTRIBUTES,
} from "@/constants/skills";
import { LEVEL_DICE } from "@/constants/dice-levels";

// Map of attribute names to their corresponding stats
const ATTRIBUTE_TO_STAT: Record<string, string> = {
  Força: "forcaAtual",
  Destreza: "destrezaAtual",
  Constituição: "constituicaoAtual",
  Percepção: "percepcaoAtual",
  Inteligência: "inteligenciaAtual",
  Sabedoria: "sabedoriaAtual",
  Carisma: "carismaAtual",
};

export type DiceRollResult = {
  qty: number;
  modifier: number;
  sides: number;
  rolls: Array<{
    sides: number;
    dieType: string;
    groupId: number;
    rollId: number;
    theme: string;
    themeColor: string;
    value: number;
  }>;
  id: number;
  value: number;
}[];

export interface RollResult {
  total: number;
  rolls: Array<{
    value: number;
    type: string;
  }>;
  diceNotation: string[];
  fortune?: number;
  skillLevel: number;
  attributeLevel: number;
}

export function rollDice(
  diceNotation: string[],
  skillName: string,
  skillLevel: number,
  stats: Record<string, number>,
  callback: (result: RollResult) => void
) {
  const dice = getDice();

  // Get attribute level for the skill
  let attributeLevel = 0;
  if (SIMPLE_SKILL_ATTRIBUTES[skillName]) {
    // For simple skills, use the corresponding attribute
    const attribute = SIMPLE_SKILL_ATTRIBUTES[skillName];
    const statKey = ATTRIBUTE_TO_STAT[attribute];
    if (statKey) {
      attributeLevel = stats[statKey] || 0;
    }
  } else if (COMPLEX_SKILLS_ATTRIBUTES[skillName]) {
    // For complex skills, use the attribute from COMPLEX_SKILLS_ATTRIBUTES
    const attribute = COMPLEX_SKILLS_ATTRIBUTES[skillName];
    const statKey = ATTRIBUTE_TO_STAT[attribute];
    if (statKey) {
      attributeLevel = stats[statKey] || 0;
    }
  }

  // Calculate effective level (skill + attribute)
  const effectiveLevel = skillLevel + attributeLevel;
  const effectiveDiceNotation = LEVEL_DICE[effectiveLevel] || diceNotation;
  const notationWithFortune = [...effectiveDiceNotation, "2d12"];

  dice.roll(notationWithFortune);
  dice.onRollComplete = (diceResult: DiceRollResult) => {
    // Get skill rolls (all except last group)
    const skillRolls = diceResult.slice(0, -1);
    const skillTotal = skillRolls.reduce((sum, group) => sum + group.value, 0);

    // Get fortune rolls (last group)
    const fortuneGroup = diceResult[diceResult.length - 1];
    const fortuneRolls = fortuneGroup.rolls;
    const fortune = fortuneRolls[0].value - fortuneRolls[1].value;

    // Create array of individual rolls with their types
    const rolls = diceResult.flatMap((group) =>
      group.rolls.map((roll) => ({
        value: roll.value,
        type: `d${roll.sides}` as const,
      }))
    );

    const finalResult: RollResult = {
      total: skillTotal + fortune,
      rolls: rolls,
      diceNotation: effectiveDiceNotation,
      fortune,
      skillLevel,
      attributeLevel,
    };

    callback(finalResult);
  };
}
