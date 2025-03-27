import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Đăng ký</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Full name" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <TextInput style={styles.input} placeholder="Comfirm password" secureTextEntry />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đăng ký</Text>
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