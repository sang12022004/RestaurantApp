import React,{useState} from "react";
import { View, Text,TouchableOpacity } from "react-native";
import OverviewStyle from "../../../styles/OverviewStyles";
import { TextInput } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/FontAwesome";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { useRestaurantDetail } from '../../../hooks/useRestaureantDetail';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const NotesSection = () => {

  const route = useRoute<DetailScreenRouteProp>();
      const { restaurantId } = route.params;
    
      const { restaurant, loading, error } = useRestaurantDetail(restaurantId);
      const [activeTab, setActiveTab] = useState('Overview');
  return (

  <View style={OverviewStyle.section}>
  <View style={{flexDirection:'row'}}>
  <Text style={{marginRight:10}}>Notes</Text>
  <TouchableOpacity>
    <Icons name="microphone" size={20} color="black" />
  </TouchableOpacity>
  </View>
      <TextInput style={OverviewStyle.note} multiline={true}>
        {restaurant?.note}
      </TextInput>
    </View>
  );
};

export default NotesSection;