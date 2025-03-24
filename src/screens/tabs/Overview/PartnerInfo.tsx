import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import DropdownComponent from '../../../components/Dropdown';
import Couter from '../../../components/Couter';
import OverviewStyle from "../../../styles/OverviewStyles";
import TextPartnerInfo from "../componentsTab/TextPartnerInfo";
import Icons from "react-native-vector-icons/FontAwesome";

const PartnerInfo = ({ selectedPC, setSelectedPC, pcList }:any) => {
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

      <TextPartnerInfo label="Monthly Use" value="200 kg"/>
      <TextPartnerInfo label="Budget" value="15,000"/>
      <TextPartnerInfo label="Provider" value="PNP Global Supply"/>
      </View>
    </View>
  );
};

export default PartnerInfo;