import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Switch } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/AddRestaurantStyles";

const API_URL = "http://10.0.2.2:8080/api/v1/restaurants";

const AddRestaurantScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: "",
    code: "",
    phone: "",
    email: "",
    open_time: "",
    close_time: "",
    lowest_avg_cost: "",
    highest_avg_cost: "",
    categories: "",
    facebook: "",
    instagram: "",
    website: "",
    note: "",
    is_verified: true,
  });

  const [loading, setLoading] = useState(false);

  // Kiểm tra định dạng thời gian HH:mm
  const validateTimeFormat = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };

  // Xử lý thay đổi input
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Xử lý giá trị boolean từ Switch
  const handleVerificationChange = (value) => {
    setForm({ ...form, is_verified: value });
  };

  const handleSubmit = async () => {
    // Kiểm tra định dạng thời gian chỉ khi nhấn Lưu
    if (!validateTimeFormat(form.open_time) || !validateTimeFormat(form.close_time)) {
      Alert.alert("Lỗi", "Giờ mở cửa và giờ đóng cửa phải có định dạng HH:mm (ví dụ: 08:30).");
      return;
    }

    // Kiểm tra thông tin bắt buộc
    if (!form.name || !form.code || !form.phone || !form.email) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Chuyển đổi lowest_avg_cost và highest_avg_cost thành số
    const formattedForm = {
      ...form,
      lowest_avg_cost: parseInt(form.lowest_avg_cost, 10) || 0,
      highest_avg_cost: parseInt(form.highest_avg_cost, 10) || 0,
    };

    console.log("📤 Dữ liệu gửi đi:", JSON.stringify(formattedForm, null, 2));

    setLoading(true);
    try {
      const response = await axios.post(API_URL, formattedForm, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Phản hồi từ API:", response.data);

      if (response.data.status) {
        Alert.alert("Thành công", "Nhà hàng đã được thêm!");
        navigation.navigate("Home", { refresh: true });
      } else {
        Alert.alert("Lỗi", "Không thể thêm nhà hàng.");
      }
    } catch (error) {
      console.error("❌ Lỗi khi thêm nhà hàng:", error.response ? error.response.data : error.message);
      Alert.alert("Lỗi", error.response?.data?.message || "Đã xảy ra lỗi khi thêm nhà hàng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Thêm Nhà Hàng</Text>

      <TextInput style={styles.input} placeholder="Tên nhà hàng" value={form.name} onChangeText={(text) => handleChange("name", text)} />
      <TextInput style={styles.input} placeholder="Mã nhà hàng" value={form.code} onChangeText={(text) => handleChange("code", text)} />
      <TextInput style={styles.input} placeholder="Số điện thoại" value={form.phone} keyboardType="phone-pad" onChangeText={(text) => handleChange("phone", text)} />
      <TextInput style={styles.input} placeholder="Email" value={form.email} keyboardType="email-address" onChangeText={(text) => handleChange("email", text)} />

      {/* Input thời gian */}
      <TextInput style={styles.input} placeholder="Giờ mở cửa (HH:mm)" value={form.open_time} onChangeText={(text) => handleChange("open_time", text)} />
      <TextInput style={styles.input} placeholder="Giờ đóng cửa (HH:mm)" value={form.close_time} onChangeText={(text) => handleChange("close_time", text)} />

      {/* Input giá cả */}
      <TextInput
        style={styles.input}
        placeholder="Giá thấp nhất"
        value={form.lowest_avg_cost.toString()}
        keyboardType="numeric"
        onChangeText={(text) => handleChange("lowest_avg_cost", text.replace(/[^0-9]/g, ""))}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá cao nhất"
        value={form.highest_avg_cost.toString()}
        keyboardType="numeric"
        onChangeText={(text) => handleChange("highest_avg_cost", text.replace(/[^0-9]/g, ""))}
      />

      <TextInput style={styles.input} placeholder="Danh mục" value={form.categories} onChangeText={(text) => handleChange("categories", text)} />
      <TextInput style={styles.input} placeholder="Facebook" value={form.facebook} onChangeText={(text) => handleChange("facebook", text)} />
      <TextInput style={styles.input} placeholder="Instagram" value={form.instagram} onChangeText={(text) => handleChange("instagram", text)} />
      <TextInput style={styles.input} placeholder="Website" value={form.website} onChangeText={(text) => handleChange("website", text)} />
      <TextInput style={styles.input} placeholder="Ghi chú" value={form.note} onChangeText={(text) => handleChange("note", text)} multiline />

      <View style={styles.switchContainer}>
        <Text>Đã xác minh:</Text>
        <Switch value={form.is_verified} onValueChange={handleVerificationChange} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Icon name="save" size={20} color="white" />
          <Text style={styles.buttonText}>Lưu Nhà Hàng</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default AddRestaurantScreen;
