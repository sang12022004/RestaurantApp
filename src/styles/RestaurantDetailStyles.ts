import { StyleSheet } from 'react-native';
const RestaurantDetailStyles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    image: { width: '100%', height: 200, borderRadius: 10 },
    name: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
    address: { fontSize: 16, color: 'gray', marginBottom: 5 },
    rating: { fontSize: 18, fontWeight: 'bold', color: 'green', marginBottom: 10 },
    dish: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    dishImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
    dishName: { fontSize: 16 },
  });

export default RestaurantDetailStyles;