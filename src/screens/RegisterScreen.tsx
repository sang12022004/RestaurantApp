import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Modal } from 'react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {

  // Lấy hàm register từ AuthContext
  const { register } = useAuth();

  // State cho form đăng ký
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //Ẩn/hiển pass
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

   // Modal thành công
   const [modalVisible, setModalVisible] = useState(false);
   const [successMessage, setSuccessMessage] = useState('');
 
   // Modal lỗi
   const [errorModalVisible, setErrorModalVisible] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
 
  // Trạng thái loading
  const [loading, setLoading] = useState(false);

  // Xử lý khi nhấn nút đăng ký
  const handleRegister = async () => {

    // Kiểm tra các trường không được để trống
    if (!fullname.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin!');
      setErrorModalVisible(true);
      return;
    }

    // Kiểm tra email phải có "@gmail.com"
    if (!email.includes('@gmail.com')) {
        setErrorMessage('Email không hợp lệ!');
        setErrorModalVisible(true);
        return;
    }
    
     // Kiểm tra mật khẩu xác nhận có khớp không
    if (password !== confirmPassword) {
        setErrorMessage('Mật khẩu xác nhận không khớp!');
        setErrorModalVisible(true);
        return;
    }
    setLoading(true);
    const success = await register(fullname, email, password, confirmPassword);
    setLoading(false);

    if (success) {
        setSuccessMessage('Đăng ký thành công! Hãy đăng nhập.');
    }

    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Đăng ký</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput style={styles.input} 
          placeholder="Full name"
          value={fullname}
          onChangeText={setFullname}
        />
        <TextInput style={styles.input}
          placeholder="Email" 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.inputPass} 
            placeholder="Password" 
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.icon} onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.inputPass} 
            placeholder="Comfirm password" 
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.icon} onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Ionicons name={confirmPasswordVisible ? "eye" : "eye-off"} size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>

      {/* Modal thông báo thành công*/}
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.successModalContent}>
            <Text style={styles.successTitle}>Đăng ký thành công</Text>
            <Text style={styles.successMessage}>{successMessage}</Text>
                <TouchableOpacity style={styles.successButton} onPress={() => { setModalVisible(false); if (successMessage.includes('thành công')) navigation.navigate('Login'); }}>
                    <Text style={styles.successButtonText}>OK</Text>
                </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal thông báo lỗi */}
      <Modal transparent={true} animationType="slide" visible={errorModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.errorModalContent}>
            {/* Tiêu đề lỗi */}
            <Text style={styles.errorTitle}>Đăng ký thất bại</Text>
            
            {/* Nội dung lỗi */}
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            
            {/* Nút đóng */}
            <TouchableOpacity
              style={styles.errorButton}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.errorButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  topContainer: { backgroundColor: '#007bff', padding: 40, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 20 },
  formContainer: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { backgroundColor: '#f8f8f8', padding: 15, marginVertical: 10, borderRadius: 10 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  link: { color: '#007bff', textAlign: 'center', marginTop: 15 },
  inputPass: { flex: 1, padding: 15 },
  icon: { padding: 10 },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f8f8f8', 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    marginVertical: 10 
  },

  /* Success modal */
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)' 
},
  successModalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'flex-start',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green',
  },
  successMessage: {
    fontSize: 18,
    color: '#555',
    textAlign: 'left',
    marginBottom: 20,
    lineHeight: 20,
  },
  successButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  successButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },


  /* Error modal */
  errorModalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  errorMessage: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  errorButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  errorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegisterScreen;