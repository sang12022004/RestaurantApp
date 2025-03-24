import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import OverviewStyle from "../../../styles/OverviewStyles";
import { TextInput } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/FontAwesome";

const NotesSection = () => {
  return (

  <View style={OverviewStyle.section}>
  <View style={{flexDirection:'row'}}>
  <Text style={{marginRight:10}}>Notes</Text>
  <TouchableOpacity>
    <Icons name="microphone" size={20} color="black" />
  </TouchableOpacity>
  </View>
      <TextInput style={OverviewStyle.note} multiline={true}>
        Có khả năng sẽ giảm lượng than tiêu thụ kể từ sau Tết, do tình hình kinh doanh không ổn định.
      </TextInput>
    </View>
  );
};

export default NotesSection;
