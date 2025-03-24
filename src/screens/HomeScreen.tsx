import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import SearchBar from '../components/SearchBar';
import { useRestaurants, Restaurant } from '../hooks/useRestaurants';



type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { logout } = useAuth();
  const { restaurants, loading, error } = useRestaurants();
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const { height } = Dimensions.get('window');

  // Cập nhật filteredRestaurants khi dữ liệu từ API thay đổi
  useEffect(() => {
    setFilteredRestaurants(restaurants);
  }, [restaurants]);

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  const handleSearch = (text: string) => {
    if (text === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };

  console.log('Dữ liệu đang hiển thị:', filteredRestaurants);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#33CCFF" />

      <View style={[HomeScreenStyles.headerBackground, { height: height * 0.33 }]} />

      <View style={HomeScreenStyles.container}>
        <Text style={HomeScreenStyles.TextTrangChu}>Danh Sách Nhà Hàng</Text>
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={filteredRestaurants}
            keyExtractor={(restaurant) => restaurant.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={HomeScreenStyles.card}
              onPress={() => navigation.navigate("Detail", { restaurantId: item.id })}

              >
                <Image
                  source={{ uri: item.image && item.image !== "" ? item.image : "https://via.placeholder.com/150" }}
                  style={HomeScreenStyles.image}
                />
                <View style={HomeScreenStyles.info}>
                  <Text style={HomeScreenStyles.name}>{item.name}</Text>
                  <Text style={HomeScreenStyles.address}>{item.address}</Text>
                  <Text style={HomeScreenStyles.rating}>⭐ {item.rating}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;