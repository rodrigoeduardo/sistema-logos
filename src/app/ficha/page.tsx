"use client";
import DiceBox from "@/components/dice-box";
import CharacterSheet from "@/components/character-sheet";

export default function Ficha() {
  return (
    <main className="flex gap-4 p-4">
      <CharacterSheet />

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Anotações</h2>
          <textarea
            id="notes"
            rows={10}
            placeholder="Escreva aqui..."
            className="rounded-xl p-2 shadow-sm border"
          />
        </div>

        <DiceBox />
      </div>
    </main>
  );
}
