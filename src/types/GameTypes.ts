export interface Resource {
  id: string;
  name: string;
  amount: number;
  perClick: number;
  autoPerSecond: number;
  image?: any;
}

export interface Recipe {
  id: string;
  name: string;
  inputs: { resourceId: string; amount: number }[];
  outputs: { resourceId: string; amount: number }[];
  unlocked: boolean;
}

export interface Tool {
  id: string;
  name: string;
  resourceId: string;
  multiplier: number;
  cost: { resourceId: string; amount: number }[];
  owned: boolean;
}
