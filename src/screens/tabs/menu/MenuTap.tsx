import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, FlatList, Image } from 'react-native';
import axios from 'axios';
interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface MenuData {
  menu: MenuCategory[];
}

const MenuTab = ({ restaurantId }: { restaurantId: string }) => {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://67241832493fac3cf24d1d33.mockapi.io/0306221306/VanNamCao/menu?id=${restaurantId}`
        );
        setMenu(response.data[0]?.menu || null); // Lấy menu từ dữ liệu API
      } catch (err) {
        setError('Không thể tải dữ liệu menu.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text style={styles.error}>Lỗi: {error}</Text>;
  }
  return (
      <FlatList
      data={menu}
      keyExtractor={(category) => category.category}
      renderItem={({ item: category }) => (
        <View style={styles.categoryContainer}>
          {category.items.map((item:any) => (
            <View key={item.id} style={styles.card}>
              {/* Hiển thị ảnh món ăn */}
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.foodImage} />
              )}
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                {item.price.toLocaleString('vi-VN')} VNĐ
              </Text>
              <Button title="Add to Cart" onPress={() => alert(`Thêm ${item.name} vào giỏ hàng!`)}/>
            </View>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  error: { color: 'red', marginBottom: 10 },
  categoryContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  category: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center',
    width: 150,
    marginVertical: 10,
  },

  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 14, color: 'gray', marginBottom: 5 },
});

export default MenuTab;