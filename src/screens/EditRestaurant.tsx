import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Switch, } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/AddRestaurantStyles";
import { useRestaurantDetail } from "../hooks/useRestaureantDetail";
import NotesSection from "./tabs/Overview/NotesSection";
import CategoryList from './tabs/Overview/Category'; 
import { useCategories } from "../hooks/useCategories";



type RootStackParamList = {
  EditRestaurant: { restaurantId: string };
};
type EditRestaurantRouteProp = RouteProp<RootStackParamList, "EditRestaurant">;

const EditRestaurantScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<EditRestaurantRouteProp>();
  const { restaurantId } = route.params;

  const { restaurant, loading: loadingDetail, updateRestaurant } =useRestaurantDetail(restaurantId);
  const { categories, setCategories,addCategory, removeCategory} = useCategories();
 
  // const {selectedPC,setSelectedPC, pcList} = useOverviewLogic();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    openTime: "00:00",
    categories:'',
    closeTime: "00:00",
    facebook: "",
    instagram: "",
    website: "",
    note: "",
    isVerified: false,
  });
  const [loading, setLoading] = useState(false);

  // Populate data from hook into the form
  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        phone: restaurant.phone || "",
        email: restaurant.email || "",
        openTime: restaurant.open_time || "",
        closeTime: restaurant.close_time || "",
        categories:restaurant.categories || "",
        facebook: restaurant.facebook || "",
        instagram: restaurant.instagram || "",
        website: restaurant.website || "",
        note: restaurant.note || "",
        isVerified: restaurant.is_verified || false,
      });
    
      setCategories(
        restaurant.categories
          ? restaurant.categories.split(",").map((item) => item.trim())
          : []
      );
   
    }
  }, [restaurant,setCategories]);

  // Standardize time format to HH:mm
  const normalizeTime = (timeStr: string): string =>
    /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(timeStr) ? timeStr : "00:00";

  // Update form field
  const handleChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Save changes
  const handleSaveChanges = async () => {
    if (!restaurant) return;

    const phone = formData.phone.trim();
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      Alert.alert("Lỗi", "Số điện thoại phải có đúng 10 chữ số.");
      return;
    }
    try {
      setLoading(true);

      const updatedData = {
        ...formData,
        categories:categories.join(', '),
        open_time: normalizeTime(formData.openTime),
        close_time: normalizeTime(formData.closeTime),
        updatedAt: new Date().toISOString(),
      };

      await updateRestaurant(updatedData);

      Alert.alert('Thông báo','Cập nhật thành công');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  if (loadingDetail) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Tên nhà hàng:</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(value) => handleChange("name", value)}
      />

      <Text style={styles.label}>Số điện thoại:</Text>
      <TextInput
        style={styles.input}
        value={formData.phone}
        keyboardType="phone-pad"
        onChangeText={(value) => handleChange("phone", value)}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        keyboardType="email-address"
        onChangeText={(value) => handleChange("email", value)}
      />

      <Text style={styles.label}>Giờ mở cửa:</Text>
      <TextInput
        style={styles.input}
        value={formData.openTime}
        onChangeText={(value) => handleChange("openTime", value)}
      />

      <Text style={styles.label}>Giờ đóng cửa:</Text>
      <TextInput
        style={styles.input}
        value={formData.closeTime}
        onChangeText={(value) => handleChange("closeTime", value)}
      />

      <CategoryList
          categories={categories}
          addCategory={addCategory}
          removeCategory={removeCategory}
        />

      <Text style={styles.label}>Facebook:</Text>
      <TextInput
        style={styles.input}
        value={formData.facebook}
        onChangeText={(value) => handleChange("facebook", value)}
      />

      <Text style={styles.label}>Instagram:</Text>
      <TextInput
        style={styles.input}
        value={formData.instagram}
        onChangeText={(value) => handleChange("instagram", value)}
      />

      <Text style={styles.label}>Website:</Text>
      <TextInput
        style={styles.input}
        value={formData.website}
        onChangeText={(value) => handleChange("website", value)}
      />

      <NotesSection
        note={formData.note}
        setNote={(value:any) => handleChange("note", value)}
       />


      <View style={styles.switchContainer}>
        <Text style={styles.label}>Xác minh:</Text>
        <Switch
          value={formData.isVerified}
          onValueChange={(value) => handleChange("isVerified", value)}
        />
      </View>

      
      {/* <PartnerInfo selectedPC={selectedPC} setSelectedPC={setSelectedPC} pcList={pcList}/> */}

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Icon name="save" size={20} color="white" />
          <Text style={styles.buttonText}>Cập Nhật Nhà Hàng</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default EditRestaurantScreen;