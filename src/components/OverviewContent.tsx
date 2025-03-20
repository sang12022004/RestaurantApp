import React, { useState } from "react";
import { View, Text, StyleSheet, Alert,TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput, Provider as PaperProvider } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";

const OverviewContent: React.FC = () => {

  const showAlert = () => {
    Alert.alert("Thông báo", "Bạn đã nhấn vào icon micro");
  };
  const [categories, setCategories] = useState(["Grill", "Hot pot"]);

  const addCategory = () => {
    const newCategory = `New ${categories.length + 1}`;
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (index:any) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };
 
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedWard1, setSelectedWard1] = useState(null);
    const [selectedWard2, setSelectedWard2] = useState(null);

    const cities = [
        { label: "Ho Chi Minh", value: "ho-chi-minh" },
        { label: "Ha Noi", value: "ha-noi" },
      ];

      const wards = [
        { label: "TP Thu Duc", value: "tp-thu-duc" },
        { label: "Quan 1", value: "quan-1" },
        { label: "Quan 7", value: "quan-7" },
      ];

      const subWards = [
        { label: "Truong Tho", value: "truong-tho" },
        { label: "Linh Dong", value: "linh-dong" },
        { label: "Binh Tho", value: "binh-tho" },
      ];


  return (
    <PaperProvider>
      <View style={styles.container}>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.item}>
            <Icon name="phone" size={16} /> Phone: 0909090909
          </Text>
          <Text style={styles.item}>
            <Icon name="envelope" size={16} /> Email: comtamcali@gmail.com
          </Text>
          <View style={[styles.item, styles.reviews]}>
            <Text style={styles.text}>
                <Icon name="star" size={16} /> 4.5 (201 reviews)
            </Text>
            <Icon name="angle-right" size={32} />
            </View>
        </View>


        {/* Categories */}
        <View style={styles.Categories}>
            <Text style={styles.titleCategories}>Categorie:</Text>

            <View>
                <View style={styles.categoryContainer}>
                {categories.map((item, index) => (
                    <View key={index} style={styles.category}>
                    <TouchableOpacity onPress={() => removeCategory(index)} style={styles.removeButton}>
                        <Text style={styles.removeText}>✕</Text>
                    </TouchableOpacity>
                    <Text style={styles.categoryText}>{item}</Text>
                    </View>
                ))}
                </View>
                {/* Nút +  */}
                <TouchableOpacity style={styles.addButton} onPress={addCategory}>
                <Icon name="plus" size={20} color="black" />
                </TouchableOpacity>
            </View>
            </View>


       <View style={styles.containerDropdown}>
         {/* Dropdown City */}
         <View style={styles.row}>
                <Text style={styles.label}>City</Text>
                <Dropdown
                style={styles.dropdown}
                data={cities}
                labelField="label"
                valueField="value"
                placeholder="Select city"
                value={selectedCity}
                onChange={(item) => setSelectedCity(item.value)}
                />
            </View>

            {/* Dropdown Ward 1 */}
            <View style={styles.row}>
                <Text style={styles.label}>Ward</Text>
                <Dropdown
                style={styles.dropdown}
                data={wards}
                labelField="label"
                valueField="value"
                placeholder="Select ward"
                value={selectedWard1}
                onChange={(item) => setSelectedWard1(item.value)}
                />
            </View>

            {/* Dropdown Ward 2 */}
            <View style={styles.row}>
                <Text style={styles.label}>Ward 2</Text>
                <Dropdown
                style={styles.dropdown}
                data={subWards}
                labelField="label"
                valueField="value"
                placeholder="Select ward"
                value={selectedWard2}
                onChange={(item) => setSelectedWard2(item.value)}
                />
            </View>
       </View>

        {/* Address */}
        <View style={styles.section}>
          <View style={styles.formRow}>
            <Text style={styles.sectionTitle}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Số nhà, đường..."
              mode="outlined"
              right={<TextInput.Icon icon="microphone" onPress={showAlert} />}
            />
          </View>
        </View>

        {/* Social Links */}
        <View style={styles.section}>
          <View style={styles.formRow}>
            <Text style={styles.sectionTitle}>Facebook</Text>
            <TextInput
              style={styles.input}
              placeholder="www.facebook.com/comtamcali-tr"
              mode="outlined"
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.sectionTitle}>Instagram</Text>
            <TextInput
              style={styles.input}
              placeholder="www.insta.com/comtamcali-truon"
              mode="outlined"
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.sectionTitle}>Website</Text>
            <TextInput
              style={styles.input}
              placeholder="www.comtamcali.vn"
              mode="outlined"
            />
          </View>
        </View>

        {/* Business Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Info</Text>
          <Text>Visits: 3</Text>
          <Text>Person in Charge: Phuc Hua</Text>
          <Text>Monthly Use: 200 kg</Text>
          <Text>Budget: 15,000</Text>
          <Text>Provider: PNP Global Supply</Text>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.note}>
            Có khả năng sẽ giảm lượng than tiêu thụ kể từ sau Tết, do tình hình kinh doanh không ổn định.
          </Text>
        </View>

      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
      },
      
      section: {
        marginBottom: 16,
      },
      
      titleCategories: {
        flex: 1,
        fontWeight: "bold",
      },
      
      formRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
      },
      
      containerDropdown: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      
      reviews: {
        borderBottomWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
      },
      
      item: {
        flexDirection: "row",
        alignItems: "center",
        lineHeight: 24,
      },
      
      Categories: {
        borderBottomWidth: 2,
        marginBottom: 20,
      },
      
      sectionTitle: {
        fontWeight: "bold",
        marginRight: 10,
        width: 70,
      },
      
      row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      },
      
      label: {
        width: 40,
        fontWeight: "bold",
        marginRight: 10,
      },
      
      dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        width: 130,
      },
      
      input: {
        flex: 1,
        backgroundColor: "white",
      },
      
      note: {
        fontStyle: "italic",
        color: "gray",
      },
      
      text: {
        flexDirection: "row",
        alignItems: "center",
      },
      
      categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        margin: 15,
      },
      
      category: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        marginTop: 10,
      },
      
      removeButton: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
      },
      
      removeText: {
        fontSize: 12,
        color: "black",
      },
      
      categoryText: {
        fontSize: 14,
        fontWeight: "bold",
      },
      
      addButton: {
        position: "absolute",
        borderColor: "black",
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        right: 0,
      },
      

});

export default OverviewContent;
