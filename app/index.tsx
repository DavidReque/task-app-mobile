import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '@/components/LoginForm';
import { TamaguiProvider } from '@tamagui/core';
import { tamaguiConfig } from '@/temagiConfig';

const StartPage: React.FC = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={styles.container}>
      <LoginForm />
    </View>
  </TamaguiProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default StartPage;