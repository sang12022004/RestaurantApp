import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen';
import NewPassScreen from '../screens/NewPassScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: { email: string };
  Register: undefined;
  ForgotPassword: undefined;
  OTPScreen: { email: string };
  NewPassScreen: { accessToken: string;}
  ProfileScreen: { email: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewPassScreen" component={NewPassScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
