import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import {updateName} from '../app/firebase/helper'

export default function EditUser() {
  const [name, setName] = useState('');

  const handleUpdateUser = () => {
    updateName({ name }); // Actualizar usuario
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
      <Button title="Actualizar Usuario" onPress={handleUpdateUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
