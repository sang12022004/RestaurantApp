import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import OverviewStyle from "../../../styles/OverviewStyles";

const AddressForm = ({ onPressAction }: { onPressAction: () => void }) => {
    return (
      <View style={OverviewStyle.section}>
        <View style={OverviewStyle.formRow}>
          <Text style={OverviewStyle.sectionTitle}>Address</Text>
          <TextInput
            style={OverviewStyle.input}
            placeholder="Số nhà, đường..."
            mode="outlined"
            right={<TextInput.Icon icon="microphone" onPress={onPressAction} />}
          />
        </View>
      </View>
    );
  };

  export default AddressForm;