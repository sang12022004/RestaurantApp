import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Platform, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/ProfileScreenStyles';
import { UserInfo } from '../types/UserInfo';

const UserInfoForm = ({ user, updateUser }: { user: UserInfo | null, updateUser: any }) => {
  const [fullName, setFullName] = useState(`${user?.surname || ''} ${user?.lastName || ''}`.trim());
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [gender, setGender] = useState(user?.gender || 0);
  const [birthdate, setBirthdate] = useState(user?.birthdate || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dismissKeyboard = () => Keyboard.dismiss();

  const handleSave = async () => {
    if (!user) return;
    dismissKeyboard();
    const [newSurname, ...rest] = fullName.trim().split(' ');
    const newLastName = rest.join(' ');
    const data = {
      id: user.idPerson, surname: newSurname, lastName: newLastName, phone, email, gender, birthdate,
      created_at: "null", updated_at: new Date().toISOString(), status: 1
    };
    try {
      const res = await fetch(`http://10.0.2.2/IOT_ConnectMart_API/api/customer/update.php?id=${user.idPerson}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
      else {
        updateUser({ ...user, surname: newSurname, lastName: newLastName, phone, email, gender, birthdate });
        Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi', 'Không thể kết nối máy chủ!');
    }
  };

  const onChangeDate = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
      setBirthdate(dateStr);
    }
  };

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.title}>Thông tin khách hàng</Text>
      <Text>Họ Tên:</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />
      <Text>Giới tính:</Text>
      <View style={styles.genderContainer}>
        <RadioButton value="0" status={gender === 0 ? 'checked' : 'unchecked'} onPress={() => setGender(0)} />
        <Text>Nam</Text>
        <RadioButton value="1" status={gender === 1 ? 'checked' : 'unchecked'} onPress={() => setGender(1)} />
        <Text>Nữ</Text>
      </View>
      <Text>Số điện thoại:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={phone} onChangeText={setPhone} />
      <Text>Email:</Text>
      <TextInput style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Text>Ngày sinh:</Text>
      <TouchableOpacity style={styles.birthInput} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{birthdate || 'Chọn ngày sinh'}</Text>
        <Icon name="calendar-today" size={20} color="#007bff" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker mode="date" display="default" value={birthdate ? new Date(birthdate) : new Date()} onChange={onChangeDate} />
      )}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>LƯU THAY ĐỔI</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserInfoForm;
