"use client";

import { createDice, getDice } from "@/lib/dice";
import { useEffect, useState, useRef } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Dice6 } from "lucide-react";

export default function DiceBox() {
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const diceBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const initDice = async () => {
      if (isClient && diceBoxRef.current && !isInitialized) {
        try {
          const dice = createDice();
          await dice.init();
          dice.roll("1d20");
          setIsInitialized(true);
        } catch (error) {
          console.error("Failed to initialize dice:", error);
        }
      }
    };

    initDice();
  }, [isClient, isInitialized]);

  if (!isClient) {
    return <div className="w-full h-72 border rounded-xl">Loading dice...</div>;
  }

  const handleRoll = (notation: string) => {
    const dice = getDice();

    if (!notation) return;

    // Split by + and - to get individual dice expressions
    const notationArray = notation
      .toLowerCase()
      .split(/[+-]/)
      .map((expr) => expr.trim())
      .filter((expr) => /^\d+d\d+$/.test(expr));

    if (notationArray.length > 0) {
      dice.roll(notationArray);
      dice.onRollComplete = (result) => {
        console.log(result);
      };
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">Dados</h2>
      <div
        ref={diceBoxRef}
        id="dice-box"
        className="w-full h-72 border rounded-xl"
      />
      <div className="flex items-center gap-2">
        <form
          className="flex items-center gap-2 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const diceNotation = formData.get("diceNotation") as string;
            handleRoll(diceNotation);
          }}
        >
          <Input
            type="text"
            name="diceNotation"
            placeholder="Digite os dados... ex.: 1d20, 2d4+1d10, etc."
            className="w-full"
          />
          <Button type="submit" size="icon" className="cursor-pointer">
            <Dice6 />
          </Button>
        </form>
      </div>
    </div>
  );
}
