import { Resource, Tool, Recipe } from '../types/GameTypes';
import { calculateMultiplier } from '../utils/gameLogic';

export function useResourceActions(
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>,
  tools: Tool[]
) {
  const handleGather = (resourceId: string) => {
    setResources(current => current.map(resource => {
      if (resource.id === resourceId) {
        const multiplier = calculateMultiplier(resourceId, tools);
        return {
          ...resource,
          amount: resource.amount + (resource.perClick * multiplier)
        };
      }
      return resource;
    }));
  };

  return { handleGather };
}