import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Tool, Resource } from '../types/GameTypes';

interface ToolShopProps {
  tools: Tool[];
  resources: Resource[];
  onPurchase: (toolId: string) => void;
}

export function ToolShop({ tools, resources, onPurchase }: ToolShopProps) {
  const canAfford = (tool: Tool): boolean => {
    return tool.cost.every(cost => {
      const resource = resources.find(r => r.id === cost.resourceId);
      return resource && resource.amount >= cost.amount;
    });
  };

  const getCostText = (tool: Tool): string => {
    return tool.cost.map(cost => 
      `${cost.amount} ${resources.find(r => r.id === cost.resourceId)?.name}`
    ).join(', ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tool Shop</Text>
      <ScrollView>
        {tools.map(tool => !tool.owned && (
          <View key={tool.id} style={styles.toolItem}>
            <Text style={styles.toolName}>{tool.name}</Text>
            <Text style={styles.costText}>Cost: {getCostText(tool)}</Text>
            <TouchableOpacity
              style={[
                styles.buyButton,
                canAfford(tool) ? styles.buyEnabled : styles.buyDisabled
              ]}
              onPress={() => canAfford(tool) && onPurchase(tool.id)}
              disabled={!canAfford(tool)}
            >
              <Text style={styles.buyButtonText}>Buy</Text>
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
  toolItem: {
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
  toolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  costText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  buyButton: {
    marginTop: 8,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buyEnabled: {
    backgroundColor: '#2ecc71',
  },
  buyDisabled: {
    backgroundColor: '#95a5a6',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});