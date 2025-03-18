import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useRestaurant } from '../context/RestaurantContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { restaurants } = useRestaurant(); // Lấy danh sách nhà hàng từ context

  // Hàm render từng mục trong danh sách nhà hàng
  const renderItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('Detail', { restaurant: item })} // Chuyển đến màn hình Detail
    >
      <Text style={styles.listItemText}>{item.name}</Text>
      <Text style={styles.listItemText}>Địa chỉ: {item.address}</Text>
      <Text style={styles.listItemText}>Đánh giá: {item.rating} ⭐</Text>
      <Text style={styles.listItemText}>Giờờ: {item.hours}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách nhà hàng</Text>
      <FlatList
        data={restaurants} // Dữ liệu từ context
        keyExtractor={(item) => item.id.toString()} // Sử dụng id làm key
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  list: { marginBottom: 20 },
  listItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  listItemText: { fontSize: 16, color: '#333' },
});

export default HomeScreen;
  