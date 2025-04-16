"use client";
import DiceBox from "@/components/sheet/dice/dice-box";
import CharacterSheet from "@/components/sheet/character-sheet";
import NotesBox from "@/components/sheet/misc/notes-box";

export default function Ficha() {
  return (
    <main className="flex gap-4 p-4">
      <CharacterSheet />

      <div className="flex flex-col gap-4 w-full">
        <NotesBox />

        <DiceBox />
      </div>
    </main>
  );
}
