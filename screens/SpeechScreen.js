import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function SpeechScreen() {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    // TODO: Implement speech recognition
  };

  const stopRecording = () => {
    setIsRecording(false);
    // TODO: Stop speech recognition
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        value={text}
        onChangeText={setText}
        placeholder="음성 인식 결과가 여기에 표시됩니다"
      />

      <TouchableOpacity
        style={[styles.button, isRecording && styles.recordingButton]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? '녹음 중지' : '녹음 시작'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 