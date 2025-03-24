import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import OverviewStyle from "../../../styles/OverviewStyles";

const ContactInfo = () => {
  return (
    <View style={OverviewStyle.section}>
      <View>
      <Text style={OverviewStyle.item}>
        Phone:{" "}
        <Text style={{ color: "blue", textDecorationLine: "underline" }} >0909090909{" "}
        </Text>
        <Icon name="phone" size={16} color="blue" /> 
      </Text>

      <Text style={OverviewStyle.item}>Email: 
        <Text style={{ color: "blue", textDecorationLine: "underline" }}>
          {" "}comtamcali@gmail.com
        </Text>
      </Text>
    </View>
      <View style={[OverviewStyle.item, OverviewStyle.reviews]}>
        <Text style={OverviewStyle.text}>
          <Icon name="star" size={16} /> 4.5 (201 reviews)
        </Text>
        <Icon name="angle-right" size={32} />
      </View>
    </View>
  );
};

export default ContactInfo;