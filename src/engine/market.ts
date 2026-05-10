import goods from "../data/goods.json";
import { gameState } from "./state";

const goodsData = goods.goods;

export function getBuyPrice(goodName: string, priceModifier: number): number {
  const good = goodsData.find(g => g.name === goodName);
  if (!good) {
    throw new Error(`Unknown good: ${goodName}`);
  }

  const basePrice = good.basePrice;
  const randomDrift = 0.9 + Math.random() * 0.2;
  
  const effect = gameState.activeEffects.find(e => e.goodName === goodName);
  const demandMultiplier = effect ? effect.demandMultiplier : 1.0;

  return Math.round(basePrice * priceModifier * demandMultiplier * randomDrift);
}

export function getSellPrice(goodName: string): number {
  const good = goodsData.find(g => g.name === goodName);
  if (!good) {
    throw new Error(`Unknown good: ${goodName}`);
  }

  const basePrice = good.basePrice;
  
  const MARKET_CUT = 0.8;
  
  const effect = gameState.activeEffects.find(e => e.goodName === goodName);
  const demandMultiplier = effect ? effect.demandMultiplier : 1.0;

  return Math.round(basePrice * demandMultiplier * MARKET_CUT);
}