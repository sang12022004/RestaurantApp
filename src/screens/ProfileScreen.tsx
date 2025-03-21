import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, Keyboard, Platform } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuth } from '../context/AuthContext';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ( {navigation} ) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); // Điều khiển hiển thị DatePicker

 
  const { user, logout, updateUser } = useAuth();
  const today = new Date();
  // Các state lưu dữ liệu để người dùng chỉnh sửa
  const [fullName, setFullName] = useState(
    user ? `${user.surname} ${user.lastName}`.trim() : ''
  );
  const [surname, setSurname] = useState(user?.surname || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [gender, setGender] = useState(user?.gender || 0);
  
  // Chuyển chuỗi birthdate (VD: "1995-10-20") sang đối tượng Date (nếu có)
  const initialDate = user?.birthdate ? new Date(user.birthdate) : new Date();
  const [birthdate, setBirthdate] = useState(user?.birthdate || '');
  const [dateValue, setDateValue] = useState(initialDate);

    // ẩn phím
    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };

  const handleSave = async () => {
    if (!user) return;

    // 1) Ẩn bàn phím
    dismissKeyboard();

    const parts = fullName.trim().split(' ');
    const newSurname = parts.shift() || '';         // Phần cuối cùng
    const newLastName = parts.join(' ');            // Phần còn lại


    const data = {
      id: user.idPerson,
      surname: newSurname,
      lastName: newLastName,
      phone,
      email,
      gender,
      birthdate,
      created_at: "null",
      updated_at: new Date().toISOString(),
      status: 1,
    };

    try {
      const response = await fetch(`http://10.0.2.2/IOT_ConnectMart_API/api/customer/update.php?id=${user.idPerson}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
      } else {
        updateUser({
          ...user,         // giữ nguyên các trường cũ
          surname: newSurname,
          lastName: newLastName,
          phone,
          email,
          gender,
          birthdate
        });
        Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ!');
    }
  };

  const handleLogout = () => {
    setModalVisible(true);
  };

  // Hàm xử lý khi DatePicker thay đổi giá trị
  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false); // Ẩn picker khi chọn xong
    }
    if (selectedDate) {
      setDateValue(selectedDate);
      // Chuyển selectedDate => chuỗi YYYY-MM-DD
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const newBirthdate = `${year}-${month}-${day}`;
      setBirthdate(newBirthdate);
    }
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

        <Text>Giới tính:</Text>
        <View style={styles.genderContainer}>
          <RadioButton
            value="0"
            status={gender  === 0 ? 'checked' : 'unchecked'}
            onPress={() => setGender(0)}
          />
          <Text>Nam</Text>
          <RadioButton
            value="1"
            status={gender === 1 ? 'checked' : 'unchecked'}
            onPress={() => setGender(1)}
          />
          <Text>Nữ</Text>
        </View>

        <Text>Số điện thoại:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
        />

        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text>Ngày sinh:</Text>
        <View style={styles.birthContainer}>
        <TouchableOpacity
          style={styles.birthInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {birthdate ? birthdate : 'Chọn ngày sinh'}
          </Text>
          {/* Icon ở bên phải */}
          <Icon name="calendar-today" size={20} color="#007bff" />
        </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="default"
            value={today}
            onChange={onChangeDate}
          />
        )}

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  dateText: {
    fontSize: 16,
  },
});
