import DiceBox from "@3d-dice/dice-box";

let diceInstance: DiceBox | null = null;

export const createDice = () => {
  if (!diceInstance) {
    diceInstance = new DiceBox({
      assetPath: "/assets/",
      container: "#dice-box",
      scale: 9,
    });
  }
  return diceInstance;
};

export const getDice = () => {
  if (!diceInstance) {
    throw new Error("Dice not initialized. Call createDice() first.");
  }
  return diceInstance;
};
