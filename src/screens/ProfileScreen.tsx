import React, { useState } from 'react';
import { ScrollView, Modal, View, TouchableOpacity, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import UserInfoForm from '../components/UserInfoForm';
import LogoutModal from '../components/LogoutModal';
import styles from '../styles/ProfileScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout, updateUser } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => setModalVisible(true);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Header navigation={navigation} />
      <UserInfoForm user={user} updateUser={updateUser} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>
      </View>
      <LogoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLogout={() => {
          setModalVisible(false);
          logout();
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }}
      />
    </ScrollView>
  );
};

export default ProfileScreen;
