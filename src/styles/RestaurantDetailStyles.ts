import { StyleSheet } from 'react-native';
const RestaurantDetailStyles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    image: { width: '100%', height: 200, borderRadius: 10 },
    name: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
    address: { fontSize: 16, color: 'gray', marginBottom: 5 },
    rating: { fontSize: 18, fontWeight: 'bold', color: 'green', marginBottom: 10 },
    // dish: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    // dishImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
    // dishName: { fontSize: 16 },
    mainContent: { flex: 1, top:-50,backgroundColor: '#fff', margin: 10},
    header: { alignItems: 'center',marginTop:10},
    titleRestaurant: { paddingRight:10,fontSize: 24, fontWeight: 'bold', color: 'black' },
    addressRestaurant: { paddingRight:10,fontSize: 16, color: 'black',flexDirection:'row' },
    scrollContainer: { flex: 1 },
    scrollContent: { paddingBottom: 20 },
    text: { fontSize: 16, marginBottom: 5 },
  });

export default RestaurantDetailStyles;