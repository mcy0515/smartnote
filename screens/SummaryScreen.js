import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';

const GOOGLE_API_KEY = 'AIzaSyA--Kh_-Ae9jYa-p50_bOjGRXbbCAz0k34'; // 실제 API 키로 교체 필요

export default function SummaryScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text style={styles.loadingText}>AI가 내용을 분석하고 있습니다...</Text>
      <Text style={styles.loadingSubText}>잠시만 기다려주세요</Text>
    </View>
  );

  const handleSummarize = async () => {
    try {
      if (!inputText.trim()) {
        alert('텍스트를 입력해주세요.');
        return;
      }
      
      setIsLoading(true);
      Keyboard.dismiss();
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Expo/1.0.0',
          'X-Ios-Bundle-Identifier': 'host.exp.Exponent'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `다음 텍스트를 분석해서 공부할 때 도움이 되도록 개념 위주로 잘 설명해줘:\n\n${inputText}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || 'API 요청이 실패했습니다.');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
        console.error('API 응답 구조:', JSON.stringify(data, null, 2));
        throw new Error('API 응답 형식이 예상과 다릅니다.');
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      if (!generatedText) {
        throw new Error('생성된 텍스트가 없습니다.');
      }

      setSummary(generatedText);
    } catch (error) {
      console.error('분석 중 오류 발생:', error);
      alert(`분석 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>📝 AI 학습 분석</Text>
          
          {isLoading ? (
            renderLoadingState()
          ) : (
            <>
              <TextInput
                style={styles.input}
                multiline
                placeholder="분석할 텍스트를 입력하세요..."
                value={inputText}
                onChangeText={setInputText}
              />

              <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]} 
                onPress={handleSummarize}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? '분석 중...' : '분석하기'}
                </Text>
              </TouchableOpacity>

              {summary ? (
                <View style={styles.summaryContainer}>
                  <Text style={styles.summaryText}>{summary}</Text>
                  
                  <TouchableOpacity 
                    style={[styles.button, styles.generateButton]} 
                    onPress={() => navigation.navigate('Quiz', { summary })}
                  >
                    <Text style={styles.buttonText}>문제 생성하기</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#10B981',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
    marginTop: 20,
    textAlign: 'center',
  },
  loadingSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
}); 