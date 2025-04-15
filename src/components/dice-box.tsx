"use client";

import { createDice } from "@/lib/dice";
import { useEffect, useState, useRef } from "react";

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

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">Dados</h2>
      <div
        ref={diceBoxRef}
        id="dice-box"
        className="w-full h-72 border rounded-xl"
      ></div>
    </div>
  );
}
