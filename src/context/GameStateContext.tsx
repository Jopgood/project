import React, { createContext, useContext, useState, useEffect } from 'react';
import { Resource, Tool, Recipe } from '../types/GameTypes';
import { initialResources, initialTools, initialRecipes } from '../data/initialGameState';
import * as SecureStore from 'expo-secure-store';

interface GameState {
  resources: Resource[];
  tools: Tool[];
  recipes: Recipe[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  setTools: React.Dispatch<React.SetStateAction<Tool[]>>;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const GameStateContext = createContext<GameState | undefined>(undefined);

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

  // Load saved game
  useEffect(() => {
    async function loadGame() {
      const savedGame = await SecureStore.getItemAsync('savedGame');
      if (savedGame) {
        const { resources: savedResources, tools: savedTools, recipes: savedRecipes } = JSON.parse(savedGame);
        if (savedResources) setResources(savedResources);
        if (savedTools) setTools(savedTools);
        if (savedRecipes) setRecipes(savedRecipes);
      }
    }
    loadGame();
  }, []);

  // Save game every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      await SecureStore.setItemAsync('savedGame', JSON.stringify({
        resources,
        tools,
        recipes,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, [resources, tools, recipes]);

  return (
    <GameStateContext.Provider value={{
      resources,
      setResources,
      tools,
      setTools,
      recipes,
      setRecipes,
    }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}