import React,{useState} from "react";
import { View, Text,TouchableOpacity } from "react-native";
import DropdownComponent from '../../../components/Dropdown';
import Couter from '../../tabs/componentsTab/Couter';
import OverviewStyle from "../../../styles/OverviewStyles";
import TextPartnerInfo from "../componentsTab/TextPartnerInfo";
import Icons from "react-native-vector-icons/FontAwesome";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { useRestaurantDetail } from '../../../hooks/useRestaureantDetail';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const PartnerInfo = ({ selectedPC, setSelectedPC, pcList }:any) => {
  const route = useRoute<DetailScreenRouteProp>();
    const { restaurantId } = route.params;
  
    const { restaurant, loading, error } = useRestaurantDetail(restaurantId);
    const [activeTab, setActiveTab] = useState('Overview');
  return (
    <View style={OverviewStyle.section}>
    <View style={{ paddingTop:10,borderTopWidth: 2, borderBottomWidth: 2, borderColor: 'black'}}>
    <View style={OverviewStyle.row}>
     <Text style={OverviewStyle.sectionTitle}>Partnerred</Text>
      <TouchableOpacity >
          <Icons name="check-square-o" size={20} color="black" />
        </TouchableOpacity>
     </View>
        <TouchableOpacity style={OverviewStyle.addButton}>
          <Icons name="chevron-down" size={20} color="black" />
        </TouchableOpacity>
    </View>
    <View style={OverviewStyle.row}>
      <Couter />
      <DropdownComponent label="PiC" data={pcList} value={selectedPC} onChange={setSelectedPC} />

      <TextPartnerInfo label="Monthly Use" value={restaurant?.partnership?.monthly_use??""}/>
      <TextPartnerInfo label="Budget" value={restaurant?.partnership?.budget??""}/>
      <TextPartnerInfo label="Provider" value={restaurant?.partnership?.provider??""}/>
      </View>
    </View>
  );
};

export default PartnerInfo;