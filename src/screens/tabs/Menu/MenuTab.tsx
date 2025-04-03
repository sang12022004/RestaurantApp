import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, FlatList, Image } from 'react-native';
import useMenuData from '../../../hooks/useMenuData';

const MenuTab = ({ restaurantId }: { restaurantId: string }) => {
  const { menu, loading, error } = useMenuData(restaurantId);

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