export type Category = "commodity" | "luxury" | "contraband";
export type DemandLevel = "low" | "medium" | "high" | "critical";


export type Good = {
  name: string;
  basePrice: number;
  category: Category;
  demand: DemandLevel;
};

export type GoodState = {
  name: string;
  sellPrice: number;
  demand : DemandLevel;
}

export type InventoryItem = {
  good: Good;
  quantity: number;
};

export type CargoItem = {
  good: Good;
  quantity: number;
  buyPrice: number;
}

export type Ship = {
  name: string;
  cargo: CargoItem[];
};

export type ActiveEffect = {
  goodName: string;
  demandMultiplier: number;
  daysRemaining: number;
};

export type GameState = {
  portName: string;
  day: number;
  gold: number;
  inventory: InventoryItem[];
  dockedShips: Ship[];
  warehouseCapacity: number;
  reputation: number;
  activeEffects: ActiveEffect[];
};

export const gameState: GameState = {
  portName: "Kelvara",
  day: 1,
  gold: 200,
  inventory: [],
  dockedShips: [],
  warehouseCapacity: 50,
  reputation: 50,
  activeEffects: [],
};