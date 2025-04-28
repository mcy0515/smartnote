import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MainMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📒 스마트 노트</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Note')}
      >
        <Text style={styles.buttonText}>✏️ 노트 작성</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
