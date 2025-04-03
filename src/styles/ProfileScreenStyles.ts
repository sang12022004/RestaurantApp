import { StyleSheet } from 'react-native';

const ProfileStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: {
    backgroundColor: '#2C5272',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginLeft: 16 
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 8,
    elevation: 3,
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12 
},
  saveBtn: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: { 
    color: '#fff',
    fontWeight: 'bold'
},
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
  },
  inputContainer: { 
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: "#FFA500",
    position: "relative",
  },
  icon: { 
    position: "absolute", 
    right: 10 
  },
  inputPass: { 
    flex: 1,
    paddingVertical: 10,
  },
});

export default ProfileStyles;