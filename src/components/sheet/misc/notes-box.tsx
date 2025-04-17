"use client";

import { FloatingBox } from "@/components/ui/floating-box";

export default function NotesBox() {
  return (
    <FloatingBox title="Anotações">
      <textarea
        id="notes"
        rows={10}
        placeholder="Escreva aqui..."
        className="w-full rounded-xl p-2 shadow-sm border"
      />
    </FloatingBox>
  );
}
