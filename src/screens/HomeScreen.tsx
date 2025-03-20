import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import { restaurants } from '../services/restaurantService';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import SearchBar from '../components/SearchBar';
import SpeechToText from '../components/SpeechToText';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
import { useNavigation } from '@react-navigation/native';
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { logout } = useAuth();
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const { height } = Dimensions.get('window'); // Lấy chiều cao màn hình

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  const handleSearch = (text: string) => {
    if (text === '') {
      setFilteredRestaurants(restaurants); // Hiển thị tất cả nếu ô tìm kiếm trống
    } else {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };
  console.log('Dữ liệu đang hiển thị:', filteredRestaurants);
  console.log('Danh sách nhà hàng:', restaurants);
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#33CCFF" />

      {/* Phần nền xanh mở rộng lên trên */}
      <View style={[HomeScreenStyles.headerBackground, { height: height * 0.33 }]} />

      <View style={HomeScreenStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SpeechToText')}>
        <Text>Speech to Text</Text>
      </TouchableOpacity>
        <Text style={HomeScreenStyles.TextTrangChu}>Danh Sách Nhà Hàng</Text>
        <SearchBar onSearch={handleSearch} />
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(restaurant) => restaurant.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={HomeScreenStyles.card} 
              //onPress={() => navigation.navigate('Detail', { restaurant: item })}
            >
              <Image source={{ uri: item.image }} style={HomeScreenStyles.image} />
              <View style={HomeScreenStyles.info}>
                <Text style={HomeScreenStyles.name}>{item.name}</Text>
                <Text style={HomeScreenStyles.address}>{item.address}</Text>
                <Text style={HomeScreenStyles.rating}>⭐ {item.rating}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
