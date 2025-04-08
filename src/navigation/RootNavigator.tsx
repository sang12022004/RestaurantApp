import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { Restaurant } from '../types/restaurantTypes';
import RestaurantDetail from '../screens/RestaurantDetail';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EditRestaurantScreen from '../screens/EditRestaurant';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { TouchableOpacity } from 'react-native';



export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { email: string };
  Detail: { restaurantId: string };
  ProfileScreen: { email: string };
  EditRestaurant:{restaurantId: string  }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={RestaurantDetail}  options={{ title: 'Chi tiết nhà hàng'}}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditRestaurant" component={EditRestaurantScreen} options={{ title: 'Chỉnh sửa nhà hàng' }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
