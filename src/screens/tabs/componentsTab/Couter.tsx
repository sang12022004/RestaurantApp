import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Import FontAwesome

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Visits</Text>
      <View style={styles.box}>
        <Text style={styles.count}>{count}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
          <FontAwesome name="caret-up" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setCount(count - 1)}>
          <FontAwesome name="caret-down" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginRight: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  box: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
   
  },
  count: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Counter;