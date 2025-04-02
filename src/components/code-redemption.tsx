"use client";

import type React from "react";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Code } from "lucide-react";
import { SkillValues } from "./character-sheet";

interface CodeRedemptionProps {
  setTitle: Dispatch<SetStateAction<string>>;
  setSkills: Dispatch<SetStateAction<SkillValues>>;
  setStats: Dispatch<
    SetStateAction<{
      [P: string]: number;
    }>
  >;
}

export default function CodeRedemption({
  setTitle,
  setSkills,
  setStats,
}: CodeRedemptionProps) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: {
      title: string;
      skills: SkillValues;
      stats: {
        [P: string]: number;
      };
    } = JSON.parse(code);

    setTitle(data.title);
    setStats(data.stats);
    setSkills(data.skills);

    setCode("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Code />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importar Ficha</DialogTitle>
          <DialogDescription>
            Insira o código da ficha para importá-la.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Input
              id="code"
              placeholder="Digite o código aqui"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full"
              autoComplete="off"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Importar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
