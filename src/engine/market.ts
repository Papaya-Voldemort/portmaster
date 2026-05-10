import goods from "../data/goods.json";
import { gameState } from "./state";
import type { GoodState, DemandLevel } from "./state"

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
};

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
};

export function getDemandLevel(goodName: string): DemandLevel {
  const good = goodsData.find(g => g.name === goodName);
  if (!good) {
    throw new Error(`Unknown good: ${goodName}`);
  }

  const effect = gameState.activeEffects.find(e => e.goodName === goodName)
  const demandMultiplier = effect ? effect.demandMultiplier : 1.0

  if (demandMultiplier >= 1.8) return "critical";
  if (demandMultiplier >= 1.3) return "high";
  if (demandMultiplier >= 0.9) return "medium";
  return "low";
};

export function getMarketSummary(): GoodState[] {
  const currentMarket: GoodState[] = []

  goodsData.forEach(good => {
    const goodReport: GoodState = { name: good.name, sellPrice: getSellPrice(good.name), demand: getDemandLevel(good.name) };
    currentMarket.push(goodReport);
  });
  
  return currentMarket;
};

export function applyEffect(goodName: string, demandMultiplier: number, daysRemaining: number): void {
  const existing = gameState.activeEffects.findIndex(e => e.goodName === goodName);

  if (existing !== -1) {
    gameState.activeEffects[existing] = { goodName, demandMultiplier, daysRemaining };
  } else {
    gameState.activeEffects.push({ goodName, demandMultiplier, daysRemaining });
  }
};

export function tickEffects(): string[] {
  const expired: string[] = [];

  gameState.activeEffects.forEach(e => {
    e.daysRemaining -= 1;
    if (e.daysRemaining <= 0) expired.push(e.goodName);
  });

  gameState.activeEffects = gameState.activeEffects.filter(e => e.daysRemaining > 0);

  return expired.map(name => `[ ${name} demand returning to normal ]`);
};