import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  Image,
  Modal
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewPassStyles from '../styles/NewPassStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'NewPassScreen'>;

const NewPassScreen: React.FC<Props> = ({ navigation, route }) => {

    const { accessToken } = route.params; // Lấy token từ params
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // States cho custom alert modal
  const [modalVisible, setModalVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title: string, message: string, onClose?: () => void) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setModalVisible(true);
  };
  
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      showAlert('Lỗi', 'Vui lòng nhập đầy đủ mật khẩu!');
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert('Lỗi', 'Mật khẩu mới và xác nhận không khớp!');
      return;
    }
    
    setLoading(true);
  
    try {
      const response = await fetch('http://10.0.2.2:8080/api/v1/auth/create-new-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Gửi accessToken để xác thực
        },
        body: JSON.stringify({
          newPassword: newPassword,
          newPasswordMatch: confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok && result.statusCode === 'S2000') {
        showAlert('Thành công', 'Mật khẩu đã được đặt lại!', () => {
          navigation.replace('Login');
        });
      } else {
        showAlert('Lỗi', result.message || 'Đổi mật khẩu thất bại!');
      }
    } catch (error: any) {
      showAlert('Lỗi', error.message || 'Có lỗi xảy ra khi kết nối đến server!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={NewPassStyles.container} 
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
    >
      {/* Header với logo và chữ */}
                  <View style={NewPassStyles.logoContainer}>
                    <Image
                      source={require('../assets/logo.png')}
                      style={NewPassStyles.logoImage}
                    />
                    <View style={NewPassStyles.textContainer}>
                      <Text style={NewPassStyles.mainText}>PNP</Text>
                      <Text style={NewPassStyles.subText}>Global Supply</Text>
                    </View>
                </View>
      <View style={NewPassStyles.headerContainer}>
        <Text style={NewPassStyles.headerTitle}>Đặt mật khẩu mới</Text>
      </View>
      <View style={NewPassStyles.formContainer}>
        <View style={NewPassStyles.inputContainer}>
          <TextInput
            style={NewPassStyles.input}
            placeholder="Mật khẩu mới"
            placeholderTextColor="#aaa"
            secureTextEntry={!isNewPasswordVisible}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity 
            style={NewPassStyles.iconContainer} 
            onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
          >
            <Ionicons name={isNewPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>
        <View style={NewPassStyles.inputContainer}>
          <TextInput
            style={NewPassStyles.input}
            placeholder="Xác nhận mật khẩu mới"
            placeholderTextColor="#aaa"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity 
            style={NewPassStyles.iconContainer} 
            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          >
            <Ionicons name={isConfirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={NewPassStyles.button} onPress={handleChangePassword} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={NewPassStyles.buttonText}>Xác nhận</Text>
          )}
        </TouchableOpacity>
      </View>
      {/* Custom Alert Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={NewPassStyles.modalContainer}>
          <View style={NewPassStyles.modalContent}>
            <Text style={NewPassStyles.modalTitle}>{alertTitle}</Text>
            <Text style={NewPassStyles.modalMessage}>{alertMessage}</Text>
            <TouchableOpacity
              style={NewPassStyles.modalButton}
              onPress={() => {
                setModalVisible(false);
                if (alertTitle === 'Thành công') {
                  navigation.replace('Login');
                }
              }}>
              <Text style={NewPassStyles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default NewPassScreen;