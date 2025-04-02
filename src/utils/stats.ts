export const getStatLabel = (name: string, mod = 1) => {
  if (
    name === "forcaAtual" ||
    name === "constituicaoAtual" ||
    name === "destrezaAtual" ||
    name === "percepcaoAtual" ||
    name === "inteligenciaAtual" ||
    name === "sabedoriaAtual" ||
    name === "carismaAtual"
  ) {
    return `${name[0].toUpperCase()}${name.slice(1, 3)}[${mod}]`;
  }

  return name;
};
