import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Để nền xanh phía sau lộ ra
    marginTop: -height * 0, // Đẩy nội dung lên trên
    padding:10,
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#33CCFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: 'gray',
  },
  rating: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  TextTrangChu: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default HomeScreenStyles;
