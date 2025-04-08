import React, { useState,useEffect  } from 'react';
import { TouchableOpacity, StatusBar, ScrollView, View, Text, Image, StyleSheet, TextInput,Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import Icons from 'react-native-vector-icons/FontAwesome';
import RestaurantDetailStyles from '../styles/RestaurantDetailStyles';
import Tabs from './tabs/tabs';
import RestaurantTabContent from './tabs/RestaurantTabContent';
import { useRestaurantDetail } from '../hooks/useRestaureantDetail';
import StatusInfo from '../components/StatusInfo';
import { formatTime, formatCurrency } from "../utils/format";
import { useNavigation } from '@react-navigation/native';
//import EditRestaurantScreen from './EditRestaurant';
import { useFocusEffect } from '@react-navigation/native';
import RestaurantLocationSelector from '../components/RestaurantLocationSelector';


type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const RestaurantDetail = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation();
  const { restaurantId } = route.params ;//as { restaurantId: string }

  const { restaurant, loading, error,refetch } = useRestaurantDetail(restaurantId);

  const [activeTab, setActiveTab] = useState('Overview');
  const [name, setName] = useState(restaurant?.name);
  const [address, setAddress] = useState(restaurant?.address || '');

  const styles = StyleSheet.create({
    locationWrapper: {
      marginTop: 16,
    },
  });

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name); 
      setAddress(restaurant.address || '');
    }
  }, [restaurant]);


  useFocusEffect(
    React.useCallback(() => {
      // Khi màn hình này được focus lại (quay về từ EditRestaurant)
      refetch();
    }, [restaurantId])
  );

  if (loading) return <Text>Đang tải...</Text>;
  if (error) return <Text>{error}</Text>;
  if (!restaurant) return <Text>Không có dữ liệu</Text>;

  return (
   <>
    <ScrollView style={RestaurantDetailStyles.scrollContainer} contentContainerStyle={RestaurantDetailStyles.scrollContent}>
      <View style={RestaurantDetailStyles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <Image source={{ uri: restaurant.image }} style={RestaurantDetailStyles.image} />
        <View style={RestaurantDetailStyles.mainContent}>
          <View style={RestaurantDetailStyles.header}>
            <View style={{ alignItems: 'center', marginTop: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={RestaurantDetailStyles.titleRestaurant}>{name}</Text>
                <TouchableOpacity  onPress={() => navigation.navigate('EditRestaurant', { restaurantId })}>
                  <Icons name="edit" size={25} color="black" />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text style={RestaurantDetailStyles.addressRestaurant}>{address}</Text>
                <TouchableOpacity   onPress={() => {}}>
                  <Icons name="edit" size={25} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={RestaurantDetailStyles.StatusInfo}>
            <StatusInfo icon="clock-o" text={`${formatTime(restaurant.open_time)} - ${formatTime(restaurant.close_time)}`} />
            <StatusInfo icon="tag" text={`${formatCurrency(restaurant.lowest_avg_cost)} - ${formatCurrency(restaurant.highest_avg_cost)}`} />
            <StatusInfo icon="handshake-o" text="Partnered" />
          </View>
          <Tabs tabs={['Overview', 'Menu', 'Reviews']} activeTab={activeTab} setActiveTab={setActiveTab} />
          <RestaurantTabContent activeTab={activeTab} restaurant={restaurant} />
          {activeTab === 'Overview' && (
            <View style={styles.locationWrapper}>
              <RestaurantLocationSelector />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
    </>
  );
};

export default RestaurantDetail;
