import React,{useState} from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import OverviewStyle from "../../../styles/OverviewStyles";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { useRestaurantDetail } from '../../../hooks/useRestaureantDetail';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const ContactInfo = () => {
  const route = useRoute<DetailScreenRouteProp>();
    const { restaurantId } = route.params;
  
    const { restaurant, loading, error } = useRestaurantDetail(restaurantId);
    const [activeTab, setActiveTab] = useState('Overview');
    
  return (
    <View style={OverviewStyle.section}>
      <View>
      <Text style={OverviewStyle.item}>
        Phone:
        <Text style={{ color: "blue", textDecorationLine: "underline" }} >{restaurant?.phone}
        </Text>
        <Icon name="phone" size={16} color="blue" /> 
      </Text>

      <Text style={OverviewStyle.item}>Email: 
        <Text style={{ color: "blue", textDecorationLine: "underline" }}>
          {restaurant?.email}
        </Text>
      </Text>
    </View>
      <View style={[OverviewStyle.item, OverviewStyle.reviews]}>
        <Text style={OverviewStyle.text}>
          <Icon name="star" size={16} /> {restaurant?.rating} (201 reviews)
        </Text>
        <Icon name="angle-right" size={32} />
      </View>
    </View>
  );
};

export default ContactInfo;