import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2C5272',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    zIndex: 1,
  },
  input: {
    width: '90%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 16,
    zIndex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  iconContainer: {
    padding: 10,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    zIndex: 1,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
  },
  modalButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#FFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    color: '#FFF',
    fontSize: 16,
  },
  registerTextHighlight: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

});

export default LoginStyles;
