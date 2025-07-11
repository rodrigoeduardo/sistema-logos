type VariableModifier = {
  name: string;
  mod?: number;
  label?: string;
  custom?: boolean;
};

type VariableConfig = {
  base: number;
  modifiers: VariableModifier[];
};

export type VariablesModifiers = {
  [key: string]: VariableConfig;
};

export const ATTRIBUTES_MODIFIERS: VariablesModifiers = {
  vitalidade: {
    base: 6,
    modifiers: [
      { name: "forcaAtual", mod: 2 },
      { name: "constituicaoAtual", mod: 4 },
      { name: "destrezaAtual", mod: 1 },
      { name: "percepcaoAtual", mod: 1 },
      { name: "inteligenciaAtual", mod: 1 },
      { name: "sabedoriaAtual", mod: 2 },
      { name: "carismaAtual", mod: 1 },
      { name: "vitalidadeOutros", label: "Outros", custom: true },
    ],
  },
  regeneracaoVitalidade: {
    base: 3,
    modifiers: [
      { name: "forcaAtual", mod: 1 },
      { name: "constituicaoAtual", mod: 2 },
      { name: "percepcaoAtual", mod: 1 },
      { name: "sabedoriaAtual", mod: 1 },
      { name: "carismaAtual", mod: 1 },
      { name: "regVitOutros", label: "Outros", custom: true },
    ],
  },
  estamina: {
    base: 2,
    modifiers: [
      { name: "forcaAtual", mod: 1 },
      { name: "constituicaoAtual", mod: 2 },
      { name: "destrezaAtual", mod: 1 },
      { name: "estaminaOutros", label: "Outros", custom: true },
    ],
  },
  regeneracaoEstamina: {
    base: 1,
    modifiers: [
      { name: "forcaAtual", mod: 1 },
      { name: "constituicaoAtual", mod: 1 },
      { name: "regEstOutros", label: "Outros", custom: true },
    ],
  },
  mana: {
    base: 4,
    modifiers: [
      { name: "percepcaoAtual", mod: 1 },
      { name: "sabedoriaAtual", mod: 3 },
      { name: "inteligenciaAtual", mod: 2 },
      { name: "carismaAtual", mod: 2 },
      { name: "manaOutros", label: "Outros", custom: true },
    ],
  },
  regeneracaoMana: {
    base: 2,
    modifiers: [
      { name: "percepcaoAtual", mod: 1 },
      { name: "sabedoriaAtual", mod: 1 },
      { name: "inteligenciaAtual", mod: 1 },
      { name: "carismaAtual", mod: 1 },
      { name: "regManOutros", label: "Outros", custom: true },
    ],
  },
};

export const DEFENSES_MODIFIERS: VariablesModifiers = {
  fortitude: {
    base: 4,
    modifiers: [
      { name: "forcaAtual", mod: 1 },
      { name: "constituicaoAtual", mod: 1 },
      { name: "fortitudeAlimento", label: "Alim.", custom: true },
      { name: "fortitudeDescanso", label: "Desc.", custom: true },
      { name: "fortitudeOutros", label: "Outros", custom: true },
    ],
  },
  vontade: {
    base: 4,
    modifiers: [
      { name: "sabedoriaAtual", mod: 1 },
      { name: "inteligenciaAtual", mod: 1 },
      { name: "vontadeAlimento", label: "Alim.", custom: true },
      { name: "vontadeDescanso", label: "Desc.", custom: true },
      { name: "vontadeOutros", label: "Outros", custom: true },
    ],
  },
  reflexos: {
    base: 4,
    modifiers: [
      { name: "destrezaAtual", mod: 1 },
      { name: "percepcaoAtual", mod: 1 },
      { name: "reflexosArmaPrimaria", label: "ArmP.", custom: true },
      { name: "reflexosArmaSecundaria", label: "ArmS.", custom: true },
      { name: "reflexosOutros", label: "Outros", custom: true },
    ],
  },
  fragilidade: {
    base: 2,
    modifiers: [
      { name: "carismaAtual", mod: 1 },
      { name: "constituicaoAtual", mod: 1 },
      { name: "fragilidadeOutros", label: "Outros", custom: true },
    ],
  },
};
