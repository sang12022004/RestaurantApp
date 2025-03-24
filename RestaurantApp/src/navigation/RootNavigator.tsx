import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { Restaurant } from '../types/restaurantTypes';
import RestaurantDetail from '../screens/RestaurantDetail';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Detail: { restaurant: Restaurant };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={RestaurantDetail} options={{ title: 'Chi tiết nhà hàng' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
