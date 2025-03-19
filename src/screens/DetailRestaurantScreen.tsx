import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar,Image ,TextInput } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';


type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailRestaurant: React.FC<Props> = ({ route }) => {
  const { restaurant } = route.params;
  const [activeTab, setActiveTab] = useState('Overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <ScrollView style={styles.container}>
         
          {/* Contact Information */}
          <View style={styles.section}>
            <Text><Icon name="phone" size={16} /> Phone: 0909090909</Text>
            <Text><Icon name="envelope" size={16} /> Email: comtamcali@gmail.com</Text>
            <Text><Icon name="star" size={16} /> 4.5 (201 reviews)</Text>
          </View>
    
          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>Grill</Text>
              <Text style={styles.category}>Hot Pot</Text>
            </View>
          </View>
    
          {/* Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text>Ho Chi Minh, TP Thủ Đức, Trường Thọ</Text>
            <TextInput style={styles.input} placeholder="Số nhà, đường..." />
          </View>
    
          {/* Social Links */}
          <View style={styles.section}>
            <Text><Icon name="facebook" size={20} /> Facebook: www.facebook.com/comtamcali-tr</Text>
            <Text><Icon name="instagram" size={20} /> Instagram: www.insta.com/comtamcali-truon</Text>
            <Text><Icon name="globe" size={20} /> Website: www.comtamcali.vn</Text>
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
        </ScrollView>
        );
      case 'Menu':
        return restaurant.menu.map((menuItem:any, index:any) => (
          <Text key={index} style={styles.text}>
            {menuItem.name} - {menuItem.price} VND
          </Text>
        ));
      case 'Reviews':
        return (
          <>
            <Text style={styles.text}>"Nhân viên phục vụ rất chu đáo, món ăn trình bày đẹp mắt!" - 5 sao</Text>
            <Text style={styles.text}>"Giá cả hợp lý, không gian đẹp và thoải mái." - 4 sao</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* Hình ảnh */}
      <Image source={{ uri: 'https://placehold.co/600x700' }} style={styles.imagePlaceholder} />

     
      <View style={styles.mainContent}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.address}>{restaurant.address}</Text>
        </View>

        <View style={styles.contentContainer}>
          {/* Tabs */}
          <View style={styles.tabs}>
            {['Overview', 'Menu', 'Reviews'].map(tab => (
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.tabButtonActive
                ]}
                key={tab}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Nội dung cuộn */}
          <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>{renderTabContent()}</View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  imagePlaceholder: { width: "100%", height: "30%", backgroundColor: '#ddd', borderRadius: 10 },
  headerText: { marginLeft: 10 },

  container: { flex: 1 ,paddingTop:30},
 
  imageContainer: {height: 250,overflow: "hidden",},
  //imageBackground: {width: "100%",height: "100%",justifyContent: "flex-end",backgroundColor: "pink",},
  mainContent: {
    flex: 1,
    backgroundColor: "white",
    marginTop: -20, // Đẩy view lên
    padding:20,
    position: "relative", // Đảm bảo cha của overlay là relative
  },
  overlay: {
    position: "absolute",
    top: "-10%", // Hoặc giá trị cố định: 100 (pixel)
    width: "110%",
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  address: { fontSize: 16, color: "#fff" },

  contentContainer: { flex: 1 }, 
  tabs: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10 },
  tab: { fontSize: 16, color: "black", fontWeight: "bold" },
  activeTab: {  },
  tabButtonActive: { 
    paddingVertical: 8, 
    paddingHorizontal: 20, 
    borderBottomWidth: 2, 
    borderBottomColor: 'red',
    backgroundColor: 'rgba(15, 75, 206, 0.34)', 
  },
  

  scrollContainer: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  content: { padding: 10 },
  text: { fontSize: 16, marginBottom: 5 },
  
  link: { color: 'blue' },
  subText: { fontSize: 14, color: 'gray' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 20, borderWidth: 2, borderColor: 'black',color:'black' },
  section: { marginBottom: 15 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  categoryContainer: { flexDirection: 'row' },
  category: { backgroundColor: '#ddd', padding: 5, marginRight: 10, borderRadius: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 5 },
  note: { fontStyle: 'italic', color: 'gray' },
});

export default DetailRestaurant;
