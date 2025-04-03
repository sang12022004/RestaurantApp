import React,{useState} from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import OverviewStyle from "../../../styles/OverviewStyles";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { useRestaurantDetail } from '../../../hooks/useRestaureantDetail';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const SocialLinks = () => {
  const route = useRoute<DetailScreenRouteProp>();
    const { restaurantId } = route.params;
  
    const { restaurant, loading, error } = useRestaurantDetail(restaurantId);
    const [activeTab, setActiveTab] = useState('Overview');
  return (
    <View style={OverviewStyle.section}>
        <View style={OverviewStyle.formRow}>
          <Text style={OverviewStyle.sectionTitle}>Facebook</Text>
          <TextInput
            style={OverviewStyle.input}
            placeholder={restaurant?.facebook}
            mode="outlined"
          />
        </View>
        <View style={OverviewStyle.formRow}>
          <Text style={OverviewStyle.sectionTitle}>Instagram</Text>
          <TextInput
            style={OverviewStyle.input}
            placeholder={restaurant?.instagram}
            mode="outlined"
          />
        </View>
        <View style={OverviewStyle.formRow}>
          <Text style={OverviewStyle.sectionTitle}>Website</Text>
          <TextInput
            style={OverviewStyle.input}
            placeholder={restaurant?.website}
            mode="outlined"
          />
        </View>
    </View>
  );
};

export default SocialLinks;