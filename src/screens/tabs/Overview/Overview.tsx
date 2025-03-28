import React from "react";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import ContactInfo from './ContactInfo';
import CategoryList from './Category';
import AddressForm from './AddressForm';
import SocialLinks from './SocialLink';
import PartnerInfo from './PartnerInfo';
import NotesSection from './NotesSection';
import DropdownComponent from '../../../components/Dropdown';
import OverviewStyle from '../../../styles/OverviewStyles';
import { useOverviewLogic } from '../../../hooks/useOverView';

const OverviewContent = () => {
  const {
    showAlert,
    categories,
    addCategory,
    removeCategory,
    selectedCity,
    setSelectedCity,
    selectedWard1,
    setSelectedWard1,
    selectedWard2,
    setSelectedWard2,
    selectedPC,
    setSelectedPC,
    cities,
    wards,
    subWards,
    pcList,
  } = useOverviewLogic();

  return (
    <PaperProvider>
      <View style={OverviewStyle.container}>
        <ContactInfo />
        <CategoryList categories={categories} addCategory={addCategory} removeCategory={removeCategory} />

        <View style={OverviewStyle.containerDropdown}>
          <DropdownComponent label="City" data={cities} value={selectedCity} onChange={setSelectedCity} />
          <DropdownComponent label="Ward" data={wards} value={selectedWard1} onChange={setSelectedWard1} />
          <DropdownComponent label="Ward 2" data={subWards} value={selectedWard2} onChange={setSelectedWard2} />
        </View>
        <AddressForm onPressAction={showAlert} />
        <SocialLinks />
        <PartnerInfo selectedPC={selectedPC} setSelectedPC={setSelectedPC} pcList={pcList} />
        <NotesSection />
      </View>
    </PaperProvider>
  );
};

export default OverviewContent;