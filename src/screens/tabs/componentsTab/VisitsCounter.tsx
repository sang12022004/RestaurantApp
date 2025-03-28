import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import VisitsCounterStyle from "../stylesTabs/VisitsCounterStyles"; // Đảm bảo file style có đúng tên

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={VisitsCounterStyle.counterContainer}>
      <Text style={VisitsCounterStyle.counterLabel}>Visits</Text>
      <View style={VisitsCounterStyle.counterDisplay}>
        <Text style={VisitsCounterStyle.counterText}>{count}</Text>
      </View>
      <View style={VisitsCounterStyle.buttonContainer}>
        <TouchableOpacity style={VisitsCounterStyle.counterButton} onPress={() => setCount(count + 1)}>
          <FontAwesome name="caret-up" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={VisitsCounterStyle.counterButton} onPress={() => setCount(count - 1)}>
          <FontAwesome name="caret-down" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;
