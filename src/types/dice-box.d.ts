declare module "@3d-dice/dice-box" {
  interface DiceBoxOptions {
    assetPath: string;
    container: string;
    scale?: number;
  }

  type DiceRollResult = {
    qty: number;
    modifier: number;
    sides: number;
    rolls: Array<{
      sides: number;
      dieType: string;
      groupId: number;
      rollId: number;
      theme: string;
      themeColor: string;
      value: number;
    }>;
    id: number;
    value: number;
  }[];

  class DiceBox {
    constructor(options: DiceBoxOptions);
    init(): Promise<void>;
    roll(notation: string | string[]): Promise<void>;
    onRollComplete: (result: DiceRollResult) => void;
  }

  export default DiceBox;
}
