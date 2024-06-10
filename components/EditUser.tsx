import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Snackbar, Text } from 'react-native-paper';
import { updateName } from '../app/firebase/helper';
import { Button } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditUser() {
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleUpdateUser = async () => {
    if (name.trim() === '') {
      setSnackbarMessage('El nombre no puede estar vacío');
      setVisible(true);
      return;
    }

    try {
      await updateName({ name });
      setSnackbarMessage('Usuario actualizado exitosamente');
    } catch (error) {
      setSnackbarMessage('Error al actualizar el usuario');
    } finally {
      setVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <TextInput
        label="Nombre"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      <Button backgroundColor={'#E17BF5'} hoverStyle={{backgroundColor: '#E89BF7'}} onPress={handleUpdateUser} style={styles.button}>
        Actualizar Usuario
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
  },
});
