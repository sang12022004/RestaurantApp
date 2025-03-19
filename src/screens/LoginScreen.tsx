import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginStyles from '../styles/LoginScreenStyles'; 



type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Trạng thái hiển thị mật khẩu
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const isSuccess = await login(username, password);
    setLoading(false);

    if (isSuccess) {
      navigation.replace('Home');
    } else {
      setModalVisible(true);
    }
  };

  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.topBackground} />
      <Text style={LoginStyles.title}>Đăng nhập</Text>
      
      <TextInput
        style={LoginStyles.input}
        placeholder="Tài khoản"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#aaa"
      />

      <View style={LoginStyles.passwordContainer}>
        <TextInput
          style={LoginStyles.passwordInput}
          placeholder="Mật khẩu"
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
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={LoginStyles.buttonText}>Xác nhận</Text>}
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
