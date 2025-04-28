import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function NoteScreen() {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');

  const saveNote = () => {
    setSavedNote(note);
    setNote('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="노트를 작성하세요..."
        value={note}
        onChangeText={setNote}
      />
      <Button title="노트 저장" onPress={saveNote} />
      {savedNote !== '' && (
        <View style={styles.savedNoteContainer}>
          <Text style={styles.savedNoteTitle}>저장된 노트:</Text>
          <Text>{savedNote}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  savedNoteContainer: {
    marginTop: 20,
  },
  savedNoteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
