import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import OverviewStyle from "../../../styles/OverviewStyles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { useRestaurantDetail } from "../../../hooks/useRestaureantDetail";

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

const AddressForm = ({ onPressAction }: { onPressAction: () => void }) => {
  const route = useRoute<DetailScreenRouteProp>();
  const { restaurantId } = route.params;
  const { restaurant } = useRestaurantDetail(restaurantId);

  const [address, setAddress] = useState("");

  // Cập nhật state khi dữ liệu nhà hàng thay đổi
  useEffect(() => {
    if (restaurant?.address) {
      setAddress(restaurant.address);
    }
  }, [restaurant]);

  return (

    <View style={OverviewStyle.section}>
      <View style={OverviewStyle.formRow}>
        <Text style={OverviewStyle.sectionTitle}>Address</Text>
        <TextInput
          style={OverviewStyle.input}
          placeholder="Nhập địa chỉ"
          mode="outlined"
          right={<TextInput.Icon icon="microphone" onPress={onPressAction} />}
          value={address}
          onChangeText={setAddress} // Cập nhật state khi nhập liệu
        />
      </View>
    </View>
  );
};

export default AddressForm;
