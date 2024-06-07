import React, { useState } from 'react';
import { 
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'expo-router'; // Asegúrate de estar usando la versión correcta de `expo-router`
import { firebaseConfig, db } from '../app/firebase/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { Text, TextInput, Snackbar } from 'react-native-paper';
import { Button } from 'tamagui';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('dashboard');
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
        role: 'employee', 
        assignedTasks: []
      });
      router.push('dashboard');
    } catch (error: any) {
      setError(error.message);
      setVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          label="Nombre"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          mode="outlined"
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          mode="outlined"
        />
        <Button variant='outlined' background={'#BA25D6'} color={'white'} onPress={handleLogin} style={styles.button}>
          Iniciar Sesión
        </Button>
        <Button onPress={handleRegister} style={styles.button}>
          Registrarse
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          {error}
        </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
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
    width: '100%', // Ancho fijo
  },
  button: {
    marginTop: 16,
  },
});

