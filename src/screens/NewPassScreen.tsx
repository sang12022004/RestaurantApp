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
  Alert
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

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ mật khẩu!');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận không khớp!');
      return;
    }
    
    setLoading(true);
  
    try {
      const response = await fetch('http://10.0.2.2:8080/api/v1/auth/create-new-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          newPass: newPassword,
          newPasswordMatch: confirmPassword,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.statusCode === 'S2001') {
        Alert.alert('Thành công', 'Mật khẩu đã được đặt lại!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Lỗi', 'Đổi mật khẩu thất bại!');
      }
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi kết nối đến server!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
});