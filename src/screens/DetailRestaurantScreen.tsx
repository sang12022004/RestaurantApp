import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailRestaurant: React.FC<Props> = ({ route }) => {
  const { restaurant  } = route.params; // Lấy tham số 
  const [activeTab, setActiveTab] = useState('Overview'); // Trạng thái tab hiện tại

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Text>{restaurant.overview}</Text>;
        case 'Menu':
          return (
            <>
              {restaurant.menu.map((menuItem, index) => (
                <Text key={index}>
                  {menuItem.name} - {menuItem.price} VND
                </Text>
              ))}
            </>
          );
        
      case 'Reviews':
        return (
          <>
            <Text>- "Nhân viên phục vụ rất chu đáo, món ăn trình bày đẹp mắt!" - 5 sao</Text>
            <Text>- "Giá cả hợp lý, không gian đẹp và thoải mái." - 4 sao</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Image
        source={{ uri: "https://via.placeholder.com/300x200" }}
        style={styles.image}
      />

      <View style={styles.header}>
        <Text style={styles.title}>{restaurant.name}</Text>
      </View>
      <Text style={styles.address}>{restaurant.address}</Text>
      {/* Thông tin */}
      <View style={styles.info}>
       {/* Số điện thoại */}
        <Text style={styles.text}>Phone: 0909090909</Text>

        {/* Email */}
        <Text style={styles.text}>Email: comtamcali@gmail.com</Text>
        
        <Text style={styles.hours}>{restaurant.hours}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('Overview')}>
          <Text style={[styles.tab, activeTab === 'Overview' && styles.activeTab]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Menu')}>
          <Text style={[styles.tab, activeTab === 'Menu' && styles.activeTab]}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Reviews')}>
          <Text style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]}>Reviews</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {renderTabContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", },
  header: { flexDirection: "row", padding: 10, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginLeft: 10,textAlign: "center" },
  image: { width: "100%", height: 200, backgroundColor: "pink" },
  info: { padding: 10 },
  name: { fontSize: 20, fontWeight: "bold" },
  rating: { marginTop: 5, color: "orange" },
  address: { marginTop: 5, color: "gray" },
  hours: { marginTop: 5, color: "gray" },
  tabs: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  tab: { fontSize: 16, color: "blue", fontWeight: "bold" },
  activeTab: { color: "red", textDecorationLine: "underline" },
  content: { padding: 10 },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DetailRestaurant;
