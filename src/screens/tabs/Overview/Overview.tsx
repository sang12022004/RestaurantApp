import React, { useEffect, useState } from "react";
import { View,  StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import ContactInfo from './ContactInfo';
import CategoryList from './Category';
import SocialLinks from './SocialLink';
import PartnerInfo from './PartnerInfo';
import NotesSection from './NotesSection';
import OverviewStyle from '../../../styles/OverviewStyles';
import { useOverviewLogic } from '../../../hooks/useOverview';
import { Restaurant } from '../../../types/restaurantTypes';
import { useCategories } from "../../../hooks/useCategories";
import RestaurantLocationSelector from '../../../components/RestaurantLocationSelector';

type OverviewContentProps = {
  restaurant: Restaurant;
};

const styles = StyleSheet.create({
    locationWrapper: {
      marginTop: 16,
    },
  });

const OverviewContent: React.FC<OverviewContentProps> = ({ restaurant }) => {

  const {selectedPC,setSelectedPC, pcList} = useOverviewLogic();//dung cho partnership

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
    // setCategories(
    //   restaurant.categories
    //     ? restaurant.categories.split(",").map((item) => item.trim())
    //     : []
    // );
  }, [restaurant]);

  return (
    <PaperProvider>
      <View style={OverviewStyle.container}>
        <ContactInfo />
        <CategoryList categories={categories} addCategory={addCategory} removeCategory={removeCategory} />
          <View style={styles.locationWrapper}>
            <RestaurantLocationSelector />
          </View>
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
