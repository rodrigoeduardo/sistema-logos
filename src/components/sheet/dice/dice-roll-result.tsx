import { RollResult } from "@/utils/rolls";
import { DiceIcon } from "./dice-icon";
import { AlertTriangle, Crown, Zap } from "lucide-react";

interface DiceRollResultProps {
  result: RollResult;
}

type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20";

export function DiceRollResult({ result }: DiceRollResultProps) {
  // Separate regular rolls from fortune rolls
  const regularRolls = result.rolls.slice(0, -2);
  const fortuneRolls = result.rolls.slice(-2);

  // Check for Desastre or Triunfo
  const isDesastre =
    fortuneRolls[0].value === fortuneRolls[1].value &&
    fortuneRolls[0].value <= 6;
  const isTriunfo =
    fortuneRolls[0].value === fortuneRolls[1].value &&
    fortuneRolls[0].value >= 7;

  // Check for Duplo and Triplo
  const isDesastreDuplo =
    fortuneRolls[0].value === 1 && fortuneRolls[1].value === 1;
  const isDesastreTriplo =
    fortuneRolls[0].value === 1 && fortuneRolls[1].value === 12;
  const isTriunfoDuplo =
    fortuneRolls[0].value === 12 && fortuneRolls[1].value === 12;
  const isTriunfoTriplo =
    fortuneRolls[0].value === 12 && fortuneRolls[1].value === 1;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{result.total}</span>
        <span className="text-sm text-gray-500">
          ({result.diceNotation.join(" + ")} + Fortuna)
        </span>
        {(isDesastre || isDesastreDuplo || isDesastreTriplo) && (
          <div className="flex items-center gap-1 text-red-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Desastre</span>
            {isDesastreDuplo && (
              <div className="flex items-center gap-1 text-red-600">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Duplo</span>
              </div>
            )}
            {isDesastreTriplo && (
              <div className="flex items-center gap-1 text-red-600">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Triplo</span>
              </div>
            )}
          </div>
        )}
        {(isTriunfo || isTriunfoDuplo || isTriunfoTriplo) && (
          <div className="flex items-center gap-1 text-yellow-600">
            <Crown className="w-4 h-4" />
            <span className="text-sm font-medium">Triunfo</span>
            {isTriunfoDuplo && (
              <div className="flex items-center gap-1 text-yellow-600">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Duplo</span>
              </div>
            )}
            {isTriunfoTriplo && (
              <div className="flex items-center gap-1 text-yellow-600">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Triplo</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {regularRolls.map((roll, index) => (
          <div key={index} className="flex items-center gap-1">
            <DiceIcon type={roll.type as DiceType} />
            <span className="text-sm">{roll.value}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {fortuneRolls.map((roll, index) => (
          <div
            key={index}
            className={`flex items-center gap-1 ${
              index === 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <DiceIcon type={roll.type as DiceType} />
            <span className="text-sm font-medium">{roll.value}</span>
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
