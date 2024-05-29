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
        router.push('/');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <View style={{ marginRight: 16}}>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

export default LogoutButton;
