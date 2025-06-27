export const VARIABLE_LABELS: Record<string, string> = {
  // Attributes
  forcaAtual: "Força",
  constituicaoAtual: "Constituição",
  destrezaAtual: "Destreza",
  percepcaoAtual: "Percepção",
  inteligenciaAtual: "Inteligência",
  sabedoriaAtual: "Sabedoria",
  carismaAtual: "Carisma",

  vitalidade: "Vitalidade",
  regeneracaoVitalidade: "Reg. Vitalidade",
  estamina: "Estamina",
  regeneracaoEstamina: "Reg. Estamina",
  mana: "Mana",
  regeneracaoMana: "Reg. Mana",

  // Defenses
  fortitude: "Fortitude",
  reflexos: "Reflexos",
  vontade: "Vontade",
  fragilidade: "Fragilidade",
};

export const getVariableLabel = (variableName: string): string => {
  return VARIABLE_LABELS[variableName] || variableName;
};

export const getVariableOptions = () => {
  return Object.entries(VARIABLE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));
};
