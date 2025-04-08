import { StyleSheet } from 'react-native';

const ForgotStyles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#2C5272',
      },
      logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
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
      formContainer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
      },
      instructions: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 20,
        textAlign: 'center',
      },
      input: {
        width: '90%',
        height: 50,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#000',
        marginBottom: 15,
      },
      button: {
        width: '90%',
        height: 50,
        backgroundColor: '#FFA500',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      },
      buttonText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
      },
      link: {
        fontSize: 16,
        color: '#FFF',
        textDecorationLine: 'underline',
        marginTop: 15,
      },
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
      },
      modalButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFA500',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
      },

});

export default ForgotStyles;
