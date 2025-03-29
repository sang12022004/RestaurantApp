import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RegisterStyles from '../styles/RegisterScreenStyles';

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
    <View style={RegisterStyles.container}>
      <View style={RegisterStyles.topContainer}>
        <Text style={RegisterStyles.title}>Đăng ký</Text>
      </View>

      <View style={RegisterStyles.formContainer}>
        <TextInput style={RegisterStyles.input} 
          placeholder="Full name"
          value={fullname}
          onChangeText={setFullname}
        />
        <TextInput style={RegisterStyles.input}
          placeholder="Email" 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={RegisterStyles.inputContainer}>
          <TextInput 
            style={RegisterStyles.inputPass} 
            placeholder="Password" 
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={RegisterStyles.icon} onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        <View style={RegisterStyles.inputContainer}>
          <TextInput 
            style={RegisterStyles.inputPass} 
            placeholder="Comfirm password" 
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={RegisterStyles.icon} onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Ionicons name={confirmPasswordVisible ? "eye" : "eye-off"} size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={RegisterStyles.button} onPress={handleRegister} disabled={loading}>
          {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={RegisterStyles.buttonText}>ĐĂNG KÝ</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={RegisterStyles.link}>Đã có tài khoản? Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>

      {/* Modal thông báo thành công*/}
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={RegisterStyles.modalContainer}>
          <View style={RegisterStyles.successModalContent}>
            <Text style={RegisterStyles.successTitle}>Đăng ký thành công</Text>
            <Text style={RegisterStyles.successMessage}>{successMessage}</Text>
                <TouchableOpacity style={RegisterStyles.successButton} onPress={() => { setModalVisible(false); if (successMessage.includes('thành công')) navigation.navigate('Login'); }}>
                    <Text style={RegisterStyles.successButtonText}>OK</Text>
                </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal thông báo lỗi */}
      <Modal transparent={true} animationType="slide" visible={errorModalVisible}>
        <View style={RegisterStyles.modalContainer}>
          <View style={RegisterStyles.errorModalContent}>
            {/* Tiêu đề lỗi */}
            <Text style={RegisterStyles.errorTitle}>Đăng ký thất bại</Text>
            
            {/* Nội dung lỗi */}
            <Text style={RegisterStyles.errorMessage}>{errorMessage}</Text>
            
            {/* Nút đóng */}
            <TouchableOpacity
              style={RegisterStyles.errorButton}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={RegisterStyles.errorButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}



export default RegisterScreen;