import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const TextPartnerInfo = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput style={styles.input} value={value} editable={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight:10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  input: {
   
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#f9f9f9",
  },
});

export default TextPartnerInfo;