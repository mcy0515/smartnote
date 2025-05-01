import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MainMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📒 스마트 노트</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Note')}>
        <Text style={styles.buttonText}>✏️ 노트 작성</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ImageToText')}>
        <Text style={styles.buttonText}>📸 이미지 텍스트 인식</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Speech')}>
        <Text style={styles.buttonText}>🎤 음성 인식</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Summary')}>
        <Text style={styles.buttonText}>🧠 AI 요약</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
        <Text style={styles.buttonText}>📄 시험 문제 생성</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
