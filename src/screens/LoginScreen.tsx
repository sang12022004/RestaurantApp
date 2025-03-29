import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginStyles from '../styles/LoginScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const isSuccess = await login(email, password);
      if (isSuccess) {
        navigation.replace('Home', { email });
      } else {
        setModalVisible(true);
      }
    } catch (error: any) {
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.topBackground} />
      <Text style={LoginStyles.title}>Đăng nhập</Text>
      
      <TextInput
        style={LoginStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={LoginStyles.passwordContainer}>
        <TextInput
          style={LoginStyles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={LoginStyles.iconContainer}>
          <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#aaa" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={LoginStyles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={LoginStyles.buttonText}>ĐĂNG NHẬP</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={LoginStyles.link}>Chưa có tài khoản? Đăng ký ngay</Text>
        </TouchableOpacity>

      {/* Modal thông báo đăng nhập thất bại */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={LoginStyles.modalContainer}>
          <View style={LoginStyles.modalContent}>
            <Text style={LoginStyles.modalTitle}>Đăng nhập thất bại</Text>
            <Text style={LoginStyles.modalMessage}>Tài khoản hoặc mật khẩu không chính xác!</Text>
            <TouchableOpacity style={LoginStyles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={LoginStyles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
