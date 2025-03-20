import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import SpeechToText from '../components/SpeechToText';

const SpeechToTextDemo = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  const handleSpeechResult = (text: string) => {
    setCurrentNote(text);
  };

  const saveNote = () => {
    if (currentNote.trim()) {
      setNotes([...notes, currentNote.trim()]);
      setCurrentNote('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Chuyển đổi giọng nói thành văn bản</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sử dụng Component:</Text>
          <SpeechToText
            onTextResult={handleSpeechResult}
            placeholder="Nhấn nút để nói..."
            buttonText="Nói ngay"
            style={styles.speechComponent}
          />
        </View>



        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ghi chú bằng giọng nói:</Text>
          <View style={styles.noteInputContainer}>
            <TextInput
              style={styles.noteInput}
              value={currentNote}
              onChangeText={setCurrentNote}
              placeholder="Ghi chú của bạn"
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Danh sách ghi chú:</Text>
            {notes.length === 0 ? (
              <Text style={styles.emptyText}>Chưa có ghi chú nào</Text>
            ) : (
              notes.map((note, index) => (
                <View key={index} style={styles.noteItem}>
                  <Text style={styles.noteText}>{note}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  speechComponent: {
    backgroundColor: '#e8f5e9',
  },
  hookContainer: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 16,
    minHeight: 50,
  },
  hookButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  listeningButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noteInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  noteInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    minHeight: 80,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  notesContainer: {
    marginTop: 16,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    marginTop: 16,
  },
  noteItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
  },
});

export default SpeechToTextDemo;