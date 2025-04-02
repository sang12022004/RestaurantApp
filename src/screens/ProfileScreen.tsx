import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, Keyboard, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ( {navigation} ) => {
  const { user, updateUser, changePassword, logout } = useAuth();


  const [modalVisible, setModalVisible] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  // Các state lưu dữ liệu để người dùng chỉnh sửa
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  // Các state lưu dữ liệu để người dùng chỉnh sửa
  const [fullName, setFullName] = useState(user?.fullname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [nation, setNation] = useState(user?.nation || '');

  // ẩn phím
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSave = async () => {
    if (!user) return;
    //Ẩn bàn phím
    dismissKeyboard();
    const data = {
      id: user.id,
      fullname: fullName.trim(),
      email: email.trim(),
      nation: nation.trim(),
    };
    const success = await updateUser(data);
    if (!success) {
      Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
    } else {
      Alert.alert('Lỗi', 'Cập nhật thông tin thất bại, vui lòng thử lại!');
    }
  };

  // Đổi mật khẩu
  const handleChangePassword = async () => {
    dismissKeyboard();

    // Kiểm tra dữ liệu
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ 3 trường mật khẩu cũ, mới và xác nhận!');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }

    const success = await changePassword(oldPassword.trim(), newPassword.trim());
    if (success) {
      Alert.alert('Thành công', 'Mật khẩu đã được thay đổi!');
      // Xoá trường input
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      Alert.alert('Lỗi', 'Đổi mật khẩu thất bại, vui lòng thử lại!');
    }
  };

  const handleLogout = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
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
          value={fullName}
          onChangeText={setFullName}
        />
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text>Quốc tịch:</Text>
        <TextInput
          style={styles.input}
          value={nation}
          placeholder='Quốc tịch'
          onChangeText={setNation}
        />


        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>LƯU THAY ĐỔI</Text>
        </TouchableOpacity>
      </View>

      {/* Đổi mật khẩu */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Đổi mật khẩu</Text>

        <Text>Mật khẩu cũ:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={oldPassword}
            placeholder="Mật khẩu cũ"
            secureTextEntry={showOldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity style={styles.icon} onPress={() => setShowOldPassword(!showOldPassword)}>
            <Ionicons name={showOldPassword ? "eye-off" : "eye"} size={20} color="#007bff" />
          </TouchableOpacity>
        </View>

        <Text>Mật khẩu mới:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={newPassword}
            placeholder="Mật khẩu mới"
            secureTextEntry={showNewPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity style={styles.icon} onPress={() => setShowNewPassword(!showNewPassword)}>
            <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={20} color="#007bff" />
          </TouchableOpacity>
        </View>


        <Text>Xác nhận mật khẩu:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={confirmPassword}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry={showConfirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.icon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#007bff" />
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.saveBtn} onPress={handleChangePassword}>
          <Text style={styles.saveText}>XÁC NHẬN</Text>
        </TouchableOpacity>
      </View>

      {/* Nút Đăng xuất ở Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>
      </View>


      {/* Thông báo đăng xuất */}
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
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Login' }],
                    });
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
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: {
    backgroundColor: '#007bff',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginLeft: 16 
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 8,
    elevation: 3,
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
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
  dateText: {
    fontSize: 16,
  },
  inputContainer: { 
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: "#007bff",
    position: "relative",
  },
  icon: { 
    position: "absolute", 
    right: 10 
  },
  inputPass: { 
    flex: 1,
    paddingVertical: 10,
  },
});
