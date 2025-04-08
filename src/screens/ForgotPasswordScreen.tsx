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
    <View style={styles.container}>
      {/* Header với logo và chữ */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logoImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>PNP</Text>
          <Text style={styles.subText}>Global Supply</Text>
        </View>
      </View>

      {/* Form nhập email */}
      <View style={styles.formContainer}>
        <Text style={styles.instructions}>
          Nhập email của bạn để nhận hướng dẫn lấy lại mật khẩu.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>GỬI</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>

      {/* Modal thông báo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thông báo</Text>
            <Text style={styles.modalMessage}>{message}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#2C5272', // Màu nền chính
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Căn giữa theo ngang
    marginTop: 100,
    marginBottom: 50,
  },
  logoImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  textContainer: {
    marginLeft: 10,
    height: 60, // Chiều cao bằng với logo
    justifyContent: 'space-between',
  },
  mainText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subText: {
    fontSize: 16,
    color: '#FFF',
  },
  formContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  instructions: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFA500',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#FFF',
    textDecorationLine: 'underline',
    marginTop: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
