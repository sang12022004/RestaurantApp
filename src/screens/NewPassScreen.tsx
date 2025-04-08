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
  Modal
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    // Nếu muốn tự động đóng sau 2 giây, uncomment dòng dưới:
    // setTimeout(() => { setModalVisible(false); if(onClose) onClose(); }, 2000);
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
      style={styles.container} 
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Đặt mật khẩu mới</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu mới"
            placeholderTextColor="#aaa"
            secureTextEntry={!isNewPasswordVisible}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity 
            style={styles.iconContainer} 
            onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
          >
            <Ionicons name={isNewPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu mới"
            placeholderTextColor="#aaa"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity 
            style={styles.iconContainer} 
            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          >
            <Ionicons name={isConfirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Xác nhận</Text>
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{alertTitle}</Text>
            <Text style={styles.modalMessage}>{alertMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                if (alertTitle === 'Thành công') {
                  navigation.replace('Login');
                }
              }}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default NewPassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B2C72',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});