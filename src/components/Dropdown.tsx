import React from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import OverviewStyle from "../styles/OverviewStyles";

const DropdownComponent = ({ label, data, value, onChange }:any) => {
  return (
    <View style={OverviewStyle.row}>
      <Text style={OverviewStyle.label}>{label}</Text>
      <Dropdown
        style={OverviewStyle.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={`Select ${label}`}
        value={value}
        onChange={(item) => onChange(item.value)}
      />
    </View>
  );
};

export default DropdownComponent;
