import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { Resource } from "../types/GameTypes";

interface ResourceButtonProps {
  resource: Resource;
  onGather: (resourceId: string) => void;
}

export function ResourceButton({ resource, onGather }: ResourceButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onGather(resource.id)}
    >
      <View style={styles.gatherButton}>
        {resource.image ? (
          <Image source={resource.image} style={styles.resourceImage} />
        ) : (
          <Text style={styles.buttonText}>Gather {resource.name}</Text>
        )}
        <Text style={styles.amountText}>
          {Math.floor(resource.amount)} {resource.name}
        </Text>
        {resource.autoPerSecond > 0 && (
          <Text style={styles.autoText}>+{resource.autoPerSecond}/sec</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  gatherButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resourceImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  amountText: {
    fontSize: 16,
    color: "#34495e",
    marginTop: 4,
  },
  autoText: {
    fontSize: 14,
    color: "#2ecc71",
    marginTop: 2,
  },
});
