import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = useAuth();
  const { username } = route.params; // ✅ Nhận dữ liệu từ Login
  
  // ✅ Check user null phòng trường hợp chưa login
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Chưa đăng nhập</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Xin chào, {user.surname} {user.lastName}</Text>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Profile" onPress={() => navigation.navigate('ProfileScreen', { username })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default HomeScreen;
