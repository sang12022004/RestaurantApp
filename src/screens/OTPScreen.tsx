import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  Alert
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import OTPStyles from '../styles/OTPStyles';

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
      style={OTPStyles.container} 
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
    >
      {/* Header với logo và chữ */}
            <View style={OTPStyles.logoContainer}>
              <Image
                source={require('../assets/logo.png')}
                style={OTPStyles.logoImage}
              />
              <View style={OTPStyles.textContainer}>
                <Text style={OTPStyles.mainText}>PNP</Text>
                <Text style={OTPStyles.subText}>Global Supply</Text>
              </View>
          </View>
      <View style={OTPStyles.instructionsContainer}>
        <Text style={OTPStyles.instructions}>
          Chúng tôi đã gửi mã OTP đến email của bạn. Vui lòng nhập mã OTP bên dưới để xác thực.
        </Text>
      </View>
      <View style={OTPStyles.otpContainer}>
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
            style={OTPStyles.otpInput}
            textAlign="center"
          />
        ))}
      </View>
      <TouchableOpacity style={OTPStyles.submitButton} onPress={handleSubmit}>
        <Text style={OTPStyles.submitButtonText}>Xác nhận OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={OTPStyles.resendButton} 
        onPress={handleResendOtp} 
        disabled={resendDisabled}
      >
        <Text style={OTPStyles.resendText}>
          {resendDisabled ? `Gửi lại mã OTP (${counter}s)` : 'Gửi lại mã OTP'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

