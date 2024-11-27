import { Resource, Tool, Recipe } from '../types/GameTypes';

export const calculateMultiplier = (resourceId: string, tools: Tool[]): number => {
  const tool = tools.find(t => t.owned && t.resourceId === resourceId);
  return tool ? tool.multiplier : 1;
};

export const canAffordTool = (tool: Tool, resources: Resource[]): boolean => {
  return tool.cost.every(cost => {
    const resource = resources.find(r => r.id === cost.resourceId);
    return resource && resource.amount >= cost.amount;
  });
};

export const canCraftRecipe = (recipe: Recipe, resources: Resource[]): boolean => {
  return recipe.inputs.every(input => {
    const resource = resources.find(r => r.id === input.resourceId);
    return resource && resource.amount >= input.amount;
  });
};

export const getResourceName = (resourceId: string, resources: Resource[]): string => {
  return resources.find(r => r.id === resourceId)?.name || resourceId;
};