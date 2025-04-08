import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import ForgotStyles from '../styles/ForgotPasswordStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage('Vui lòng nhập email!');
      setModalVisible(true);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8080/api/v1/auth/find-forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (response.ok && result.statusCode === 'S2010') {
        // API trả về thành công
        setMessage('Gửi yêu cầu thành công!'); // Ví dụ: "Send otp success"
        setModalVisible(true);
        // Sau 1.5 giây, chuyển qua màn hình OTP (pass email làm tham số)
        setTimeout(() => {
          setLoading(false);
          setModalVisible(false);
          navigation.navigate('OTPScreen', { email });
        }, 1500);
      } else {
        setMessage('Gửi yêu cầu thất bại.');
        setModalVisible(true);
        setLoading(false);
      }
    } catch (error: any) {
      setMessage('Gửi yêu cầu thất bại.');
      setModalVisible(true);
      setLoading(false);
    }
  };

  return (
    <View style={ForgotStyles.container}>
      {/* Header với logo và chữ */}
      <View style={ForgotStyles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={ForgotStyles.logoImage}
        />
        <View style={ForgotStyles.textContainer}>
          <Text style={ForgotStyles.mainText}>PNP</Text>
          <Text style={ForgotStyles.subText}>Global Supply</Text>
        </View>
      </View>

      {/* Form nhập email */}
      <View style={ForgotStyles.formContainer}>
        <Text style={ForgotStyles.instructions}>
          Nhập email của bạn để nhận hướng dẫn lấy lại mật khẩu.
        </Text>
        <TextInput
          style={ForgotStyles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={ForgotStyles.button} onPress={handleForgotPassword} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={ForgotStyles.buttonText}>GỬI</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={ForgotStyles.link}>Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>

      {/* Modal thông báo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={ForgotStyles.modalContainer}>
          <View style={ForgotStyles.modalContent}>
            <Text style={ForgotStyles.modalTitle}>Thông báo</Text>
            <Text style={ForgotStyles.modalMessage}>{message}</Text>
            <TouchableOpacity
              style={ForgotStyles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={ForgotStyles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ForgotPasswordScreen;
