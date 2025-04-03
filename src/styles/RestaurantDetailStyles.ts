import { StyleSheet } from 'react-native';
const RestaurantDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  StatusInfo:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
    paddingLeft:20,
    flexWrap:'wrap'
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  titleRestaurant: {
    paddingRight: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal:20
  },
  addressRestaurant: {
    paddingRight: 10,
    fontSize: 16,
    color: 'black',
    justifyContent:'center',
    paddingHorizontal:34
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  mainContent: {
    flex: 1,
    top: -50,
    backgroundColor: '#fff',
    margin: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  editIcon: {
    marginLeft: 8,
  },
  });

export default RestaurantDetailStyles;