import { StyleSheet } from 'react-native';

const NewPassStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C5272',
        paddingHorizontal: 20,
        justifyContent: 'center',
      },
      logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
      },
      logoImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
      },
      textContainer: {
        marginLeft: 10,
        height: 60, 
        justifyContent: 'space-between',
      },
      mainText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
      },
      subText: {
        fontSize: 16,
        color: '#FFF',
      },
      headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
      },
      headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
      },
      formContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginVertical: 10,
        paddingHorizontal: 10,
      },
      input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#000',
      },
      iconContainer: {
        paddingHorizontal: 8,
      },
      button: {
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
      },
    
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      modalContent: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
      },
      modalMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
      },
      modalButton: {
        backgroundColor: '#FFA500',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
      modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
      },
});

export default NewPassStyles;
