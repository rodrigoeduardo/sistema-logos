export const VARIABLE_LABELS: Record<string, string> = {
  // Attributes
  forcaAtual: "Força",
  constituicaoAtual: "Constituição",
  destrezaAtual: "Destreza",
  percepcaoAtual: "Percepção",
  inteligenciaAtual: "Inteligência",
  sabedoriaAtual: "Sabedoria",
  carismaAtual: "Carisma",
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
