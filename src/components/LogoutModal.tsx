import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ProfileScreenStyles';

const LogoutModal = ({ visible, onClose, onLogout }: { visible: boolean, onClose: () => void, onLogout: () => void }) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Đăng xuất</Text>
        <Text style={styles.modalMessage}>Bạn có chắc chắn muốn đăng xuất?</Text>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ccc' }]} onPress={onClose}>
            <Text style={styles.modalButtonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#007bff' }]} onPress={onLogout}>
            <Text style={styles.modalButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default LogoutModal;
