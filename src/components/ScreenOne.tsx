import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { ResourceButton } from './ResourceButton';
import { ToolShop } from './ToolShop';
import { CraftingMenu } from './CraftingMenu';
import { useAutoGatherer } from '../hooks/useAutoGatherer';
import { useGameSaver } from '../hooks/useGameSaver';
import { useGameState } from '../context/GameStateContext';

export function ScreenOne() {
  const {
    resources,
    setResources,
    tools,
    setTools,
    recipes,
    setRecipes
  } = useGameState();

  useAutoGatherer(resources, setResources);
  useGameSaver({
    resources,
    tools,
    recipes,
    setResources,
    setTools,
    setRecipes
  });

  const handleGather = (resourceId: string) => {
    console.log(resources)
    setResources(current => current.map(resource => {
      if (resource.id === resourceId) {
        const tool = tools.find(t => t.owned && t.resourceId === resourceId);
        const multiplier = tool ? tool.multiplier : 1;
        return {
          ...resource,
          amount: resource.amount + (resource.perClick * multiplier)
        };
      }
      return resource;
    }));
  };

  const handlePurchaseTool = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (!tool || tool.owned) return;

    const canAfford = tool.cost.every(cost => {
      const resource = resources.find(r => r.id === cost.resourceId);
      return resource && resource.amount >= cost.amount;
    });

    if (!canAfford) return;

    setResources(current => current.map(resource => {
      const cost = tool.cost.find(c => c.resourceId === resource.id);
      return {
        ...resource,
        amount: resource.amount - (cost?.amount || 0),
        autoPerSecond: tool.id.startsWith('auto_') && resource.id === tool.resourceId
          ? resource.autoPerSecond + 1
          : resource.autoPerSecond
      };
    }));

    setTools(current => current.map(t => 
      t.id === toolId ? { ...t, owned: true } : t
    ));
  };

  const handleCraft = (recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe || recipe.unlocked) return;

    const canCraft = recipe.inputs.every(input => {
      const resource = resources.find(r => r.id === input.resourceId);
      return resource && resource.amount >= input.amount;
    });

    if (!canCraft) return;

    // Consume input resources
    setResources(current => current.map(resource => {
      const input = recipe.inputs.find(i => i.resourceId === resource.id);
      
      // Get the resource to unlock from the recipe ID (e.g., 'stone_unlock' -> 'stone')
      const resourceToUnlock = recipe.id.split('_')[0];
      
      return {
        ...resource,
        // Subtract input costs if this resource is used as input
        amount: resource.amount - (input?.amount || 0),
        // Enable gathering (perClick = 1) for the unlocked resource
        perClick: resource.id === resourceToUnlock ? 1 : resource.perClick
      };
    }));

    // Mark recipe as unlocked
    setRecipes(current => current.map(r =>
      r.id === recipeId ? { ...r, unlocked: true } : r
    ));
  };

  return (
    <scrollView>
      <stackLayout style={styles.container}>
        <label style={styles.title}>Resource Factory</label>
        
        <stackLayout style={styles.resourcesContainer}>
          {resources.map(resource => (
            resource.perClick > 0 && (
              <ResourceButton
                key={resource.id}
                resource={resource}
                onGather={handleGather}
              />
            )
          ))}
        </stackLayout>

        <ToolShop
          tools={tools.filter(t => !t.owned)}
          resources={resources}
          onPurchase={handlePurchaseTool}
        />

        <CraftingMenu
          recipes={recipes.filter(r => !r.unlocked)}
          resources={resources}
          onCraft={handleCraft}
        />
      </stackLayout>
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlignment: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  resourcesContainer: {
    marginBottom: 20,
  },
});