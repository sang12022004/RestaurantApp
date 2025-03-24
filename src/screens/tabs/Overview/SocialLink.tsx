import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import OverviewStyle from "../../../styles/OverviewStyles";

const SocialLinks = () => {
  return (
    <View style={OverviewStyle.section}>
      {["Facebook", "Instagram", "Website"].map((platform, index) => (
        <View key={index} style={OverviewStyle.formRow}>
          <Text style={OverviewStyle.sectionTitle}>{platform}</Text>
          <TextInput style={OverviewStyle.input} placeholder={`Enter ${platform} link`} mode="outlined" />
        </View>
      ))}
    </View>
  );
};

export default SocialLinks;