import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function ImageToTextScreen() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setLoading(true);
      // TODO: Implement image to text conversion
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>이미지 선택</Text>
        </TouchableOpacity>

        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}

        {loading && (
          <Text style={styles.loadingText}>텍스트 변환 중...</Text>
        )}

        <TextInput
          style={styles.textInput}
          multiline
          value={text}
          onChangeText={setText}
          placeholder="변환된 텍스트가 여기에 표시됩니다"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
}); 