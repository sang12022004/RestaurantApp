import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {

  // Lấy hàm register từ AuthContext
  const { register } = useAuth();

  // State cho form đăng ký
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Trạng thái loading
  const [loading, setLoading] = useState(false);

  // Xử lý khi nhấn nút đăng ký
  const handleRegister = async () => {
    setLoading(true);
    const success = await register(fullname, email, password, confirmPassword);
    setLoading(false);

    if (success) {
      Alert.alert('Thành công', 'Đăng ký thành công! Hãy đăng nhập.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Lỗi', 'Đăng ký thất bại. Vui lòng thử lại.');
    }
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
        <TextInput style={styles.input} 
          placeholder="Password" 
          secureTextEntry 
          value={password}
          onChangeText={setPassword}

        />
        <TextInput style={styles.input} 
          placeholder="Comfirm password" 
          secureTextEntry 
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Đăng ký</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
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
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#007bff', textAlign: 'center', marginTop: 15 },
});

export default RegisterScreen;