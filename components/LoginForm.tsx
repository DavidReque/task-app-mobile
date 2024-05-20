import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { router } from 'expo-router';
import {firebaseConfig, db} from '../app/firebase/firebase.config'
import { doc, setDoc } from 'firebase/firestore';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const auth = getAuth(app);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuario autenticado:', userCredential.user);
        // Aquí puedes redirigir al usuario a otra pantalla o mostrar un mensaje de éxito
        router.push('home')
      })
      .catch((error) => {
        setError(error.message);
        setVisible(true);
      });
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        role: 'employee', // O 'admin' dependiendo de tu lógica
        assignedTasks: []
      });
      router.push('home');
    } catch (error: any) {
      setError(error.message);
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        label="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Iniciar Sesión
      </Button>
      <Button mode="outlined" onPress={handleRegister} style={styles.button}>
        Registrarse
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
