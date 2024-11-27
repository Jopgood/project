import { Resource, Recipe, Tool } from "../types/GameTypes";

export const initialResources: Resource[] = [
  {
    id: "wood",
    name: "Wood",
    amount: 0,
    perClick: 1,
    autoPerSecond: 0,
    image: require("../../assets/axe.png"),
  },
  {
    id: "stone",
    name: "Stone",
    amount: 0,
    perClick: 0,
    autoPerSecond: 0,
  },
  {
    id: "iron",
    name: "Iron Ore",
    amount: 0,
    perClick: 0,
    autoPerSecond: 0,
  },
  {
    id: "copper",
    name: "Copper Ore",
    amount: 0,
    perClick: 0,
    autoPerSecond: 0,
  },
];

export const initialTools: Tool[] = [
  {
    id: "wooden_axe",
    name: "Wooden Axe",
    resourceId: "wood",
    multiplier: 2,
    cost: [{ resourceId: "wood", amount: 10 }],
    owned: false,
  },
  {
    id: "stone_pickaxe",
    name: "Stone Pickaxe",
    resourceId: "stone",
    multiplier: 2,
    cost: [
      { resourceId: "wood", amount: 15 },
      { resourceId: "stone", amount: 10 },
    ],
    owned: false,
  },
  {
    id: "auto_wood_collector",
    name: "Auto Wood Collector",
    resourceId: "wood",
    multiplier: 1,
    cost: [{ resourceId: "wood", amount: 50 }],
    owned: false,
  },
];

export const initialRecipes: Recipe[] = [
  {
    id: "stone_unlock",
    name: "Unlock Stone Gathering",
    inputs: [{ resourceId: "wood", amount: 20 }],
    outputs: [],
    unlocked: false,
  },
  {
    id: "iron_unlock",
    name: "Unlock Iron Mining",
    inputs: [
      { resourceId: "wood", amount: 30 },
      { resourceId: "stone", amount: 20 },
    ],
    outputs: [],
    unlocked: false,
  },
  {
    id: "copper_unlock",
    name: "Unlock Copper Mining",
    inputs: [
      { resourceId: "wood", amount: 40 },
      { resourceId: "stone", amount: 30 },
    ],
    outputs: [],
    unlocked: false,
  },
];
