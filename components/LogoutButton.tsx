import React from 'react';
import { Button, View } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        router.replace('/');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <View style={{ marginRight: 16}}>
      <Button title="Cerrar Sesión" onPress={handleLogout} color='red' />
    </View>
  );
};

export default LogoutButton;
