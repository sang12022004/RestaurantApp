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
    justifyContent:'space-around',
    marginTop:20,
    paddingLeft:20,
    
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
  textInput: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 5,
    fontSize: 16,
    width: '70%',
  },
  saveButton: {
    backgroundColor: 'aqua', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  saveButtonText: {
    color: 'black', 
    fontSize: 16,
    fontWeight: 'bold',
  },

  });

export default RestaurantDetailStyles;