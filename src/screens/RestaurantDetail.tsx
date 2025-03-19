import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Dish } from '../types/restaurantTypes';
import RestaurantDetailStyles from '../styles/RestaurantDetailStyles';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const RestaurantDetail = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { restaurant } = route.params;

  return (
    <View style={RestaurantDetailStyles.container}>
      <Image source={{ uri: restaurant.image }} style={RestaurantDetailStyles.image} />
      <Text style={RestaurantDetailStyles.name}>{restaurant.name}</Text>
      <Text style={RestaurantDetailStyles.address}>{restaurant.address}</Text>
      <Text style={RestaurantDetailStyles.rating}>⭐ {restaurant.rating}</Text>
      <FlatList
        data={restaurant.dishes}
        keyExtractor={(dish: Dish) => dish.id}
        renderItem={({ item: dish }) => (
          <View style={RestaurantDetailStyles.dish}>
            <Image source={{ uri: dish.image }} style={RestaurantDetailStyles.dishImage} />
            <Text style={RestaurantDetailStyles.dishName}>{dish.name} - {dish.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default RestaurantDetail;