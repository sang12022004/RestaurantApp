import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailRestaurant from '../screens/DetailRestaurantScreen';
import '../context/RestaurantContext.tsx'

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Detail: { restaurant:Restaurant};
};  

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail"component={DetailRestaurant} options={{ headerTitle: 'Chi Tiết Nhà Hàng' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
