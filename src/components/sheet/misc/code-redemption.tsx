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
import { SkillValues } from "../character-sheet";
import { toast } from "sonner";

interface CodeRedemptionProps {
  setTitle: Dispatch<SetStateAction<string>>;
  setSkills: Dispatch<SetStateAction<SkillValues>>;
  setBasicStats: Dispatch<
    SetStateAction<{
      [P: string]: number;
    }>
  >;
  setStats: Dispatch<
    SetStateAction<{
      [P: string]: number;
    }>
  >;
}

export default function CodeRedemption({
  setTitle,
  setSkills,
  setBasicStats,
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
      basicStats: {
        [P: string]: number;
      };
    } = JSON.parse(code);

    setTitle(data.title);
    setBasicStats(data.basicStats);
    setStats(data.stats);
    setSkills(data.skills);

    setCode("");
    setOpen(false);

    toast.success("Ficha importada com sucesso");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
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
              placeholder="Insira o código aqui"
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
