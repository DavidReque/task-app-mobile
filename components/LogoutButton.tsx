import React from 'react';
import { View } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { Button } from 'tamagui';

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
    <View  style={{ marginRight: 16}}>
      <Button onPress={handleLogout} backgroundColor={'#D2293A'} color={'white'} hoverStyle={{backgroundColor: '#E84B5B'}}>Cerrar sesión</Button>
    </View>
  );
};

export default LogoutButton;
