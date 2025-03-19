import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';


type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ( {navigation} ) => {
    const [modalVisible, setModalVisible] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Nguyen Van A',
    gender: 'Nam',
    phone: '0909909090',
    email: 'vana@gmail.com',
    day: '23',
    month: '01',
    year: '1990',
  });
  const { logout } = useAuth();

  const handleSave = () => {
    console.log('Dữ liệu người dùng:', profile);
    // Sau này bạn thêm lưu vào DB hoặc API ở đây
  };

  const handleLogout = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin</Text>
      </View>

      {/* Thông tin tài khoản */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Thông tin khách hàng</Text>

        <Text>Họ Tên:</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
        />

        <Text>Giới tính:</Text>
        <View style={styles.genderContainer}>
          <RadioButton
            value="Nam"
            status={profile.gender === 'Nam' ? 'checked' : 'unchecked'}
            onPress={() => setProfile({ ...profile, gender: 'Nam' })}
          />
          <Text>Nam</Text>
          <RadioButton
            value="Nữ"
            status={profile.gender === 'Nữ' ? 'checked' : 'unchecked'}
            onPress={() => setProfile({ ...profile, gender: 'Nữ' })}
          />
          <Text>Nữ</Text>
        </View>

        <Text>Số điện thoại:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={profile.phone}
          onChangeText={(text) => setProfile({ ...profile, phone: text })}
        />

        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={profile.email}
          onChangeText={(text) => setProfile({ ...profile, email: text })}
        />

        <Text>Ngày sinh:</Text>
        <View style={styles.birthContainer}>
          <TextInput
            style={styles.birthInput}
            keyboardType="numeric"
            value={profile.day}
            onChangeText={(text) => setProfile({ ...profile, day: text })}
          />
          <TextInput
            style={styles.birthInput}
            keyboardType="numeric"
            value={profile.month}
            onChangeText={(text) => setProfile({ ...profile, month: text })}
          />
          <TextInput
            style={styles.birthInput}
            keyboardType="numeric"
            value={profile.year}
            onChangeText={(text) => setProfile({ ...profile, year: text })}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>LƯU THAY ĐỔI</Text>
        </TouchableOpacity>
      </View>

      {/* Nút Đăng xuất ở Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đăng xuất</Text>
            <Text style={styles.modalMessage}>Bạn có chắc chắn muốn đăng xuất?</Text>
            <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
                >
                <Text style={styles.modalButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#007bff' }]}
                onPress={() => {
                    setModalVisible(false);
                    logout();
                    navigation.replace('Login');
                }}
                >
                <Text style={styles.modalButtonText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#007bff',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 16 },
  infoContainer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 8,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12 
},
  birthContainer: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16 
},
  birthInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  saveBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: { 
    color: '#fff',
    fontWeight: 'bold'
},
  footer: {
    padding: 16,
    alignItems: 'center',
    marginTop: 230
  },
  logoutBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
