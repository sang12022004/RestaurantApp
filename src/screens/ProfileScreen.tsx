import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileStyles from '../styles/ProfileScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ( {navigation} ) => {

  const [modalVisible, setModalVisible] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  const { user, logout } = useAuth();

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

    // 1) Ẩn bàn phím
    dismissKeyboard();

    const data = {
      id: user.id,
      fullName,
      email,
    };

    // try {
    //   const response = await fetch(`http://10.0.2.2/IOT_ConnectMart_API/api/customer/update.php?id=${user.idPerson}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   const result = await response.json();

    //   if (result.success) {
    //     Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
    //   } else {
    //     updateUser({
    //       ...user,         // giữ nguyên các trường cũ
    //       surname: newSurname,
    //       lastName: newLastName,
    //       phone,
    //       email,
    //       gender,
    //       birthdate
    //     });
    //     Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
    //   }
    // } catch (error) {
    //   console.error(error);
    //   Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ!');
    // }
  };

  //logout
  const handleLogout = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView style={ProfileStyles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View style={ProfileStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={ProfileStyles.headerTitle}>Thông tin</Text>
      </View>

      {/* Thông tin tài khoản */}
      <View style={ProfileStyles.infoContainer}>
        <Text style={ProfileStyles.title}>Thông tin khách hàng</Text>
        
        <Text>Họ Tên:</Text>
        <TextInput
          style={ProfileStyles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <Text>Email:</Text>
        <TextInput
          style={ProfileStyles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text>Quốc tịch:</Text>
        <TextInput
          style={ProfileStyles.input}
          value={nation}
          placeholder='Quốc tịch'
          onChangeText={setNation}
        />

        <TouchableOpacity style={ProfileStyles.saveBtn} onPress={handleSave}>
          <Text style={ProfileStyles.saveText}>LƯU THAY ĐỔI</Text>
        </TouchableOpacity>
      </View>

      {/* Đổi mật khẩu */}
      <View style={ProfileStyles.infoContainer}>
        <Text style={ProfileStyles.title}>Đổi mật khẩu</Text>

        <Text>Mật khẩu cũ:</Text>
        <View style={ProfileStyles.inputContainer}>
          <TextInput
            style={ProfileStyles.inputPass}
            value={oldPassword}
            placeholder="Mật khẩu cũ"
            secureTextEntry={showOldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity style={ProfileStyles.icon} onPress={() => setShowOldPassword(!showOldPassword)}>
            <Ionicons name={showOldPassword ? "eye-off" : "eye"} size={20} color="#007bff" />
          </TouchableOpacity>
        </View>

        <Text>Mật khẩu mới:</Text>
        <View style={ProfileStyles.inputContainer}>
          <TextInput
            style={ProfileStyles.inputPass}
            value={newPassword}
            placeholder="Mật khẩu mới"
            secureTextEntry={showNewPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity style={ProfileStyles.icon} onPress={() => setShowNewPassword(!showNewPassword)}>
            <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={20} color="#007bff" />
          </TouchableOpacity>
        </View>


        <Text>Xác nhận mật khẩu:</Text>
        <View style={ProfileStyles.inputContainer}>
          <TextInput
            style={ProfileStyles.inputPass}
            value={confirmPassword}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry={showConfirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={ProfileStyles.icon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#007bff" />
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={ProfileStyles.saveBtn}>
          <Text style={ProfileStyles.saveText}>XÁC NHẬN</Text>
        </TouchableOpacity>
      </View>

      {/* Nút Đăng xuất ở Footer */}
      <View style={ProfileStyles.footer}>
        <TouchableOpacity style={ProfileStyles.logoutBtn} onPress={handleLogout}>
          <Text style={ProfileStyles.logoutText}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={ProfileStyles.modalContainer}>
            <View style={ProfileStyles.modalContent}>
            <Text style={ProfileStyles.modalTitle}>Đăng xuất</Text>
            <Text style={ProfileStyles.modalMessage}>Bạn có chắc chắn muốn đăng xuất?</Text>
            <View style={ProfileStyles.modalButtonContainer}>
                <TouchableOpacity
                style={[ProfileStyles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
                >
                <Text style={ProfileStyles.modalButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[ProfileStyles.modalButton, { backgroundColor: '#007bff' }]}
                onPress={() => {
                    setModalVisible(false);
                    logout();
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Login' }],
                    });
                }}
                >
                <Text style={ProfileStyles.modalButtonText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;