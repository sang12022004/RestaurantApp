import { StyleSheet } from 'react-native';

const OTPStyles = StyleSheet.create({
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
        marginBottom: 100,
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
      header: {
        alignItems: 'center',
        marginBottom: 20,
      },
      headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
      },
      instructionsContainer: {
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
      },
      instructions: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
      },
      otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 30,
      },
      otpInput: {
        width: 45,
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 8,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
      },
      submitButton: {
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
      },
      submitButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
      },
      resendButton: {
        marginTop: 20,
        alignItems: 'center',
      },
      resendText: {
        color: '#FFF',
        fontSize: 16,
        textDecorationLine: 'underline',
      },

});

export default OTPStyles;
