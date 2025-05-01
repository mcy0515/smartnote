import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  ActivityIndicator,
  Alert
} from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // 최소 8자, 최소 하나의 문자, 하나의 숫자, 하나의 특수문자
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    // 이메일 검증
    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
      isValid = false;
    }

    // 비밀번호 검증
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    } else if (!validatePassword(password)) {
      newErrors.password = '비밀번호는 최소 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다.';
      isValid = false;
    }

    // 비밀번호 확인 검증
    if (!confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // TODO: 실제 API 호출로 대체
      // const response = await registerUser(email, password);
      
      // 임시로 1초 대기
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        '회원가입 성공',
        '회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.',
        [
          {
            text: '확인',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        '회원가입 실패',
        '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>스마트노트 회원가입</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="이메일 입력"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors(prev => ({ ...prev, email: '' }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.password ? styles.inputError : null]}
              placeholder="비밀번호 입력"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors(prev => ({ ...prev, password: '' }));
              }}
              secureTextEntry
              editable={!loading}
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
              }}
              secureTextEntry
              editable={!loading}
            />
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          </View>
          
          <TouchableOpacity 
            style={[styles.button, loading ? styles.buttonDisabled : null]} 
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>회원가입</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkButton} 
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
          >
            <Text style={styles.linkText}>이미 계정이 있으신가요? 로그인</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A5A5A5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#4F46E5',
    fontSize: 14,
  },
});

export default RegisterScreen; 