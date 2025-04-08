import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import ContactInfo from './ContactInfo';
import CategoryList from './Category';
// import AddressForm from './AddressForm';
import SocialLinks from './SocialLink';
import PartnerInfo from './PartnerInfo';
import NotesSection from './NotesSection';
// import DropdownComponent from '../../../components/Dropdown';
import OverviewStyle from '../../../styles/OverviewStyles';
import { useOverviewLogic } from '../../../hooks/useOverview';
import { Restaurant } from '../../../types/restaurantTypes'; // ✅ import kiểu Restaurant
import { useCategories } from "../../../hooks/useCategories";

type OverviewContentProps = {
  restaurant: Restaurant;
};

const OverviewContent: React.FC<OverviewContentProps> = ({ restaurant }) => {
  const {
    //showAlert,
    // categories,
    // addCategory,
    // removeCategory,
    // selectedCity,
    // setSelectedCity,
    // selectedWard1,
    // setSelectedWard1,
    // selectedWard2,
    // setSelectedWard2,
    selectedPC,
    setSelectedPC,
    // cities,
    // wards,
    // subWards,
    pcList,
  } = useOverviewLogic();

  // Khởi tạo state từ prop restaurant
  const [facebook, setFacebook] = useState(restaurant.facebook || '');
  const [instagram, setInstagram] = useState(restaurant.instagram || '');
  const [website, setWebsite] = useState(restaurant.website || '');
   const { categories,setCategories,addCategory, removeCategory} = useCategories();
  const [note, setNote] = useState(restaurant.note || '');

  useEffect(() => {
    setFacebook(restaurant.facebook || '');
    setInstagram(restaurant.instagram || '');
    setWebsite(restaurant.website || '');
    setNote(restaurant.note || '');
    setCategories(
      restaurant.categories
        ? restaurant.categories.split(",").map((item) => item.trim())
        : []
    );
  }, [restaurant,setCategories]);
  

  return (
    <PaperProvider>
      <View style={OverviewStyle.container}>
        <ContactInfo />
        <CategoryList categories={categories} addCategory={addCategory} removeCategory={removeCategory} />

        {/* <View style={OverviewStyle.containerDropdown}>
          <DropdownComponent label="City" data={cities} value={selectedCity} onChange={setSelectedCity} />
          <DropdownComponent label="Ward" data={wards} value={selectedWard1} onChange={setSelectedWard1} />
          <DropdownComponent label="Ward 2" data={subWards} value={selectedWard2} onChange={setSelectedWard2} />
        </View>
        <AddressForm onPressAction={showAlert} /> */}

        <SocialLinks 
          facebook={facebook}
          setFacebook={setFacebook}
          instagram={instagram}
          setInstagram={setInstagram}
          website={website}
          setWebsite={setWebsite}
        />
        <PartnerInfo selectedPC={selectedPC} setSelectedPC={setSelectedPC} pcList={pcList} />
        <NotesSection note={note} setNote={setNote} />
      </View>
    </PaperProvider>
  );
};

export default OverviewContent;
