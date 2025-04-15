"use client";

import { createDice, getDice } from "@/lib/dice";
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

  const handleRoll = async () => {
    if (isInitialized) {
      try {
        const dice = getDice();
        await dice.roll("2d20kh1");
      } catch (error) {
        console.error("Failed to roll dice:", error);
      }
    }
  };

  if (!isClient) {
    return <div className="w-full h-72 border rounded-xl">Loading dice...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleRoll}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!isInitialized}
      >
        Roll 2d20
      </button>
      <div
        ref={diceBoxRef}
        id="dice-box"
        className="w-full h-72 border rounded-xl"
      ></div>
    </div>
  );
}
