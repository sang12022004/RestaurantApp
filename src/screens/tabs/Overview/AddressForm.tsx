import React,{useState} from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import OverviewStyle from "../../../styles/OverviewStyles";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { useRestaurantDetail } from '../../../hooks/useRestaureantDetail';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const AddressForm = ({ onPressAction }: { onPressAction: () => void }) => {

  const route = useRoute<DetailScreenRouteProp>();
    const { restaurantId } = route.params;
  
    const { restaurant, loading, error } = useRestaurantDetail(restaurantId);
    const [activeTab, setActiveTab] = useState('Overview');
    return (
      <View style={OverviewStyle.section}>
        <View style={OverviewStyle.formRow}>
          <Text style={OverviewStyle.sectionTitle}>Address</Text>
          <TextInput
            style={OverviewStyle.input}
            placeholder={restaurant?.address}
            mode="outlined"
            right={<TextInput.Icon icon="microphone" onPress={onPressAction} />}
          />
        </View>
      </View>
    );
  };
  
  export default AddressForm;
  