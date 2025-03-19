import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import LoginStyles from '../styles/LoginScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const isSuccess = login(username, password);
    if (isSuccess) {
      navigation.replace('Home');
    } else {
      Alert.alert('Đăng nhập thất bại', 'Sai tài khoản hoặc mật khẩu!');
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Đăng nhập</Text>
      <TextInput
        style={LoginStyles.input}
        placeholder="Tài khoản"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Xác nhận" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
