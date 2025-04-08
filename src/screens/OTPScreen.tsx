import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'OTPScreen'>;

const OTPScreen: React.FC<Props> = ({ navigation, route }) => {
  // Lấy email từ route params
  const { email } = route.params;

  // Giả sử mã OTP có 6 chữ số
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  // State cho chức năng gửi lại OTP
  const [resendDisabled, setResendDisabled] = useState(false);
  const [counter, setCounter] = useState(60);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
        inputs.current[index + 1]?.focus();
      } else if (!text && index > 0) {
        inputs.current[index - 1]?.focus();
      }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    if (otpValue.length < otp.length) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ mã OTP!');
      return;
    }
    try {
      // Gọi API xác thực OTP. Chỉ truyền OTP trong body, email đã có trong URL
      const response = await fetch(`http://10.0.2.2:8080/api/v1/auth/verify-otp-forgot-password/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpValue }),
      });
      const result = await response.json();
      if (response.ok && result.statusCode === 'S2000') {
        const accessToken = result.data.accessToken;
        // Thành công: chuyển sang màn hình NewPassScreen với accessToken và email
        navigation.navigate('NewPassScreen', { accessToken });
      } else {
        Alert.alert('Lỗi', 'Xác thực OTP thất bại!');
      }
    } catch (error: any) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra!');
    }
  };

  const handleResendOtp = () => {
    // Gọi API gửi lại OTP nếu cần.
    Alert.alert('Thông báo', 'OTP đã được gửi lại!');
    // Vô hiệu hóa nút gửi lại và bắt đầu bộ đếm 60 giây
    setResendDisabled(true);
    setCounter(60);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled) {
      timer = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendDisabled]);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nhập mã OTP</Text>
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>
          Chúng tôi đã gửi mã OTP đến email của bạn. Vui lòng nhập mã OTP bên dưới để xác thực.
        </Text>
      </View>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref: TextInput | null) => {
              inputs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.otpInput}
            textAlign="center"
          />
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Xác nhận OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.resendButton} 
        onPress={handleResendOtp} 
        disabled={resendDisabled}
      >
        <Text style={styles.resendText}>
          {resendDisabled ? `Gửi lại mã OTP (${counter}s)` : 'Gửi lại mã OTP'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B2C72',
    paddingHorizontal: 20,
    justifyContent: 'center',
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
