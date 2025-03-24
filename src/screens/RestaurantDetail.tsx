import React, { useState } from 'react';
import {TouchableOpacity,StatusBar, ScrollView,View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Dish } from '../types/restaurantTypes';
import RestaurantDetailStyles from '../styles/RestaurantDetailStyles';
import Tabs from './tabs/tabs';
import OverviewContent from './tabs/Overview/Overview';
import Icons from "react-native-vector-icons/FontAwesome";
import RestaurantTabContent from './tabs/RestaurantTabContent';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const RestaurantDetail = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { restaurant } = route.params;
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <>
     <ScrollView style={RestaurantDetailStyles.scrollContainer} contentContainerStyle={RestaurantDetailStyles.scrollContent}>
    <View style={RestaurantDetailStyles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image source={{ uri: restaurant.image }} style={RestaurantDetailStyles.image} />
      <View style={RestaurantDetailStyles.mainContent}>
     
        <View style={RestaurantDetailStyles.header}>
        <View style={{ alignItems: 'center', marginTop: 1 }}>
        {/* Tên nhà hàng */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={RestaurantDetailStyles.titleRestaurant}>{restaurant.name}</Text>
          <TouchableOpacity >
            <Icons name="edit" size={25} color="black" />
          </TouchableOpacity>
        </View>

        {/* Địa chỉ */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <Text style={RestaurantDetailStyles.addressRestaurant}>{restaurant.address}</Text>
          <TouchableOpacity >
            <Icons name="edit" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
          </View>
        <Tabs tabs={['Overview', 'Menu', 'Reviews']} activeTab={activeTab} setActiveTab={setActiveTab} />
          {/* {renderTabContent()} */}
          <RestaurantTabContent activeTab={activeTab} restaurant={restaurant} />
      </View>
    </View>
    </ScrollView>
    </>
  );
};

export default RestaurantDetail;