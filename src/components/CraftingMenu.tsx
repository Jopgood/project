import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Recipe, Resource } from '../types/GameTypes';

interface CraftingMenuProps {
  recipes: Recipe[];
  resources: Resource[];
  onCraft: (recipeId: string) => void;
}

export function CraftingMenu({ recipes, resources, onCraft }: CraftingMenuProps) {
  const canCraft = (recipe: Recipe): boolean => {
    return recipe.inputs.every(input => {
      const resource = resources.find(r => r.id === input.resourceId);
      return resource && resource.amount >= input.amount;
    });
  };

  const getRequirementsText = (recipe: Recipe): string => {
    return recipe.inputs.map(input => 
      `${input.amount} ${resources.find(r => r.id === input.resourceId)?.name}`
    ).join(', ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crafting & Research</Text>
      <ScrollView>
        {recipes.map(recipe => !recipe.unlocked && (
          <View key={recipe.id} style={styles.recipeItem}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <Text style={styles.requirementsText}>
              Requires: {getRequirementsText(recipe)}
            </Text>
            <TouchableOpacity
              style={[
                styles.craftButton,
                canCraft(recipe) ? styles.craftEnabled : styles.craftDisabled
              ]}
              onPress={() => canCraft(recipe) && onCraft(recipe.id)}
              disabled={!canCraft(recipe)}
            >
              <Text style={styles.craftButtonText}>Research</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  recipeItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  requirementsText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  craftButton: {
    marginTop: 8,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  craftEnabled: {
    backgroundColor: '#9b59b6',
  },
  craftDisabled: {
    backgroundColor: '#95a5a6',
  },
  craftButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});