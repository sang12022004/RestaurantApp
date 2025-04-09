import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

interface Props {
  onResult: (text: string) => void;
}

const SpeechMicButton: React.FC<Props> = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🔁 Callback ổn định
  const onSpeechResults = useCallback((e: SpeechResultsEvent) => {
    console.log('🎤 Nhận kết quả:', e.value);
    if (e.value && e.value.length > 0) {
      onResult(e.value[0]);
    }
    setIsListening(false);
    setIsLoading(false);
  }, [onResult]);

  const onSpeechError = useCallback((e: SpeechErrorEvent) => {
    console.warn('❌ Lỗi nhận giọng nói:', e.error?.message);
    setIsListening(false);
    setIsLoading(false);
  }, []);

  const onSpeechEnd = useCallback(() => {
    console.log('🛑 Đã kết thúc ghi âm');
    setIsListening(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [onSpeechResults, onSpeechError, onSpeechEnd]);

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const toggleListening = async () => {
    if (isListening) {
      try {
        await Voice.stop();
        console.log('🛑 Đã gọi Voice.stop()');
      } catch (err) {
        console.error('❌ Lỗi khi dừng ghi âm:', err);
      } finally {
        setIsListening(false);
        setIsLoading(false);
      }
    } else {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        console.warn('🚫 Không có quyền microphone');
        return;
      }

      setIsLoading(true);
      try {
        await Voice.start('vi-VN');
        setIsListening(true);
        console.log('🎙️ Bắt đầu ghi âm...');
      } catch (err) {
        console.error('❌ Lỗi khi bắt đầu ghi âm:', err);
        setIsLoading(false);
      }
    }
  };

  return (
    <TouchableOpacity onPress={toggleListening}>
      {isLoading ? (
        <ActivityIndicator size={20} color="#888" />
      ) : (
        <Icon name="mic" size={24} color={isListening ? 'red' : '#444'} />
      )}
    </TouchableOpacity>
  );
};

export default SpeechMicButton;
