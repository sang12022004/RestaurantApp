import React, {  useEffect } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import OverviewStyle from "../../../styles/OverviewStyles";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { useRestaurantDetail } from '../../../hooks/useRestaureantDetail';

// type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const SocialLinks = ({ facebook, setFacebook, instagram, setInstagram, website, setWebsite }:any) => {
  // const route = useRoute<DetailScreenRouteProp>();
  // const { restaurantId } = route.params;
  // const { restaurant } = useRestaurantDetail(restaurantId);

// Cập nhật giá trị mặc định nếu có từ restaurant
// useEffect(() => {
//   if (restaurant?.facebook) {
//     setFacebook(restaurant.facebook);
//   }
//   if (restaurant?.instagram) {
//     setInstagram(restaurant.instagram);
//   }
//   if (restaurant?.website) {
//     setWebsite(restaurant.website);
//   }
// }, [restaurant,setFacebook,setInstagram,setWebsite]); 

  return (
    <View style={OverviewStyle.section}>
      <View style={OverviewStyle.formRow}>
        <Text style={OverviewStyle.sectionTitle}>Facebook</Text>
        <TextInput
          style={OverviewStyle.input}
          placeholder={'Link facebook'}
          mode="outlined"
          value={facebook}
          onChangeText={setFacebook}  // Cập nhật giá trị khi thay đổi
        />
      </View>

      <View style={OverviewStyle.formRow}>
        <Text style={OverviewStyle.sectionTitle}>Instagram</Text>
        <TextInput
          style={OverviewStyle.input}
          placeholder={'Link Instagram'}
          mode="outlined"
          value={instagram}
          onChangeText={setInstagram}  // Cập nhật giá trị khi thay đổi
        />
      </View>

      <View style={OverviewStyle.formRow}>
        <Text style={OverviewStyle.sectionTitle}>Website</Text>
        <TextInput
          style={OverviewStyle.input}
          placeholder={'Link Website'}
          mode="outlined"
          value={website}
          onChangeText={setWebsite}  // Cập nhật giá trị khi thay đổi
        />
      </View>
    </View>
  );
};

export default SocialLinks;
