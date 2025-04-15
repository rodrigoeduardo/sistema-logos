import { getDice } from "@/lib/dice";

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

export const rollDice = (
  notation: string | string[],
  onRollComplete: (result: DiceRollResult) => void
) => {
  const dice = getDice();
  dice.roll(notation);
  dice.onRollComplete = (result) => {
    onRollComplete(result);
  };
};
