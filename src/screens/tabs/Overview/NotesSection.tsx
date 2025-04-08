import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import OverviewStyle from "../../../styles/OverviewStyles";
import Icons from "react-native-vector-icons/FontAwesome";


const NotesSection = ({ note, setNote }) => {
 
  return (
    <View style={OverviewStyle.section}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginRight: 10 }}>Notes</Text>
        <TouchableOpacity>
          <Icons name="microphone" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={OverviewStyle.note}
        multiline={true}
        placeholder="Nhập ghi chú..."
        value={note}
        onChangeText={setNote}
        />
    </View>
  );
};

export default NotesSection;
