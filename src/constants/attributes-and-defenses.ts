export const ATTRIBUTES_MODIFIERS = {
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
      { name: "vitalidadeOutros", mod: 1, label: "Outros" },
    ],
  },
  regeneracaoVitalidade: {
    base: 3,
    modifiers: [
      { name: "forcaAtual", mod: 1 },
      { name: "constituicaoAtual", mod: 2 },
      { name: "destrezaAtual", mod: 1 },
      { name: "percepcaoAtual", mod: 1 },
      { name: "sabedoriaAtual", mod: 1 },
      { name: "carismaAtual", mod: 1 },
      { name: "regVitOutros", label: "Outros" },
    ],
  },
  estamina: {
    base: 2,
    modifiers: [
      { name: "forcaAtual", mod: 2 },
      { name: "constituicaoAtual", mod: 2 },
      { name: "sabedoriaAtual", mod: 1 },
      { name: "estaminaOutros", label: "Outros" },
    ],
  },
  regeneracaoEstamina: {
    base: 1,
    modifiers: [
      { name: "forcaAtual", mod: 1 },
      { name: "constituicaoAtual", mod: 1 },
      { name: "sabedoriaAtual", mod: 1 },
      { name: "regEstOutros", label: "Outros" },
    ],
  },
  mana: {
    base: 4,
    modifiers: [
      { name: "constituicaoAtual", mod: 1 },
      { name: "sabedoriaAtual", mod: 2 },
      { name: "inteligenciaAtual", mod: 3 },
      { name: "carismaAtual", mod: 2 },
      { name: "manaOutros", label: "Outros" },
    ],
  },
  regeneracaoMana: {
    base: 2,
    modifiers: [
      { name: "constituicaoAtual", mod: 1 },
      { name: "sabedoriaAtual", mod: 1 },
      { name: "inteligenciaAtual", mod: 2 },
      { name: "carismaAtual", mod: 1 },
      { name: "regManOutros", label: "Outros" },
    ],
  },
};

export const DEFENSES_MODIFIERS = {
  fortitude: {
    base: 1,
    modifiers: [
      { name: "forcaAtual", mod: 2 },
      { name: "constituicaoAtual", mod: 3 },
      { name: "sabedoriaAtual", mod: 1 },
      { name: "fortitudeAlimento", label: "Alim." },
      { name: "fortitudeOutros", label: "Outros" },
    ],
  },
  vontade: {
    base: 1,
    modifiers: [
      { name: "constituicaoAtual", mod: 3 },
      { name: "sabedoriaAtual", mod: 2 },
      { name: "inteligenciaAtual", mod: 1 },
      { name: "carismaAtual", mod: 2 },
      { name: "vontadeDescanso", label: "Desc." },
      { name: "vontadeOutros", label: "Outros" },
    ],
  },
  reflexos: {
    base: 1,
    modifiers: [
      { name: "destrezaAtual", mod: 3 },
      { name: "percepcaoAtual", mod: 2 },
      { name: "carismaAtual", mod: 1 },
      { name: "reflexosArmaPrimaria", label: "ArmP." },
      { name: "reflexosArmaSecundaria", label: "ArmS." },
      { name: "reflexosOutros", label: "Outros" },
    ],
  },
  fragilidade: {
    base: 1,
    modifiers: [
      { name: "constituicaoAtual", mod: 1 },
      { name: "percepcaoAtual", mod: 2 },
      { name: "sabedoriaAtual", mod: 1 },
      { name: "carismaAtual", mod: 1 },
      { name: "fragilidadeOutros", label: "Outros" },
    ],
  },
};
