import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface UpdateButtonProps {
  text: string;
  action: () => void;
}

export default function UpdateButton({ text, action }: UpdateButtonProps) {
  return (
   <><View>
   <TouchableOpacity style={styles.button} onPress={action}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
