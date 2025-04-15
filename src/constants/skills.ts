export const SIMPLE_SKILLS = [
  "Potência",
  "Resistência",
  "Coordenação Motora",
  "Sensibilidade",
  "Empatia",
  "Autoconhecimento",
  "Lógica",
] as const;

export type SimpleSkill = (typeof SIMPLE_SKILLS)[number];

// Define the attributes for complex skills
export const COMPLEX_SKILLS_ATTRIBUTES: Record<string, string> = {
  Acrobacia: "Destreza",
  "Arma de Arremesso": "Destreza",
  "Arma de Empunhadura Curta": "Força",
  "Arma de Empunhadura Longa": "Força",
  "Arma de Empunhadura Média": "Força",
  "Arma de Gatilho": "Destreza",
  "Arma Impulsora": "Destreza",
  "Arma Sem Empunhadura": "Força",
  Atletismo: "Força",
  "Condução de Veículo": "Destreza",
  Enganação: "Carisma",
  "História/Religião": "Inteligência",
  Intuição: "Carisma",
  Investigação: "Percepção",
  Medicina: "Sabedoria",
  Natureza: "Sabedoria",
  "Operação Minuciosa": "Destreza",
  Persuasão: "Carisma",
  Prontidão: "Percepção",
  Raciocínio: "Inteligência",
  "ZaConhecimento Específico": "Inteligência",
  "ZzMagia de Água": "Inteligência",
  "ZzMagia de Ar": "Inteligência",
  "ZzMagia de Essência": "Inteligência",
  "ZzMagia de Fogo": "Inteligência",
  "ZzMagia de Morte": "Inteligência",
  "ZzMagia de Terra": "Inteligência",
  "ZzMagia de Vida": "Inteligência",
};

// Define the prerequisites for complex skills
// Each complex skill has a map of simple skills and their minimum required values
export const COMPLEX_SKILLS_PREREQUISITES: Record<
  string,
  Partial<Record<SimpleSkill, number>>
> = {
  Acrobacia: {
    Potência: 1,
    "Coordenação Motora": 1,
  },
  "Arma de Arremesso": {
    Potência: 1,
    "Coordenação Motora": 1,
  },
  "Arma de Empunhadura Curta": {
    Potência: 1,
    "Coordenação Motora": 1,
  },
  "Arma de Empunhadura Longa": {
    Potência: 1,
    Resistência: 1,
  },
  "Arma de Empunhadura Média": {
    Potência: 1,
    "Coordenação Motora": 1,
  },
  "Arma de Gatilho": {
    "Coordenação Motora": 1,
    Sensibilidade: 1,
  },
  "Arma Impulsora": {
    "Coordenação Motora": 1,
    Sensibilidade: 1,
  },
  "Arma Sem Empunhadura": {
    Potência: 1,
    Resistência: 1,
  },
  Atletismo: {
    Potência: 1,
    Resistência: 1,
  },
  "Condução de Veículo": {
    "Coordenação Motora": 1,
    Sensibilidade: 1,
  },
  Enganação: {
    Empatia: 1,
    Autoconhecimento: 1,
  },
  "História/Religião": {
    Autoconhecimento: 1,
    Lógica: 1,
  },
  Intuição: {
    Empatia: 1,
    Autoconhecimento: 1,
  },
  Investigação: {
    Sensibilidade: 1,
    Lógica: 1,
  },
  Medicina: {
    "Coordenação Motora": 1,
    Sensibilidade: 1,
  },
  Natureza: {
    Autoconhecimento: 1,
    Sensibilidade: 1,
  },
  "Operação Minuciosa": {
    "Coordenação Motora": 1,
    Sensibilidade: 1,
  },
  Persuasão: {
    Empatia: 1,
    Autoconhecimento: 1,
  },
  Prontidão: {
    Sensibilidade: 1,
    Autoconhecimento: 1,
  },
  Raciocínio: {
    Sensibilidade: 1,
    Lógica: 1,
  },
  "ZaConhecimento Específico": {
    Autoconhecimento: 1,
    Lógica: 1,
  },
  "ZzMagia de Água": {
    Autoconhecimento: 1,
    Lógica: 1,
  },
  "ZzMagia de Ar": {
    Autoconhecimento: 1,
    Lógica: 1,
  },
  "ZzMagia de Essência": {
    Autoconhecimento: 1,
    Lógica: 1,
  },
  "ZzMagia de Fogo": {
    Autoconhecimento: 1,
    Lógica: 1,
  },
  "ZzMagia de Morte": {
    Autoconhecimento: 1,
    Lógica: 1,
  },
  "ZzMagia de Terra": {
    Autoconhecimento: 1,
    Lógica: 1,
  },
  "ZzMagia de Vida": {
    Autoconhecimento: 1,
    Lógica: 1,
  },
};
