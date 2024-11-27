import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResourceButton } from '../components/ResourceButton';
import { ToolShop } from '../components/ToolShop';
import { CraftingMenu } from '../components/CraftingMenu';
import { useGameState } from '../context/GameStateContext';
import { useAutoGatherer } from '../hooks/useAutoGatherer';
import { useResourceActions } from '../hooks/useResourceActions';
import { canAffordTool, canCraftRecipe } from '../utils/gameLogic';

export default function HomeScreen() {
  const {
    resources,
    setResources,
    tools,
    setTools,
    recipes,
    setRecipes
  } = useGameState();

  useAutoGatherer(setResources);
  const { handleGather } = useResourceActions(setResources, tools);

  const handlePurchaseTool = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (!tool || tool.owned) return;

    if (!canAffordTool(tool, resources)) return;

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

    if (!canCraftRecipe(recipe, resources)) return;

    setResources(current => current.map(resource => {
      const input = recipe.inputs.find(i => i.resourceId === resource.id);
      const resourceToUnlock = recipe.id.split('_')[0];
      
      return {
        ...resource,
        amount: resource.amount - (input?.amount || 0),
        perClick: resource.id === resourceToUnlock ? 1 : resource.perClick
      };
    }));

    setRecipes(current => current.map(r =>
      r.id === recipeId ? { ...r, unlocked: true } : r
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.resourcesContainer}>
          {resources.map(resource => (
            resource.perClick > 0 && (
              <ResourceButton
                key={resource.id}
                resource={resource}
                onGather={handleGather}
              />
            )
          ))}
        </View>

        <ToolShop
          tools={tools.filter(t => !t.owned)}
          resources={resources}
          onPurchase={handlePurchaseTool}
        />

        <CraftingMenu
          recipes={recipes}
          resources={resources}
          onCraft={handleCraft}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  resourcesContainer: {
    marginBottom: 20,
  },
});