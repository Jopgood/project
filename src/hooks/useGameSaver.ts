import { useEffect } from 'react';
import { Resource, Tool, Recipe } from '../types/GameTypes';
import { ApplicationSettings } from '@nativescript/core';

interface GameSaverProps {
  resources: Resource[];
  tools: Tool[];
  recipes: Recipe[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  setTools: React.Dispatch<React.SetStateAction<Tool[]>>;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export function useGameSaver({
  resources,
  tools,
  recipes,
  setResources,
  setTools,
  setRecipes,
}: GameSaverProps) {
  // Load saved game
  useEffect(() => {
    const savedGame = ApplicationSettings.getString('savedGame');
    if (savedGame) {
      const { resources: savedResources, tools: savedTools, recipes: savedRecipes } = JSON.parse(savedGame);
      if (savedResources) setResources(savedResources);
      if (savedTools) setTools(savedTools);
      if (savedRecipes) setRecipes(savedRecipes);
    }
  }, []);

  // Save game every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      ApplicationSettings.setString('savedGame', JSON.stringify({
        resources,
        tools,
        recipes,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, [resources, tools, recipes]);
}