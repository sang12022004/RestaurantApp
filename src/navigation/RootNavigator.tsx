import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetail from '../screens/RestaurantDetail';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AddRestaurantScreen from '../screens/AddRestaurantScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen';
import NewPassScreen from '../screens/NewPassScreen';
import EditRestaurantScreen from '../screens/EditRestaurant';


export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OTPScreen: { email: string };
  NewPassScreen: { accessToken: string}
  Home: { email: string;refresh?: boolean };
  Detail: { restaurantId: string };
  ProfileScreen: { email: string };
  AddRestaurant: { rawData: any };
  EditRestaurant:{restaurantId: string  }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewPassScreen" component={NewPassScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={RestaurantDetail} options={{ title: 'Chi tiết nhà hàng' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddRestaurant" component={AddRestaurantScreen} options={{ title: 'Thêm Nhà Hàng' }} />
        <Stack.Screen name="EditRestaurant" component={EditRestaurantScreen} options={{ title: 'Chỉnh sửa nhà hàng' }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
