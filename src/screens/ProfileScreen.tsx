import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, Keyboard, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomAlertModal from '../components/CustomAlertModal';
import ProfileStyles from '../styles/ProfileScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ( {navigation} ) => {
  const { user, updateUser, changePassword, logout } = useAuth();
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

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
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  // ẩn phím
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useFocusEffect(
    useCallback(() => {
      setFullName(user?.fullname || '');
      setEmail(user?.email || '');
      setPhone(user?.phone || '');
      setAddress(user?.address || '');
      setNation(user?.nation || '');
    }, [user])
  );

  const handleSave = async () => {
    if (!user) return;
    //Ẩn bàn phím
    dismissKeyboard();
    const data = {
      id: user.id,
      fullname: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      nation: nation.trim(),
    };
    const success = await updateUser(data);
    if (!success) {
      user.fullname = data.fullname;
      user.phone = data.phone;
      user.address = data.address;
      user.nation = data.nation;
      setAlertTitle('Thành công');
      setAlertMessage('Thông tin đã được cập nhật!');
    } else {
      setAlertTitle('Lỗi');
      setAlertMessage('Cập nhật thông tin thất bại, vui lòng thử lại!');
    }
    setModalVisible(true);
  };

  // Đổi mật khẩu
  const handleChangePassword = async () => {
    dismissKeyboard();

    // Kiểm tra dữ liệu
    if (!oldPassword || !newPassword || !confirmPassword) {
      setAlertTitle('Lỗi');
      setAlertMessage('Vui lòng nhập đầy đủ thông tin!');
      setModalVisible(true);
      return;
    }
    if (oldPassword === newPassword) {
      setAlertTitle('Lỗi');
      setAlertMessage('Mật khẩu mới không được trùng với mật khẩu cũ!');
      setModalVisible(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setAlertTitle('Lỗi');
      setAlertMessage('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      setModalVisible(true);
      return;
    }

    try {
      const success = await changePassword(
        oldPassword.trim(),
        newPassword.trim()
      );
  
      if (success) {
        setAlertTitle('Thành công');
        setAlertMessage('Mật khẩu đã được thay đổi!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      // Bắt lỗi từ throw new Error(...)
      setAlertTitle('Lỗi');
      setAlertMessage(error.message || 'Đổi mật khẩu thất bại!');
    }
  
    setModalVisible(true);
  };

  const handleLogout = () => {
    setAlertTitle('Đăng xuất');
    setAlertMessage('Bạn có chắc chắn muốn đăng xuất không?');
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
          editable={false}
        />
        <Text>Số điện thoại:</Text>
        <TextInput
          style={ProfileStyles.input}
          keyboardType= "phone-pad"
          value={phone}
          placeholder='Số điện thoại'
          onChangeText={setPhone}
        />
        <Text>Địa chỉ:</Text>
        <TextInput
          style={ProfileStyles.input}
          value={address}
          placeholder='Địa chỉ'
          onChangeText={setAddress}
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
            <Ionicons name={showOldPassword ? "eye-off" : "eye"} size={20} color="#FFA500" />
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
            <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={20} color="#FFA500" />
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
            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#FFA500" />
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={ProfileStyles.saveBtn} onPress={handleChangePassword}>
          <Text style={ProfileStyles.saveText}>XÁC NHẬN</Text>
        </TouchableOpacity>
      </View>

      {/* Nút Đăng xuất ở Footer */}
      <View style={ProfileStyles.footer}>
        <TouchableOpacity style={ProfileStyles.logoutBtn} onPress={handleLogout}>
          <Text style={ProfileStyles.logoutText}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>
      </View>


      {/* Custom Alert Modal dùng chung cho thông báo */}
      <CustomAlertModal
        visible={modalVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setModalVisible(false)}
        // Nếu đây là modal đăng xuất, bạn có thể thêm nút xác nhận
        onConfirm={
          alertTitle === 'Đăng xuất'
            ? () => {
                setModalVisible(false);
                logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }
            : undefined
        }
        confirmText={alertTitle === 'Đăng xuất' ? 'Đăng xuất' : 'OK'}
        cancelText={alertTitle === 'Đăng xuất' ? 'Hủy' : 'Đóng'}
      />
    </ScrollView>
  );
};

export default ProfileScreen;

