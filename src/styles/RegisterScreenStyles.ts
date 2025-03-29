import { StyleSheet } from 'react-native';

const RegisterStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff' 
  },
  topContainer: { 
    backgroundColor: '#007bff', 
    padding: 40, 
    borderBottomLeftRadius: 50, 
    borderBottomRightRadius: 50, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginTop: 20 
  },
  formContainer: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center' 
  },
  input: { 
    backgroundColor: '#f8f8f8', 
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 10 
  },
  button: { 
    backgroundColor: '#007bff', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
    buttonText: { 
      color: '#fff', 
      fontSize: 18, 
      fontWeight: 'bold' 
    },
    link: { 
      color: '#007bff', 
      textAlign: 'center', 
      marginTop: 15 
    },
    inputPass: { 
      flex: 1, 
      padding: 15
    },
    icon: { 
      padding: 10 
    },
    inputContainer: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: '#f8f8f8', 
      borderRadius: 10, 
      paddingHorizontal: 10, 
      marginVertical: 10 
    },
  
  /* Success modal */
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)' 
  },
  successModalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'flex-start',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green',
  },
    successMessage: {
      fontSize: 18,
      color: '#555',
      textAlign: 'left',
      marginBottom: 20,
      lineHeight: 20,
    },
    successButton: {
      backgroundColor: '#007bff',
      padding: 12,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
    },
    successButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  
  
    /* Error modal */
    errorModalContent: {
      width: 300,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingVertical: 20,
      paddingHorizontal: 15,
      alignItems: 'center',
    },
    errorTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
    },
    errorMessage: {
      fontSize: 18,
      color: '#555',
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 20,
    },
    errorButton: {
      backgroundColor: '#007bff',
      padding: 12,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
    },
    errorButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
});

export default RegisterStyles;