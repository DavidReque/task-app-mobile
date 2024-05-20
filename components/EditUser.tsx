import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import {updateUser} from '../app/firebase/helper'

export default function EditUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleUpdateUser = () => {
    updateUser({ name, email, role }); // Actualizar usuario
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Role" value={role} onChangeText={setRole} />
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
