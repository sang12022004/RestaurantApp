import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';

interface SpeechToTextProps {
  onTextResult?: (text: string) => void;
  placeholder?: string;
  buttonText?: string;
  style?: any;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({
  onTextResult,
  placeholder = 'Nhấn nút để nói...',
  buttonText = 'Nói',
  style,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Khởi tạo Voice
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

     const checkPermission = async () => {
        try {
          const hasPermission = await requestMicrophonePermission();
          if (!hasPermission) {
            setError('Không có quyền truy cập microphone');
          }
        } catch (err) {
          console.warn(err);
        }
      };

      checkPermission();

      return () => {
        // Dọn dẹp
        Voice.destroy().then(Voice.removeAllListeners);
      };
    }, []);

  const onSpeechStart = () => {
    setIsLoading(false);
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      setResults(e.value);
      if (onTextResult && e.value[0]) {
        onTextResult(e.value[0]);
      }
    }
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    setError(e.error?.message || 'Có lỗi xảy ra');
    setIsListening(false);
    setIsLoading(false);
  };

  const requestMicrophonePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Quyền truy cập Microphone',
            message: 'Ứng dụng cần quyền truy cập microphone để chuyển giọng nói thành văn bản.',
            buttonPositive: 'Đồng ý',
            buttonNegative: 'Từ chối',
            buttonNeutral: 'Hỏi lại sau',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const startListening = async () => {
    setError('');
    setIsLoading(true);

    //const hasPermission = await requestMicrophonePermission();
    //if (!hasPermission) {
    //  setError('Không có quyền truy cập microphone');
    //  setIsLoading(false);
    //  return;
    //}

    try {
      await Voice.start('vi-VN'); // Tiếng Việt, có thể thay đổi thành 'en-US' cho tiếng Anh
    } catch (e) {
      console.error(e);
       if (e.message && e.message.includes('permission')) {
             const hasPermission = await requestMicrophonePermission();
             if (!hasPermission) {
               setError('Không có quyền truy cập microphone');
               setIsLoading(false);
               return;
             }
             // Thử lại sau khi có quyền
             try {
               await Voice.start('vi-VN');
             } catch (err) {
               setError('Không thể khởi động nhận dạng giọng nói');
               setIsLoading(false);
             }
           } else {
             setError('Không thể khởi động nhận dạng giọng nói');
             setIsLoading(false);
           }
       }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {results.length > 0 ? results[0] : placeholder}
        </Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          isListening ? styles.listeningButton : null,
        ]}
        onPress={toggleListening}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isListening ? 'Dừng' : buttonText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginVertical: 8,
  },
  resultContainer: {
    marginBottom: 16,
    minHeight: 60,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  listeningButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SpeechToText;