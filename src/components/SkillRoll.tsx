import { RollResult } from "@/utils/rolls";
import { DiceIcon } from "./DiceIcon";

interface SkillRollProps {
  result: RollResult;
}

type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20";

export function SkillRoll({ result }: SkillRollProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{result.total}</span>
        <span className="text-sm text-gray-500">
          ({result.diceNotation.join(" + ")})
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {result.rolls.map((roll, index) => (
          <div key={index} className="flex items-center gap-1">
            <DiceIcon type={roll.type as DiceType} />
            <span className="text-sm">{roll.value}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 text-sm text-gray-500">
        <span>Nível da Perícia: {result.skillLevel}</span>
        <span>Nível do Atributo: {result.attributeLevel}</span>
        {result.fortune !== undefined && (
          <span>
            Rolagem da Fortuna: {result.fortune > 0 ? "+" : ""}
            {result.fortune}
          </span>
        )}
      </div>
    </div>
  );
}
